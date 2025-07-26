<script lang="ts">
    import MagicCard from "$lib/components/composite/card/magic-card.svelte";
    import Imagepicker from "$lib/components/composite/imagepicker.svelte";
    import StepContentsWrapper from "$lib/components/composite/stepcontents-wrapper.svelte";

    let currentImageSrc = $state<string | undefined>();
</script>
<StepContentsWrapper title='Endlich Farben im Urlaub' class="flex items-center h-full gap-8">
    <div class="flex gap-16">
        <MagicCard imageUrl={currentImageSrc}/>
        <div class="flex items-center h-full">
            <Imagepicker bind:currentSrc={currentImageSrc}/>
        </div>
    </div>
</StepContentsWrapper>