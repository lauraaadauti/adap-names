import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.assertValidDelimiter(delimiter);
        this.delimiter = delimiter  ?? DEFAULT_DELIMITER;
    }

    public abstract clone(): Name;

    public asString(delimiter: string = this.delimiter): string {
        this.assertInvariant();
        this.assertValidDelimiter(delimiter);

        const components: string[] = [];

        for (let i = 0; i < this.getNoComponents(); i++) {
            components.push(this.getComponent(i));
        }
        const result = components.join(delimiter);
        MethodFailedException.assert(result != null, "This method failed!");
        return result;
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        this.assertInvariant();
        this.assertValidDelimiter(this.delimiter);

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
        const result = comp.join(this.delimiter);
        MethodFailedException.assert(result != null, "This method failed!");
        return result;
    }

    public isEqual(other: Name): boolean {
        this.assertInvariant();
        this.assertValidDelimiter(this.delimiter);

        const result = this.asDataString() === other.asDataString();
        return result;
    }

    public getHashCode(): number {
        this.assertInvariant();
        this.assertValidDelimiter(this.delimiter);

        const text = this.asDataString();
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            hash = ((hash << 5) - hash) + text.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    }

    public isEmpty(): boolean {
        this.assertInvariant();
        this.assertValidDelimiter(this.delimiter);

        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        this.assertInvariant();
        this.assertValidDelimiter(this.delimiter);

        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        IllegalArgumentException.assert(other != null, "Other name must not be null");
        this.assertInvariant();
        this.assertValidDelimiter(this.delimiter);

        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
        MethodFailedException.assert(this.getNoComponents() >= other.getNoComponents(), "Concat must increase component count");
    }

    protected assertInvariant(): void {
        InvalidStateException.assert(this.getNoComponents() >= 0, "Number of components cannot be negative");
    }

    protected assertValidDelimiter(delimiter: string | null | undefined): void {
        IllegalArgumentException.assert(this.isValidDelimiter(delimiter), "Delimiter must be a single character");
    }

    protected isValidDelimiter(delimiter: string | null | undefined): boolean {
        return delimiter != null && delimiter != undefined && delimiter.length === 1;
    }
}