<script lang="ts">

    // initial values
    import {Input} from "$lib/components/ui/input";
    import {Label} from "$lib/components/ui/label";

    let r = $state("255");
    let g =  $state("0");
    let b = $state("0");

    let hex = $derived.by(() => {
        const hexR = parseInt(r).toString(16).padStart(2, '0');
        const hexG = parseInt(g).toString(16).padStart(2, '0');
        const hexB = parseInt(b).toString(16).padStart(2, '0');
        return `#${hexR}${hexG}${hexB}`;
    });

    /** Validate a 6‑digit HEX string (with or without the leading #) */
    function isValidHex(value: string): boolean {
        return /^#?[0-9A-Fa-f]{6}$/.test(value);
    }

    /** Handle HEX input */
    function onHexChange(event: Event) {
        let value = (event.target as HTMLInputElement).value.trim();
        if (isValidHex(value)) {
            value = value.replace(/^#/, ''); // Remove leading #
            r = parseInt(value.slice(0, 2), 16).toString()
            g = parseInt(value.slice(2, 4), 16).toString()
            b = parseInt(value.slice(4, 6), 16).toString()
        }
    }

    /** Clamp a number to the 0‑255 range */
    function clamp(n: string): string{
        return Math.max(0, Math.min(255, parseInt(n))).toString();
    }

    /** Handle any RGB field change */
    function onRgbChange() {
        r = clamp(r);
        g = clamp(g);
        b = clamp(b);
    }
</script>

<!-- UI -->
<div class="space-y-6 max-w-sm mx-auto p-4">
    <!-- Color swatch -->
    <div
            class="w-full h-32 rounded-xl border shadow-inner transition-colors duration-150"
            style="background-color: rgb({r}, {g}, {b});"
    ></div>

    <!-- HEX picker -->
    <div class="space-y-2">
        <Label for="hex-input">HEX</Label>
        <Input
                id="hex-input"
                bind:value={hex}
                oninput={onHexChange}
                placeholder="#RRGGBB"
                maxlength={7}
        />
    </div>

    <!-- RGB picker -->
    <div class="space-y-2">
        <Label>RGB</Label>
        <div class="flex space-x-2">
            <Input
                    type="number"
                    min="0"
                    max="255"
                    bind:value={r}
                    oninput={onRgbChange}
                    placeholder="R"
            />
            <Input
                    type="number"
                    min="0"
                    max="255"
                    bind:value={g}
                    oninput={onRgbChange}
                    placeholder="G"
            />
            <Input
                    type="number"
                    min="0"
                    max="255"
                    bind:value={b}
                    oninput={onRgbChange}
                    placeholder="B"
            />
        </div>
    </div>
</div>
