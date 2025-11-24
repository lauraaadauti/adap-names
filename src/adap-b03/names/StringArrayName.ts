import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    // @methodtype initialization-method
    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = source;
    }

    // @methodtype command-method
    public clone(): Name {
        return new StringArrayName(this.components, this.delimiter);
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.components.length;
    }

    // @methodtype get-method
    public getComponent(i: number): string {
        return this.components[i];
    }

    // @methodtype set-method
    public setComponent(i: number, c: string) {
        this.components[i] = c;
    }

    // @methodtype command-method
    public insert(i: number, c: string) {
        this.components.splice(i, 0, c);
    }

    // @methodtype command-method
    public append(c: string) {
        this.components.push(c);
    }

    // @methodtype command-method
    public remove(i: number) {
        this.components.splice(i, 1);
    }
}