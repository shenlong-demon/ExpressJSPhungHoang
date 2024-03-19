import {Dto} from "../services";

export class Fto<T> {
    public readonly code: string;
    public data: T | null | undefined;
    public message: string | null | undefined;

    constructor(code: string, message?: string | null | undefined, data?: T | null | undefined) {
        this.code = code;
        this.data = data;
        this.message = message;
    }

    isSuccess(): boolean {
        return this.code === '';
    }

    static success<T>(data?: T | null | undefined): Fto<T> {
        return new Fto<T>('0','', data);
    }

    static from<F, D>(dto: Dto<D>): Fto<F> {
        return new Fto<F>(dto.code, dto.message, dto.data as F);
    }
}
