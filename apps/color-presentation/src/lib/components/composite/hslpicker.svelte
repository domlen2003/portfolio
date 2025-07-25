<script lang="ts">

    let { hue = $bindable(0) }: { hue?: number } = $props();

    // HSL state
    import {Label} from "$lib/components/ui/label";
    import {Slider} from "$lib/components/ui/slider";
    import {Input} from "$lib/components/ui/input";

    let h: number = $state(0);   // 0‑360
    let s: number = $state(100); // 0‑100 (%)
    let l: number = $state(50);  // 0‑100 (%)

    $effect(() => {
        hue = h; // Update the hue prop whenever h changes
    });

    /** Derived CSS colour string */
    let displayColor = $derived(`hsl(${h}, ${s}%, ${l}%)`);

    /** Utility to clamp a number into a range */
    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

    /* ——— Number‑field handlers ——— */
    function onHInput(e: Event) {
        h = clamp(parseInt((e.target as HTMLInputElement).value || "0", 10), 0, 360);
    }
    function onSInput(e: Event) {
        s = clamp(parseInt((e.target as HTMLInputElement).value || "0", 10), 0, 100);
    }
    function onLInput(e: Event) {
        l = clamp(parseInt((e.target as HTMLInputElement).value || "0", 10), 0, 100);
    }

    /* ——— Slider handlers (value is always [number]) ——— */
    /*function onHueSlide(event) {
        h = event.detail.value[0];
    }
    function onSatSlide(event) {
        s = event.detail.value[0];
    }
    function onLightSlide(event) {
        l = event.detail.value[0];
    }*/
</script>

<!-- UI -->
<div class="space-y-6 max-w-sm mx-auto p-4">
    <!-- Swatch -->
    <div
            class="w-full h-32 rounded-xl border shadow-inner transition-colors duration-150"
            style="background-color: {displayColor};"
    ></div>

    <!-- HSL Controls -->
    <div class="space-y-4">
        <!-- Hue -->
        <div class="space-y-2">
            <Label for="h-input">Hue ({h}°)</Label>
            <Slider
                    min={0}
                    max={360}
                    step={1}
                    type="single"
                    bind:value={h}
            />
            <Input
                    id="h-input"
                    type="number"
                    min="0"
                    max="360"
                    value={h}
                    oninput={onHInput}
            />
        </div>

        <!-- Saturation -->
        <div class="space-y-2">
            <Label for="s-input">Saturation ({s}%)</Label>
            <Slider
                    min={0}
                    max={100}
                    step={1}
                    type="single"
                    bind:value={s}
            />
            <Input
                    id="s-input"
                    type="number"
                    min="0"
                    max="100"
                    value={s}
                    oninput={onSInput}
            />
        </div>

        <!-- Lightness -->
        <div class="space-y-2">
            <Label for="l-input">Lightness ({l}%)</Label>
            <Slider
                    min={0}
                    max={100}
                    step={1}
                    type="single"
                    bind:value={l}
            />
            <Input
                    id="l-input"
                    type="number"
                    min="0"
                    max="100"
                    value={l}
                    oninput={onLInput}
            />
        </div>
    </div>
</div>
