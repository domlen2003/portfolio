import {
    allReset,
    resetAll,
    ResettableLocalStorage,
    type ResettableStore
} from '$lib/storage.svelte';

// ------ Stepper Store Register ------
let allStepperStores: ResettableStore[] = [];

class StepperStore<T> extends ResettableLocalStorage<T> {
    constructor(key: string, defaultValue: T) {
        super(key, defaultValue);
        allStepperStores.push(this);
    }
}
// ------ Stepper State Stores ------



// ------ Stepper State Meta Functions ------
export function resetAllStepperState() {
    resetAll(...allStepperStores);
}

let allResetState = $derived(allReset(...allStepperStores));
export const allResetted = {
    get value() {
        return allResetState;
    }
};