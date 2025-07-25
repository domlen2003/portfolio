<script>
    import StepContentsWrapper from "$lib/components/composite/stepcontents-wrapper.svelte";
</script>

<!-- graphic of receptor sensitivity -> cie lab color space slice -->
<StepContentsWrapper title='Technischer vs Menschlicher Farbraum' class="flex items-center h-full gap-8">
    <div class="flex flex-col gap-2">
        <p>
            - Bildschirme zeigen nicht alle Farben an die wir sehen können
        </p>
        <p>
            - srgb ist ein winziger Teil des menschlichen Farbraums
        </p>
        <p>
            - also auf farben "verzichten"?
        </p>
    </div>
    <div class="flex size-full px-10 pb-10 justify-center">

        <div class="flex justify-center items-center h-full p-10 rounded-xl bg-foreground">
            <img src="/color-gamut.webp" alt="Farbräume" class="size-full"/>
        </div>

    </div>
</StepContentsWrapper>