import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        IllegalArgumentException.assert(source !== null && source !== undefined, "Source may not be null!");
        super(delimiter);
        this.assertValidDelimiter(delimiter);
        this.name = source;
        this.noComponents = source.length === 0 ? 0 : source.split(this.delimiter).length;
        this.assertInvariant();
    }

    public clone(): Name {
        this.assertInvariant();
        const cloned = new StringName(this.name, this.delimiter);
        MethodFailedException.assert(cloned.asDataString() === this.asDataString(), "Clone failed");
        this.assertInvariant();
        return cloned;
    }

    public getNoComponents(): number {
        this.assertInvariant();
        const count = this.name.length === 0 ? 0 : this.name.split(this.delimiter).length;
        MethodFailedException.assert(count >= 0, "Component count invalid");
        this.assertInvariant();
        return count;
    }

    public getComponent(i: number): string {
        this.assertInvariant();
        this.assertValidIndex(i);
        
        const parts = this.name.split(this.delimiter);
        const result = parts[i];

        MethodFailedException.assert(result !== null && result !== undefined, "Component missing");
        this.assertInvariant();
        return result;
    }

    public setComponent(i: number, c: string) {
        this.assertInvariant();
        this.assertValidIndex(i);
        IllegalArgumentException.assert(c !== null && c !== undefined, "Component may not be null");
        const components = this.name.split(this.delimiter);
        components[i] = c;

        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
        MethodFailedException.assert(this.noComponents === components.length, "Component not set");
        this.assertInvariant();
    }

    public insert(i: number, c: string) {
        this.assertValidIndex(i);
        IllegalArgumentException.assert(c !== null && c !== undefined, "Component may not be null");
        IllegalArgumentException.assert(i >= 0 && i <= this.getNoComponents(), "Invalid index");
        const components = this.name.split(this.delimiter);
        components.splice(i, 0, c);

        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
        MethodFailedException.assert(this.noComponents === components.length, "Component is not inserted");
        this.assertInvariant();
    }

    public append(c: string) {
        this.assertInvariant();
        IllegalArgumentException.assert(c !== null && c !== undefined, "Component may not be null");
        const components = this.name.split(this.delimiter);
        components.push(c);

        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
        MethodFailedException.assert(this.noComponents === components.length, "Component is not appended");
        this.assertInvariant();
    }

    public remove(i: number) {
        this.assertInvariant();
        this.assertValidIndex(i);
        const components = this.name.split(this.delimiter);
        components.splice(i, 1);

        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
        MethodFailedException.assert(this.noComponents === components.length, "Component not removed");
        this.assertInvariant();
    }

    protected assertValidIndex(i: number): void {
        IllegalArgumentException.assert(Number.isInteger(i) && i >= 0 && i < this.getNoComponents(),`Index ${i} is out of bounds`);
    }

}