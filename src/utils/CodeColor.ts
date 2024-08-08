import hexRgb from "hex-rgb";

export class CodeColor {
    private codeColor: string;

    private constructor(codeColor: string) {
        this.codeColor = codeColor;
    }

    public static create(codeColor: string): CodeColor {
        return new CodeColor(codeColor);
    }

    public getCodeColor(alpha?: number): string {
        if (!alpha)
            return this.codeColor;


        if (this.codeColor.startsWith("#")) {
            let code = hexRgb(this.codeColor, {
                alpha: alpha,
                format: "object"
            });

            return `rgba(${code.red}, ${code.green}, ${code.blue}, ${code.alpha})`;
        }


        if (this.codeColor.split(",").length === 4)
            return this.codeColor.substring(0, this.codeColor.lastIndexOf(",")) + alpha + ")";

        return this.codeColor.substring(0, this.codeColor.length - 1) + alpha + ")";
    }

    public setCodeColor(codeColor: string): void {
        this.codeColor = codeColor;
    }
}
