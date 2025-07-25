import { ResettableLocalStorage } from '$lib/storage.svelte';
import type { Component } from 'svelte';

export type StepPage<T> = {
    page: Component;
    computeNextPage: () => T | null;
};


export class PageStack<T extends string> {
    private readonly stack: ResettableLocalStorage<T[]> | null = $state(null);
    private readonly pagesMap: Record<T, StepPage<T>> | null = $state(null);

    readonly current = $derived(this.stack!.value.at(-1));
    readonly currentPage = $derived(this.pagesMap![this.current!].page);
    readonly length = $derived(this.stack!.value.length);

    readonly estimatedRemainingPages = $derived.by(() => {
        let currentPage = this.current!;
        let remaining = 0;

        while (currentPage !== null) {
            currentPage = this.pagesMap![currentPage]!.computeNextPage()!;
            if (currentPage !== null) {
                remaining++;
            }
        }

        return remaining;
    });

    readonly estimatedTotalPages = $derived(this.length + this.estimatedRemainingPages);

    constructor(initialPage: T, pagesMap: Record<T, StepPage<T>>) {
        this.stack = new ResettableLocalStorage('page-stack', [initialPage]);
        this.pagesMap = pagesMap;
    }

    initialPage() {
        return this.pagesMap![this.stack!.value[0]!].page;
    }

    isFirstPage() {
        return this.stack!.isReset();
    }

    nextPage() {
        const nextPage = this.pagesMap![this.current!].computeNextPage();
        if (nextPage) {
            this.stack!.value.push(nextPage);
        } else {
            console.warn('Cannot go forward from last page');
        }
    }

    hasNextPage(){
        return this.pagesMap![this.current!].computeNextPage() !== null;
    }

    previousPage() {
        if (this.stack!.value.length > 1) {
            this.stack!.value.pop();
        } else {
            console.warn('Cannot go back from first page');
        }
    }

    clear() {
        this.stack!.reset();
    }

    jumpBackTo(page: T) {
        if (!this.pagesMap![page]) {
            console.warn(`Cannot jump to non-existing page: ${page}`);
            return;
        }
        const index = this.stack!.value.indexOf(page);
        if (index === -1) {
            console.warn(`Cannot jump to page not in stack: ${page}`);
            return;
        }
        this.stack!.value = this.stack!.value.slice(0, index + 1);
    }

    jumpToEnd() {
        let currentPage = this.current!;
        while (currentPage !== null) {
            currentPage = this.pagesMap![currentPage]!.computeNextPage()!;
            if (currentPage !== null) {
                this.stack!.value.push(currentPage);
            }
        }
    }
}