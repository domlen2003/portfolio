<script lang="ts">
    import StepContentsWrapper from '$lib/components/composite/stepcontents-wrapper.svelte';
    import CardBase from '$lib/components/composite/card/card-base.svelte';
    import Imagepicker from '$lib/components/composite/imagepicker.svelte';

    let currentImageSrc: string | undefined = $state();
</script>

<!-- show holiday card with plain styles -> "its a bit bland lets give it some colors" -> explain hex/rgb( next slide) -> show difficulty of picking/adjusting colors (magically solve) -> "now i have to do that for everything" -->
<StepContentsWrapper title='Motivation oder das "rabbithole"' class="flex items-center h-full gap-8">
    <div class="flex gap-16">
        <CardBase imageUrl={currentImageSrc}/>
        <div class="flex items-center h-full">
            <Imagepicker bind:currentSrc={currentImageSrc}/>
        </div>
    </div>
</StepContentsWrapper>