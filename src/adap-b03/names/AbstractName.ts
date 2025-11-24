import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    // @methodtype initialization-method
    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter  ?? DEFAULT_DELIMITER;
    }

    // @methodtype command-method
    public abstract clone(): Name;

    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        const components: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            components.push(this.getComponent(i));
        }
        return components.join(delimiter);
    }

    // @methodtype conversion-method
    public toString(): string {
        return this.asDataString();
    }

    // @methodtype conversion-method
    public asDataString(): string {
        const comp: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            const components = this.getComponent(i);
            let escaped = '';
            for (const char of components) {
                if (char === this.delimiter || char === ESCAPE_CHARACTER) {
                    escaped += ESCAPE_CHARACTER;
                }
                escaped += char;
            }
            comp.push(escaped);
        }
        return comp.join(this.delimiter);
    }

    // @methodtype get-method
    public isEqual(other: Name): boolean {
        return this.asDataString() === other.asDataString();
    }

    // @methodtype get-method
    public getHashCode(): number {
        const text = this.asDataString();
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            hash = ((hash << 5) - hash) + text.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    }

    // @methodtype get-method
    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    // @methodtype get-method
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    // @methodtype get-method
    abstract getNoComponents(): number;

    // @methodtype get-method
    abstract getComponent(i: number): string;

    // @methodtype set-method
    abstract setComponent(i: number, c: string): void;

    // @methodtype command-method
    abstract insert(i: number, c: string): void;

    // @methodtype command-method
    abstract append(c: string): void;

    // @methodtype command-method
    abstract remove(i: number): void;

    // @methodtype command-method
    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

}