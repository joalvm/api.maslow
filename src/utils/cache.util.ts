export enum CacheType {
    SESSION = 'session',
    LOCAL = 'local',
}

export default class Cache {
    public static types = CacheType;

    constructor(private type: CacheType = CacheType.LOCAL) {}

    static session() {
        return new this(CacheType.SESSION);
    }

    static local() {
        return new this(CacheType.LOCAL);
    }

    set(items: Partial<Record<string, unknown>>): void;
    set(key: string, value: unknown): void;
    set(...args: [string, unknown] | [Partial<Record<string, unknown>>]): void {
        const first = args[0];
        const second = args[1] || undefined;

        if (second) {
            this.store().setItem(first.toString(), JSON.stringify(second));
            return;
        }

        if (first instanceof Object) {
            Object.entries(first).forEach(([key, value]) => {
                this.store().setItem(key.toString(), JSON.stringify(value));
            });
        }
    }

    has(key: string) {
        return this.store().getItem(key) !== null;
    }

    get<D>(key: string, _default: D | null = null): D | null {
        try {
            const value = this.store().getItem(key);
            return value ? (JSON.parse(value) as D) : _default;
        } catch (error) {
            return null;
        }
    }

    remove(key: string) {
        this.store().removeItem(key);
    }

    clear() {
        this.store().clear();
    }

    private store(): globalThis.Storage {
        return this.type === CacheType.LOCAL ? window.localStorage : window.sessionStorage;
    }
}
