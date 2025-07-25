<script lang="ts">
    import {Label} from "$lib/components/ui/label/index.js";
    // noinspection ES6UnusedImports
    import * as RadioGroup from "$lib/components/ui/radio-group";

    let {currentSrc = $bindable()}: {
        currentSrc?: string | null | undefined
    } = $props();
    let value = $state('mountain');

    $effect(() => {
        if (!value) {
            return;
        }
        const image = imageMap.find(image => image.value === value);
        if (image) {
            currentSrc = image.src;
        } else {
            currentSrc = null;
        }
    })

    const imageMap = [
        {value: "mountain", src: '/example-images/mountain.webp'},
        {value: "roses", src: '/example-images/roses.webp'},
        {value: "snow", src: '/example-images/snow.webp'},
        {value: "sunset", src: '/example-images/sunset.webp'},
    ]
</script>

<RadioGroup.Root bind:value={value} class="flex flex-col gap-4">
    {#each imageMap as {value, src} (value)}
        <div class="flex items-center space-x-2">
            <RadioGroup.Item value={value} id="{value}-id"/>
            <Label for="{value}-id">
                <img src={src} alt={value} class="size-36 object-cover rounded-md"/>
            </Label>
        </div>
    {/each}
</RadioGroup.Root>