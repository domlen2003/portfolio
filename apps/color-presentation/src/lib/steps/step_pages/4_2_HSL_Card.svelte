<script>
    import HslCard from "$lib/components/composite/card/hsl-card.svelte";
    import Hslpicker from "$lib/components/composite/hslpicker.svelte";
    import StepContentsWrapper from "$lib/components/composite/stepcontents-wrapper.svelte";

    let hue = $state(0);
</script>
<!-- HSL to RGB calc, colorpicker, show working card (fixed hue), gradients -->
<StepContentsWrapper title='Unsere Karte in HSL' class="flex items-center h-full gap-8">
    <div class="flex gap-16">
        <div class="w-80">
            <Hslpicker bind:hue={hue}/>
        </div>
        <div>
            <HslCard hslHue={hue}/>
        </div>
    </div>
</StepContentsWrapper>