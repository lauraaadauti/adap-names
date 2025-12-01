import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        IllegalArgumentException.assert(source !== null && source !== undefined, "Source may not be null!");
        super(delimiter);
        this.assertValidDelimiter(delimiter);
        this.components = source;
        this.assertInvariant();
    }

    public clone(): Name {
        this.assertInvariant();
        const cloned = new StringArrayName(this.components, this.delimiter);
        MethodFailedException.assert(cloned.asDataString() === this.asDataString(), "Clone failed");
        this.assertInvariant();
        return cloned;
    }

    public getNoComponents(): number {
        this.assertInvariant();
        const count = this.components.length;
        MethodFailedException.assert(count >= 0, "Number of components cannot be negative");
        this.assertInvariant();
        return count;
    }

    public getComponent(i: number): string {
        this.assertInvariant();
        this.assertValidIndex(i);
        const result = this.components[i];

        MethodFailedException.assert(result !== null && result !== undefined, "Component missing");
        this.assertInvariant();
        return result;
    }

    public setComponent(i: number, c: string) {
        this.assertInvariant();
        this.assertValidIndex(i);
        IllegalArgumentException.assert(c !== null && c !== undefined, "Component may not be null");
        this.components[i] = c;
        MethodFailedException.assert(this.components[i] === c, "Component not set correctly");
        this.assertInvariant();
    }

    public insert(i: number, c: string) {
        this.assertValidIndex(i);
        IllegalArgumentException.assert(c !== null && c !== undefined, "Component may not be null");
        IllegalArgumentException.assert(i >= 0 && i <= this.components.length, "Invalid index");
        const comp = this.components.length;
        this.components.splice(i, 0, c);

        MethodFailedException.assert(this.components.length === comp + 1, "Insert failed");
        MethodFailedException.assert(this.components[i] === c, "Inserted component incorrect");
        this.assertInvariant();
    }

    public append(c: string) {
        this.assertInvariant();

        IllegalArgumentException.assert(c !== null && c !== undefined, "Component may not be null");
        
        const append = this.components.length;
        this.components.push(c);

        IllegalArgumentException.assert(this.components.length === append + 1, "Append failed");

        this.assertInvariant();
    }

    public remove(i: number) {
        this.assertInvariant();
        this.assertValidIndex(i);
        this.components.splice(i, 1);
        this.assertInvariant();
    }

    protected assertValidIndex(i: number): void {
        IllegalArgumentException.assert(Number.isInteger(i) && i >= 0 && i < this.components.length,`Index ${i} is out of bounds`);
    }
}