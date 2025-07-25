<script lang="ts">
    import StepContentsWrapper from "$lib/components/composite/stepcontents-wrapper.svelte";
    import {Separator} from "$lib/components/ui/separator";
</script>
<StepContentsWrapper title='Nachteile von HSL' class="flex items-center h-full gap-8">
    <div class="flex gap-12 items-center justify-center h-full p-8">
        <div class="flex flex-col gap-2 items-center text-2xl">
            <div class="py-4 px-20 text-white text-3xl bg-[hsl(237,_100%,_50%)] rounded-lg">
                Text
            </div>
            hsl(237, 100%, 50%)
        </div>
        <Separator orientation="vertical" class="h-20"/>
        <div class="flex flex-col gap-2 items-center text-2xl">
            <div class="py-4 px-20 text-white text-3xl bg-[hsl(74,_100%,_50%)] rounded-lg">
                Text
            </div>
            hsl(74, 100%, 50%)
        </div>
    </div>
</StepContentsWrapper>