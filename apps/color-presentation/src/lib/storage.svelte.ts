import { browser } from '$app/environment';

export class LocalStorage<T> {
    private internalState: T = $state() as T;
    readonly key: string;

    constructor(key: string, defaultValue: T) {
        this.key = key;
        // Only load from localStorage if in browser
        if (browser) {
            const item = localStorage.getItem(key);
            if (item) {
                try {
                    // If the item is valid JSON, load and return to prevent using the default value
                    const deserialized = this.deserialize(item);
                    if (deserialized !== null) {
                        this.internalState = deserialized;
                        $effect.root(() => {
                            $effect(() => {
                                this.updateLocalStorage();
                            });
                        });
                        return;
                    } else if (defaultValue !== null) {
                        console.error('Could not load from localStorage', key, item, 'deserialized to null');
                    }
                } catch (e) {
                    console.error('Could not load from localStorage', key, e);
                }
            }
        }
        // Load the default value if the localStorage item is invalid or not found
        this.internalState = defaultValue;
        if (browser) {
            localStorage.setItem(key, this.serialize(defaultValue));
        }
        $effect.root(() => {
            $effect(() => {
                this.updateLocalStorage();
            });
        });
    }


    updateLocalStorage() {
        if (browser) {
            localStorage.setItem(this.key, this.serialize(this.internalState));
        }
    }

    get value(): T {
        return this.internalState;
    }

    set value(value: T) {
        this.internalState = value;
        this.updateLocalStorage();
    }

    serialize(value: T) {
        return JSON.stringify(value);
    }

    deserialize(value: string) {
        return value ? JSON.parse(value) : null;
    }
}


export class ResettableLocalStorage<T> extends LocalStorage<T> {
    private readonly default: T;

    constructor(key: string, defaultValue: T) {
        super(key, defaultValue);
        this.default = defaultValue;
    }

    reset() {
        this.value = this.default;
    }

    isReset(): boolean {
        return this.serialize(this.value) === this.serialize(this.default);
    }
}

export function resetAll(...stores: ResettableLocalStorage<any>[]) {
    stores.forEach(store => store.reset());
}

export function allReset(...stores: ResettableLocalStorage<any>[]) {
    return stores.filter(store => store.isReset()).length === stores.length;
}