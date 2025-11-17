import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    // @methodtype initialization-method
    constructor(source: string, delimiter?: string) {
        this.name = source;
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this.noComponents = source.length === 0 ? 0 : source.split(this.delimiter).length;

    }

    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        return this.name.split(this.delimiter).join(delimiter);
    }

    // @methodtype conversion-method
    public asDataString(): string {
        const components = this.name.split(this.delimiter);

        const escapedComponents = components.map(component => {
            let escaped = '';
            for (const char of component) {
                if (char === this.delimiter || char === ESCAPE_CHARACTER) {
                    escaped += ESCAPE_CHARACTER;
                }
                escaped += char;
            }
            return escaped;
        });

        return escapedComponents.join(this.delimiter);
    }

    // @methodtype get-method
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    // @methodtype get-method
    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.noComponents;
    }

    // @methodtype get-method
    public getComponent(x: number): string {
        return this.name.split(this.delimiter)[x];
    }

    // @methodtype set-method
    public setComponent(n: number, c: string): void {
        const components = this.name.split(this.delimiter);
        components[n] = c;

        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }

    // @methodtype command-method
    public insert(n: number, c: string): void {
        const components = this.name.split(this.delimiter);
        components.splice(n, 0, c);

        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }

    // @methodtype command-method
    public append(c: string): void {
        const components = this.name.split(this.delimiter);
        components.push(c);

        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }

    // @methodtype command-method
    public remove(n: number): void {
        const components = this.name.split(this.delimiter);
        components.splice(n, 1);

        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }

    // @methodtype command-method
    public concat(other: Name): void {
        for (let n = 0; n < other.getNoComponents(); n++) {
            this.append(other.getComponent(n));
        }
    }

}