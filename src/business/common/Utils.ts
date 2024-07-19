const { v4: uuidv4 } = require('uuid');

export class Utils {
    public static uuid(): string {
        return uuidv4();
    }
}
