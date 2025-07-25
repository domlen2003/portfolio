<script lang="ts">
    import type { Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';

    let { class: className = '', title, titleClass = '', subtitle, subtitleClass = '', children }: {
        class?: string,
        title?: string,
        titleClass?: string,
        subtitle?: string,
        subtitleClass?: string,
        children: Snippet
    } = $props();
</script>
<div class={twMerge('w-full flex flex-col items-center', className)}>
    <div class="w-max max-w-full px-8">
        {#if title}
            <h2 class={twMerge('text-center font-bold text-2xl', titleClass)}>
                {title}
            </h2>
        {/if}
        {#if subtitle}
            <p class={twMerge('text-center font-normal text-2xl italic',subtitleClass)}>
                {subtitle}
            </p>
        {/if}
    </div>
    {@render children()}
</div>