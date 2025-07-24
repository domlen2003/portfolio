<script lang="ts">
    import "../app.css";
    let {children} = $props();
</script>

<div class="size-full flex flex-col">
    <!--div class="shrink-0 z-10 w-full h-16 flex justify-start gap-4 items-center px-2 border-b">
        <svg xmlns="http://www.w3.org/2000/svg" width="100mm" height="100mm" viewBox="0 0 100 100" class="size-12">
            <style>
                :root{
                    --base-color: oklch(63% 0.19 264.5);
                    --second-color: oklch(51% 0.25 265.5);
                    --third-color: oklch(38% 0.19 265.5);
                }
            </style>
            <circle style="fill:var(--third-color);" cx="50" cy="50" r="50"/>
            <circle style="fill:var(--second-color);" cx="50" cy="62.5" r="37.5"/>
            <circle style="fill:var(--base-color);" cx="50" cy="72.5" r="27.5"/>
        </svg>
        <p>
            innomove
        </p>
    </div-->
    {@render children()}
</div>
