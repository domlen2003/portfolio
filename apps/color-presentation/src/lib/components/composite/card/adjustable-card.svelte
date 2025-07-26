<script lang="ts">
    let {color1, color2, color3, color4, color5}: {
        color1: string,
        color2: string,
        color3: string,
        color4: string,
        color5: string
    } = $props();
</script>

<div class="w-80 h-min font-[MG] font-bold font-stretched">
    <div class="w-full h-full rounded-xl overflow-hidden"
         style="background: {color1}">
        <div class="relative w-full h-[22.5rem] overflow-hidden bg-cover bg-no-repeat bg-center z-0"
             style="background-image: url('/example-images/mountain.webp')">
            <button aria-label="placeholder button"
                    class="absolute flex size-8 top-2 right-2 justify-center items-center border-none rounded-full  z-10"
                    style="background: {color5}">
                <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path style="fill: {color2};"
                          d="M3 2C3 1.44772 3.44772 1 4 1H12C12.5523 1 13 1.44772 13 2V13.2338C13 14.0111 12.152 14.4912 11.4855 14.0913L8.5145 12.3087C8.19781 12.1187 7.80219 12.1187 7.4855 12.3087L4.5145 14.0913C3.84797 14.4912 3 14.0111 3 13.2338V2Z"
                    />
                </svg>
            </button>
            <div class="absolute w-full h-56 bottom-0 bg-gradient-to-b from-transparent  z-10 pointer-events-none"
                 style="--tw-gradient-to: {color1}; --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));">
            </div>
        </div>
        <div class="px-6 pb-4">
            <div class="relative -mt-[20%] pb-4 text-2xl font-black z-30 font-stretched"
                 style="color: {color2};">
                >
                Explore new places around the world
            </div>
            <div class="relative mt-0 pb-4 text-sm font-medium font-condensed"
                 style="color: {color3};">
                Sign up for free and receive hand-picked offers for the best destinations with great discounts
            </div>
            <button
                    class="w-full text-sm font-[MG] font-medium font-condensed border-none rounded-lg p-2"
                    style="color: {color1}; background: {color3}">
                View Offers
            </button>
            <div class="flex pt-4 gap-2 text-[0.625rem] font-[MG] font-medium "
                 style="color: {color4};"
            >
                <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path style="fill: {color4};"
                          d="M11.0789 2.5C13.2445 2.5 15 4.25551 15 6.42105C15 8.60799 14.1238 9.70448 10.4073 12.5951L8.71626 13.9103C8.29497 14.238 7.70503 14.238 7.28374 13.9103L5.59271 12.5951C1.87621 9.70448 1 8.60799 1 6.42105C1 4.25551 2.75551 2.5 4.92105 2.5C6.08128 2.5 7.11221 3.04619 8 4.10293C8.88779 3.04619 9.91872 2.5 11.0789 2.5Z"
                    />
                </svg>
                <div>Liked by 16 your friends on Facebook</div>
            </div>
        </div>
    </div>
</div>

<style>
    @font-face {
        font-family: MG;
        font-display: swap;
        src: url('https://cdn.evilmartians.com/front/fonts/MartianGrotesk-1.0.woff2') format('woff2');
        font-weight: 500 900;
        font-stretch: 100% 125%;
    }
</style>