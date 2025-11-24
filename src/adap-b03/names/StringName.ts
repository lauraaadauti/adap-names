import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    // @methodtype initialization-method
    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        this.noComponents = source.length === 0 ? 0 : source.split(this.delimiter).length;
    }

    // @methodtype command-method
    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.noComponents;
    }

    // @methodtype get-method
    public getComponent(i: number): string {
        return this.name.split(this.delimiter)[i];
    }

    // @methodtype set-method
    public setComponent(i: number, c: string) {
        const components = this.name.split(this.delimiter);
        components[i] = c;

        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }

    // @methodtype command-method
    public insert(i: number, c: string) {
        const components = this.name.split(this.delimiter);
        components.splice(i, 0, c);

        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }

    // @methodtype command-method
    public append(c: string) {
        const components = this.name.split(this.delimiter);
        components.push(c);

        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }
    
    // @methodtype command-method
    public remove(i: number) {
        const components = this.name.split(this.delimiter);
        components.splice(i, 1);

        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }
}