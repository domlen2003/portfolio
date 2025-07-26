<script lang="ts">
    import StepContentsWrapper from "$lib/components/composite/stepcontents-wrapper.svelte";

    import {Label} from "$lib/components/ui/label"; // gradient slider
    import HueSlider from "$lib/components/composite/hueslider.svelte"; // gradient slider

    // --- Reactive state ---
    let hue = $state(140); // 0‑360° shared by both models

    // HSL constants (show perceptual non‑uniformity)
    const HSL_S = 100; // %
    const HSL_L = 50;  // %

    // OKLCH constants (near‑uniform)
    const OKL_L = 0.80; // 0‑1 → will be used as % in string
    const OKL_C = 0.20; // 0‑0.4 typical range

    // Derived CSS colour strings (space‑separated syntax → supported in evergreen browsers)
    let hslColor = $derived(`hsl(${hue} ${HSL_S}% ${HSL_L}%)`);
    let oklchColor = $derived(`oklch(${OKL_L * 100}% ${OKL_C} ${hue})`);
</script>

<StepContentsWrapper title='OKLCH vs HSL' class="flex items-center h-full gap-8">
    <div class="max-w-sm mx-auto p-4 space-y-24">
        <!-- Swatches -->
        <div class="space-y-4">
            <div class="space-y-1">
                <Label>HSL – constant S {HSL_S}% / L {HSL_L}%</Label>
                <div class="h-16 w-full rounded-lg border" style="background-color:{hslColor};"></div>
            </div>

            <div class="space-y-1">
                <Label>OKLCH – constant C {OKL_C} / L {OKL_L * 100}%</Label>
                <div class="h-16 w-full rounded-lg border" style="background-color:{oklchColor};"></div>
            </div>
        </div>

        <!-- Shared Hue slider -->
        <div class="w-90 flex flex-col gap-1">
            <Label>Hue ({hue}°)</Label>
            <HueSlider bind:hue={hue}/>
        </div>
    </div>
    <div></div>
</StepContentsWrapper>