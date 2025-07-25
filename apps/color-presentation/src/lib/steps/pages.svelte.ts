import {PageStack, type StepPage} from '$lib/steps/pageStack.svelte';
import Start from "$lib/steps/step_pages/0_Start.svelte";
import DynamicCardIntro from "$lib/steps/step_pages/1_Dynamic_Card_Intro.svelte";
import HexRgb from "$lib/steps/step_pages/2_Hex_RGB.svelte";
import RgbProblems from "$lib/steps/step_pages/3_RGB_Problems.svelte";
import Hsl from "$lib/steps/step_pages/4_HSL.svelte";
import HslProblems from "$lib/steps/step_pages/5_HSL_Problems.svelte";
import Eyes from "$lib/steps/step_pages/6_Eyes.svelte";
import Oklch from "$lib/steps/step_pages/7_OKLCH.svelte";
import OklchVsHsl from "$lib/steps/step_pages/8_OKLCH_vs_HSL.svelte";
import OklchShowoff from "$lib/steps/step_pages/9_OKLCH_Showoff.svelte";


type Pages =
    'start'
    | 'intro'
    | 'hex'
    | 'rgb_problems'
    | 'hsl'
    | 'hsl_problems'
    | 'eyes'
    | 'oklch'
    | 'oklch_vs_hsl'
    | 'oklch_showoff';


const basePageMap: Partial<Record<Pages, StepPage<Pages>>> = {
    start: {
        page: Start,
        computeNextPage: () => 'intro'
    },
   intro: {
        page: DynamicCardIntro,
        computeNextPage: () => 'hex'
    },
    hex: {
        page: HexRgb,
        computeNextPage: () => "rgb_problems"
    },
    rgb_problems: {
        page: RgbProblems,
        computeNextPage: () => 'hsl'
    },
    hsl:{
        page: Hsl,
        computeNextPage: () => 'hsl_problems'
    },
    hsl_problems: {
        page: HslProblems,
        computeNextPage: () => 'eyes'
    },
    eyes:{
        page: Eyes,
        computeNextPage: () => 'oklch'
    },
    oklch:{
        page: Oklch,
        computeNextPage: () => 'oklch_vs_hsl'
    },
    oklch_vs_hsl: {
        page: OklchVsHsl,
        computeNextPage: () => 'oklch_showoff'
    },
    oklch_showoff:{
        page: OklchShowoff,
        computeNextPage: () => null // No next page, this is the last step
    }
} as const;


const pagesMap: Record<Pages, StepPage<Pages>> = basePageMap as Record<Pages, StepPage<Pages>>;
export const pageStack = new PageStack('start', pagesMap);