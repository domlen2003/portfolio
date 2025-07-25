<script lang="ts">
    import {fade} from 'svelte/transition';
    import {pageStack} from '$lib/steps/pages.svelte.js';
    import {type Component} from 'svelte';
    import {Progress} from "$lib/components/ui/progress";
    import {ScrollArea} from "$lib/components/ui/scroll-area";

    let CurrentPage: Component | null = $state(null);

    $effect(() => {
        CurrentPage = pageStack.currentPage;
    });

    //for debugging purposes
    function onKeyDown(event: KeyboardEvent) {
        if (event.key === 'ArrowRight') {
            pageStack.nextPage();
        } else if (event.key === 'ArrowLeft') {
            pageStack.previousPage();
        } else if (event.key === 'e' && event.ctrlKey) {
            pageStack.jumpToEnd();
        }
    }

</script>

<svelte:window on:keydown={onKeyDown}/>

<div class="size-full px-2 sm:w-[77%] mx-auto">
    <div class="size-full flex flex-col justify-start items-center pt-14">
        {#if CurrentPage}
            {#key pageStack.current}
                <div class="flex flex-col size-full" in:fade={{ delay: 500, duration: 500 }}
                     out:fade={{delay:0, duration:500}}>
                    <ScrollArea orientation="vertical" class="size-full">
                        <CurrentPage/>
                    </ScrollArea>
                </div>
            {/key}
        {/if}
        <div class="flex flex-col w-full h-min pt-2 pb-20">
            <Progress
                    max={pageStack.estimatedTotalPages - 1}
                    value={pageStack.length - 1}
            />
            {pageStack.length}/{pageStack.estimatedTotalPages}
        </div>
    </div>
</div>