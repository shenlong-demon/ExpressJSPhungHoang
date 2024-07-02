import {CONSTANT, RESULT_CODE} from "@core/common";

export class Dto<T> {
    public code: number = RESULT_CODE.SUCCESS;
    public data: T | null | undefined;
    public message: string | null | undefined;

    constructor(code: number, message?: string | null | undefined, data?: T | null | undefined) {
        this.code = code;
        this.data = data;
        this.message = message;
    }

    public next(): boolean {
        return true;
    }
    public bypass(): Dto<null> {
        return new Dto<null>(this.code, this.message);
    }

    public static success<T>(data: T | null | undefined): Dto<T | null | undefined>{
        return new Dto<T | null | undefined>(0, data, CONSTANT.STR_EMPTY)
    }
    public static error<T>(code: number, message?: string): Dto<T | null | undefined>{
        return new Dto<T | null | undefined>(RESULT_CODE.ERROR | code, null, message)
    }

}
