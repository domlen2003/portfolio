<script>
    import AdjustableCard from "$lib/components/composite/card/adjustable-card.svelte";
    import StepContentsWrapper from "$lib/components/composite/stepcontents-wrapper.svelte";
    import RgbPicker from "$lib/components/composite/rgbpicker.svelte";

    let color1 = $state();
    let color2 = $state();
    let color3 = $state();
    let color4 = $state();
    let color5 = $state();
</script>

<!-- RGB adjustment, intuitiveness, gradients, bigger color spaces -->
<StepContentsWrapper title='Nachteile von SRGB' class="flex items-center h-full gap-8">
    <div class="flex gap-8">
        <AdjustableCard {color1} {color2} {color3} {color4} {color5}/>
        <div class="flex flex-col justify-center w-max h-full gap-4">
            <RgbPicker bind:color={color5} startHex="#f1f5f9"/>
            <RgbPicker bind:color={color2} startHex="#314158"/>
            <RgbPicker bind:color={color3} startHex="#45556c"/>
            <RgbPicker bind:color={color4} startHex="#020618"/>
            <RgbPicker bind:color={color1} startHex="#f8fafc"/>
        </div>
    </div>
</StepContentsWrapper>