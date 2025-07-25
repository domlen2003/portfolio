<script lang="ts">
    import {Input} from "$lib/components/ui/input";

    let {color = $bindable(), startHex}: { color: string, startHex:string } = $props();

    let r = $state("255");
    let g = $state("0");
    let b = $state("0");

    if (startHex) {
        // Initialize RGB values from the provided hex string
        const hex = startHex.replace(/^#/, ''); // Remove leading #
        if (hex.length === 6) {
            r = parseInt(hex.slice(0, 2), 16).toString();
            g = parseInt(hex.slice(2, 4), 16).toString();
            b = parseInt(hex.slice(4, 6), 16).toString();
        }
    }


    $effect(()=>{
        color = `rgb(${r}, ${g}, ${b})`;
    })

    /** Clamp a number to the 0‑255 range */
    function clamp(n: string): string {
        return Math.max(0, Math.min(255, parseInt(n))).toString();
    }

    /** Handle any RGB field change */
    function onRgbChange() {
        r = clamp(r);
        g = clamp(g);
        b = clamp(b);
    }
</script>

<div class="flex space-x-2">
    <div
            class="w-40 h-full rounded-xl border shadow-inner transition-colors duration-150"
            style="background-color: rgb({r}, {g}, {b});"
    ></div>
    <Input
            type="number"
            min="0"
            max="255"
            bind:value={r}
            oninput={onRgbChange}
            placeholder="R"
            class="w-max"
    />
    <Input
            type="number"
            min="0"
            max="255"
            bind:value={g}
            oninput={onRgbChange}
            placeholder="G"
            class="w-max"
    />
    <Input
            type="number"
            min="0"
            max="255"
            bind:value={b}
            oninput={onRgbChange}
            placeholder="B"
            class="w-max"
    />
</div>