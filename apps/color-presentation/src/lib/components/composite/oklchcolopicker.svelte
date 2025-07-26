<script lang="ts">
    import {Input} from "$lib/components/ui/input";
    import {Label} from "$lib/components/ui/label";
    import {Slider} from "$lib/components/ui/slider";
    import {onMount} from "svelte";
    // Assume Culori and Three.js are installed as dependencies
    import {
        formatHex,
        formatRgb,
        inGamut,
        parse,
        useMode,
        modeOklch,
    } from 'culori';
    import * as THREE from "three";
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
    // Component Props: allow binding to an external color value, and optional initial color
    let {color = $bindable("")} = $props();


    // Convert initial color to OKLCH
    const toOklch = useMode(modeOklch);

    // OKLCH state (Luminance %, Chroma, Hue °, Alpha %)
    let l = $state(63);     // L in [0..100], percent
    let c = $state(0.19); // C (0..~0.37 for sRGB, extended to ~0.47 for Rec2020)
    let h = $state(264.5);             // H in [0..360) degrees
    let a = $state(100);    // Alpha in [0..100] percent

    // Gamut settings and warnings
    let showWarning = $state(false);      // whether to highlight out-of-sRGB gamut colors

    // Derived CSS color strings for output in various formats
    // Compute the OKLCH CSS string (with % and optional alpha) for the current values
    let oklchString = $derived.by(() => {
        const alphaPart = (a < 100) ? ` / ${a}%` : "";
        return `oklch(${l}% ${c} ${h}${alphaPart})`;
    });
    // Also derive sRGB hex and rgb strings for output (note: out-of-gamut colors will be clipped)
    let hexString = $derived.by(() => formatHex(parse(oklchString)));
    let rgbString = $derived.by(() => formatRgb(parse(oklchString)));

    // Update the bound `color` prop whenever the OKLCH values change
    $effect(() => {
        color = oklchString;
    });

    /** Utility: clamp a number to a given min/max range */
    function clamp(val: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, val));
    }

    /* ---------- Input Handlers ---------- */
    function onLInput(e: Event) {
        l = clamp(parseInt((e.target as HTMLInputElement).value || "0", 10), 0, 100);
    }

    function onCInput(e: Event) {
        // Allow decimal input for Chroma
        c = clamp(parseFloat((e.target as HTMLInputElement).value || "0", 10), 0, 0.47);
        // Round to 3 decimal places for neatness
        c = parseFloat(c.toFixed(3));
    }

    function onHInput(e: Event) {
        h = clamp(parseInt((e.target as HTMLInputElement).value || "0", 10), 0, 360);
    }

    function onAInput(e: Event) {
        a = clamp(parseInt((e.target as HTMLInputElement).value || "0", 10), 0, 100);
    }

    // Optionally, handle direct HEX input to update LCH values
    let hexInputValue = $state("");  // two-way bound to a Hex <Input>
    function onHexChange(e: Event) {
        let value = (e.target as HTMLInputElement).value.trim();
        if (/^#?[0-9A-Fa-f]{6}$/.test(value)) {  // 6-digit hex
            value = value.replace(/^#/, "");
            // Parse hex to get OKLCH
            const parsed = parse("#" + value);
            if (parsed) {
                const ok = toOklch(parsed);
                // Update state (convert luminance to % and alpha to %)
                l = Math.round((ok.l || 0) * 100);
                c = parseFloat((ok.c || 0).toFixed(3));
                h = Math.round(ok.h || 0);
                a = Math.round(((ok.alpha ?? 1) * 100));
            }
        }
    }

    /* ---------- 3D Model Setup (Three.js) ---------- */
    let canvasEl: HTMLCanvasElement | undefined = $state();
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let colorMarker: THREE.Mesh;    // a small sphere to mark current color position
    let gamutMesh: THREE.Mesh;      // mesh representing the gamut volume

    // Helper to generate or update the gamut mesh for the current gamut (sRGB or Rec2020)
    function buildGamutMesh(): THREE.Mesh {
        // Remove existing mesh if any
        if (gamutMesh) {
            scene.remove(gamutMesh);
            gamutMesh.geometry.dispose();
            gamutMesh.material.dispose();
        }
        // Sample points in the color space for the chosen gamut
        const points: THREE.Vector3[] = [];
        const colors: number[] = [];
        const inGamutCheck = inGamut('rec2020');  // culori function to test gamut containment:contentReference[oaicite:3]{index=3}
        // We sample a grid in LCH: L 0-100 step 10, H 0-350 step 10, C from 0 up to max (approx)
        const maxC = 0.47;  // use rec2020 values for C maxima
        for (let L = 0; L <= 100; L += 3) {
            for (let H = 0; H < 360; H += 5) {
                // approximate max C at this L by using the global maxC as a limit
                // (A more precise method would find the exact gamut boundary for each hue)
                const Lfrac = L / 100;
                let C = maxC;
                // Decrease C until color is inside gamut
                while (C > 0 && !inGamutCheck({mode: 'oklch', l: Lfrac, c: C, h: H})) {
                    C -= 0.01;
                }
                // Use the found C (which should be just inside gamut)
                const color = {mode: 'oklch', l: Lfrac, c: C, h: H};
                // Convert to sRGB for vertex color
                const rgbColor = parse(formatRgb(color));  // ensure we have an RGB Color object
                const r = rgbColor?.r ?? 0, g = rgbColor?.g ?? 0, b = rgbColor?.b ?? 0;
                // Coordinates: we use L, a, b space equivalent (need to map OKLCH to Cartesian)
                // Convert polar (C,H) to Cartesian a,b for positioning:
                const a_val = C * Math.cos((H / 180) * Math.PI);
                const b_val = C * Math.sin((H / 180) * Math.PI);
                // Use L as Y axis, a_val as X, b_val as Z
                points.push(new THREE.Vector3(a_val, Lfrac - 0.5, b_val));
                colors.push(r, g, b);
            }
        }
        // Create geometry from points. We'll form a Point cloud or use convex hull for mesh.
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        // Use vertex colors to roughly show actual color at each point
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        // For simplicity, represent the volume as points (a full mesh requires triangulation)
        const material = new THREE.PointsMaterial({size: 0.02, vertexColors: true});
        const pointMesh = new THREE.Points(geometry, material);
        scene.add(pointMesh);
        return pointMesh;
    }

    onMount(() => {
        // Initialize Three.js scene, camera, and renderer
        scene = new THREE.Scene();
        const aspect = canvasEl.clientWidth / canvasEl.clientHeight;
        camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 10);
        camera.position.set(1, 0.5, 1);  // starting viewpoint
        camera.lookAt(0, 0, 0);           // look roughly at center of space
        renderer = new THREE.WebGLRenderer({canvas: canvasEl, antialias: true, alpha: true});
        renderer.setSize(canvasEl.clientWidth, canvasEl.clientHeight);
        controls = new OrbitControls(camera, canvasEl);
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.rotateSpeed = 0.5;
        controls.zoomSpeed = 0.5;

        // Light for better visibility
        const light = new THREE.DirectionalLight(0xffffff, 0.5);
        light.position.set(1, 1, 1);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0xffffff, 0.3));

        // Axes: L axis and circles for reference
        const axesHelper = new THREE.AxesHelper(0.5);
        //scene.add(axesHelper);

        // Gamut volume mesh (initially sRGB)
        gamutMesh = buildGamutMesh();

        // Marker for current color
        const markerGeo = new THREE.SphereGeometry(0.03);
        const markerMat = new THREE.MeshBasicMaterial({color: 0x000000});
        colorMarker = new THREE.Mesh(markerGeo, markerMat);
        scene.add(colorMarker);

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            // Update marker position and color each frame
            const Lfrac = l / 100;
            const a_val = c * Math.cos((h / 180) * Math.PI);
            const b_val = c * Math.sin((h / 180) * Math.PI);
            colorMarker.position.set(a_val, Lfrac - 0.5, b_val);
            // Use current color for marker material
            const hex = formatHex(parse(oklchString));
            (colorMarker.material as THREE.MeshBasicMaterial).color = new THREE.Color(hex);
            renderer.render(scene, camera);
        }

        animate();
    });
</script>

<!-- UI Layout -->
<div class="flex gap-8 size-full pb-8">
    <div class="flex flex-col gap-4 w-120">
        <!-- Color Preview Swatch -->
        <div class="relative w-full h-24 rounded-lg border shadow-inner transition-colors duration-150 overflow-hidden"
             style="background: repeating-conic-gradient(#aaa 0% 25%, #eee 0% 50%) 0% / 16px 16px;">
            {#if showWarning }
                {#if !inGamut('rec2020')(parse(oklchString))}
                    <!-- Gamut warning overlay (red diagonal stripes) -->
                    <div class="absolute inset-0 bg-[repeating-linear-gradient(45deg, rgba(255,0,0,0.3) 0% 25%, transparent 25% 50%)] pointer-events-none rounded-lg z-10"></div>
                {/if}
            {/if}
            <div class="absolute inset-0 flex items-center justify-center" style="background: {oklchString};">
            </div>
        </div>

        <!-- OKLCH Controls -->
        <div class="space-y-4">
            <!-- Luminance (L) -->
            <div class="space-y-1">
                <Label for="l-input">Luminance ({l}%)</Label>
                <Slider min={0} max={100} step={1} type="single" bind:value={l}/>
                <Input id="l-input" type="number" min="0" max="100" bind:value={l} oninput={onLInput}/>
            </div>
            <!-- Chroma (C) -->
            <div class="space-y-1">
                <Label for="c-input">Chroma ({c})</Label>
                <!-- Slider max adjusts based on gamut mode -->
                <Slider min={0} max={0.47} step={0.01} type="single" bind:value={c}/>
                <Input id="c-input" type="number" step="0.01" min="0" max={1} value={c}
                       oninput={onCInput}/>
            </div>
            <!-- Hue (H) -->
            <div class="space-y-1">
                <Label for="h-input">Hue ({h}°)</Label>
                <Slider min={0} max={360} step={1} type="single" bind:value={h}/>
                <Input id="h-input" type="number" min="0" max="360" bind:value={h} oninput={onHInput}/>
            </div>
            <!-- Alpha (A) -->
            <div class="space-y-1">
                <Label for="a-input">Alpha ({a}%)</Label>
                <Slider min={0} max={100} step={1} type="single" bind:value={a}/>
                <Input id="a-input" type="number" min="0" max="100" bind:value={a} oninput={onAInput}/>
            </div>
        </div>
        <div class="space-y-2">
            <Label>RGB</Label>
            <Input readonly value={rgbString}/>
        </div>
    </div>

    <!-- 3D Model Canvas -->
    <div class="w-100 h-full" style="display: block; ">
        <canvas bind:this={canvasEl} class="w-full h-full rounded-lg border"></canvas>
    </div>
</div>
