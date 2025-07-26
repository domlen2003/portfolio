<script>
    import Rgbcube from "$lib/components/composite/rgbcube.svelte";
    import StepContentsWrapper from "$lib/components/composite/stepcontents-wrapper.svelte";

    let hue = $state(0);
</script>
<!-- HSL to RGB calc, colorpicker, show working card (fixed hue), gradients -->
<StepContentsWrapper title='Idee von HSL' class="flex items-center h-full gap-8">
    <div class="flex size-full p-10" style="">
        <Rgbcube/>
    </div>
</StepContentsWrapper>