<script lang="ts">
    import Oklchcolopicker from "$lib/components/composite/oklchcolopicker.svelte";
    import StepContentsWrapper from "$lib/components/composite/stepcontents-wrapper.svelte";
</script>

<StepContentsWrapper title='OKLCH der heilige Gral' class="flex items-center h-full gap-8">
    <div class="flex flex-col gap-2">
        <p>
            - Björn Ottosson von entwickelt und 2021 standardisiert
        </p>
        <p>
            - für den Menschlichen Seheindruck entwickelt
        </p>
    </div>
    <Oklchcolopicker/>
</StepContentsWrapper>