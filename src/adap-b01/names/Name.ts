import { Coordinate } from "../coordinates/Coordinate";

export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];

    // @methodtype initialization-method
    constructor(other: string[], delimiter?: string) {
        this.components = other;
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
    }

    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    // @methodtype conversion-method
    public asDataString(): string {
        const escapedComponents = this.components.map(component => {
            let escaped = '';
            for (let i = 0; i < component.length; i++) {
                const char = component[i];
                if (char === this.delimiter || char === ESCAPE_CHARACTER) {
                    escaped += ESCAPE_CHARACTER;
                }
                escaped += char;
            }
            return escaped;
        });
        
        return escapedComponents.join(this.delimiter)
    }

    // @methodtype get-method
    public getComponent(i: number): string {
        return this.components[i];
    }

    // @methodtype set-method
    public setComponent(i: number, c: string): void {
        this.components[i] = c;
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.components.length;
    }

    // @methodtype command-method
    public insert(i: number, c: string): void {
        this.components.splice(i, 0, c);
    }

    // @methodtype command-method
    public append(c: string): void {
        this.components.push(c);
    }

    // @methodtype command-method
    public remove(i: number): void {
        this.components.splice(i, 1);
    }

}