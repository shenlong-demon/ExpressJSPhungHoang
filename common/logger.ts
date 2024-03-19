export class Logger {
    static log(func: () => any[]): void {
        try{
            const data: any[] = func();
            data.forEach((_d: any): void => {
                console.log(_d);
            });
        }
        catch (e){}
    }
}