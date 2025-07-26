<script lang="ts">
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

    let container: HTMLDivElement | undefined = $state();

    onMount(() => {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(1.5, 1.5, 2);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // RGB cube: each vertex has color (r,g,b) = (x,y,z)
        const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
        const colors = [];
        const position = geometry.attributes.position;

        for (let i = 0; i < position.count; i++) {
            const x = (position.getX(i) + 0.5); // from -0.5..0.5 → 0..1
            const y = (position.getY(i) + 0.5);
            const z = (position.getZ(i) + 0.5);
            colors.push(x, y, z); // interpreted as RGB
        }

        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.MeshBasicMaterial({
            vertexColors: true,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1.0
        });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Axes helper
        //const axesHelper = new THREE.AxesHelper(1.5);
        //scene.add(axesHelper);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        const resizeObserver = new ResizeObserver(() => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    });
</script>

<div bind:this={container} class="size-full block rounded-lg border overflow-hidden" ></div>
