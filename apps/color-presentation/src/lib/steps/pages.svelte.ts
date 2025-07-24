import {PageStack, type StepPage} from '$lib/steps/pageStack.svelte';
import TestA from "$lib/steps/step_pages/TestA.svelte";
import TestB from "$lib/steps/step_pages/TestB.svelte";
import TestC from "$lib/steps/step_pages/TestC.svelte";


type PagesMapIds =
    'start'
    | 'test'
    | 'summary';

const pagesMap: Record<PagesMapIds, StepPage<PagesMapIds>> = {
    start: {
        page: TestA,
        computeNextPage: () => 'test'
    },
    test: {
        page: TestB,
        computeNextPage: () => 'summary'
    },
    summary: {
        page: TestC,
        computeNextPage: () => null
    }
} as const;

export const pageStack = new PageStack('start', pagesMap);