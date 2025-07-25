<script>
    import StepContentsWrapper from "$lib/components/composite/stepcontents-wrapper.svelte";
    import Colorpicker from "$lib/components/composite/colorpicker.svelte";
</script>

<!-- How hex and RGB work, RGB color picker (three sliders/three numbers). -->
<StepContentsWrapper title='Standard Farben im Web' subtitle="SRGB (Red, Green, Blue) und Hexadezimal (Hex)"
                     class="flex items-center h-full gap-12">
    <div class="flex flex-col gap-2">
        <p>
            - 1996 von Microsoft und HP standardsisiert
        </p>
        <p>
            - für alte Röhrenmonitore entwickelt
        </p>
    </div>
    <Colorpicker/>
</StepContentsWrapper>