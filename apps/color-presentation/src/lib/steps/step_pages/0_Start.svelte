<script lang="ts">
    import {allResetted, resetAllStepperState} from '$lib/shared-state.svelte';
    import StepContentsWrapper from '$lib/components/composite/stepcontents-wrapper.svelte';
    import {pageStack} from '$lib/steps/pages.svelte';
    import {Button} from "$lib/components/ui/button";
    // noinspection ES6UnusedImports
    import * as Dialog from "$lib/components/ui/dialog";

    let hasPreviousSession = $derived(!allResetted.value); // Flag to check if there's a previous session
    let dialogOpen = $state(false); // Reference to the dialog element

    function handleStart() {
        if (true || hasPreviousSession) {
            dialogOpen = true;
            return;
        }
        pageStack.nextPage();
    }

    function resumeSession() {
        pageStack.nextPage();
    }

    function startNewSession() {
        resetAllStepperState();
        pageStack.nextPage();
    }
</script>

<StepContentsWrapper subtitle="Farben im Web & der steinige Weg dahin" title="Farbsysteme">
    <div class="mt-14 relative size-full rounded-xl overflow-hidden w-full min-h-min flex flex-col gap-12 justify-center items-center ">
        <div class="px-[15%]  pt-52">
            <h3 class="max-w-xl w-full z-10 text-5xl font-bold text-white text-center ">
                Farben
            </h3>
        </div>
        <div class="w-full px-4 pb-40 flex justify-center">
            <Button onclick={handleStart} size="lg">
                PRÄSENTATION STARTEN
            </Button>
        </div>
        <video autoplay muted loop class="absolute size-full object-cover  -z-10" >
            <source src="/bg-video.webm" type="video/webm">
            Your browser does not support the video tag.
        </video>
    </div>
</StepContentsWrapper>

<Dialog.Root bind:open={dialogOpen}>
    <Dialog.Content class="h-min w-min">
        <Dialog.Header class="font-bold">
            Letzte Präsentation fortsetzen oder eine neue starten?
        </Dialog.Header>
        <div class="flex justify-around gap-4">
            <Button onclick={()=>resumeSession()} variant="secondary">
                Fortsetzen
            </Button>
            <Button onclick={()=>startNewSession()} variant="default">
                Neu starten
            </Button>
        </div>
    </Dialog.Content>
</Dialog.Root>