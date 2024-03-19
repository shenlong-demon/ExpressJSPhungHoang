export class Dto<T> {
    public readonly code: string;
    public data: T | null | undefined;
    public message: string | null | undefined;

    constructor(code: string, message?: string | null | undefined, data?: T | null | undefined) {
        this.code = code;
        this.data = data;
        this.message = message;
    }

    isSuccess(needCheckData?: boolean | undefined): boolean {
        return this.code === '' && (!needCheckData || (needCheckData && !!this.data));
    }

    static success<T>(data?: T | null | undefined): Dto<T> {
        return new Dto<T>('','', data);
    }
    static failed(code: string, message?: string | null | undefined): Dto<null> {
        return new Dto(code, message, null);
    }
}