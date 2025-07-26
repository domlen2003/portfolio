<script lang="ts">
    // noinspection ES6UnusedImports
    import {Slider} from "bits-ui";

    let {hue = $bindable(0)}: { hue: number } = $props();
</script>

<!-- Gradient map from 0°‑360° hue -->
<!--Slider.Root
        type="single"
        min={0}
        max={360}
        value={hue}
>
    <span
            class="relative flex w-full touch-none select-none items-center"
            style="background: linear-gradient(90deg,
                hsl(0,100%,50%) 0%,
                hsl(60,100%,50%) 17%,
                hsl(120,100%,50%) 33%,
                hsl(180,100%,50%) 50%,
                hsl(240,100%,50%) 67%,
                hsl(300,100%,50%) 83%,
                hsl(360,100%,50%) 100%);"
    >
      <Slider.Range class="bg-white absolute h-20"/>
    </span>
    <-- Diamond thumb ->
    <Slider.Thumb
            index={0}
            class="size-6 border-[3px] border-white rounded-sm shadow-md transform rotate-45 "
            style={`background-color: hsl(${hue},100%,50%);`}
    />
</Slider.Root-->

<div class="w-full pr-3">
    <Slider.Root
            min={0}
            max={360}
            type="single"
            bind:value={hue}
            class="relative flex w-full touch-none select-none items-center"
    >
    <span
            class="bg-dark-10 relative h-16 w-full grow cursor-pointer overflow-hidden rounded-lg mx-3"
            style="background: linear-gradient(90deg,
                hsl(0,100%,50%) 0%,
                hsl(60,100%,50%) 17%,
                hsl(120,100%,50%) 33%,
                hsl(180,100%,50%) 50%,
                hsl(240,100%,50%) 67%,
                hsl(300,100%,50%) 83%,
                hsl(360,100%,50%) 100%);"
    >
      <Slider.Range class="hidden absolute h-full" />
    </span>
        <Slider.Thumb
                index={0}
                class="size-6 border-[3px] border-white rounded-sm shadow-md rotate-45 border-border-input hover:border-dark-40  data-active:scale-[0.98] block cursor-pointer transition-colors"
                style={`background-color: hsl(${hue},100%,50%);`}
        />
    </Slider.Root>
</div>