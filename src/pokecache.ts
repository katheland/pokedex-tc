export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(i: number) {
        this.#interval = i;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T) {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val: val
        });
    }

    get<T>(key: string): (T | undefined) {
        const entry = this.#cache.get(key);
        if (entry) {
            return entry.val;
        }
        return undefined;
    }

    #reap() {
        const t = Date.now() - this.#interval;
        this.#cache.forEach((value, key) => {
            if (t >= (this.#cache.get(key) as CacheEntry<any>).createdAt) {
                this.#cache.delete(key);
            }
        });
    }

    #startReapLoop() {
        let id = setInterval(this.#reap.bind(this), this.#interval);
        this.#reapIntervalId = id;
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}