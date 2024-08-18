import hexRgb from "hex-rgb";
import { ColorValue } from "react-native/Libraries/StyleSheet/StyleSheet";

export class CodeColor {
	private codeColor: ColorValue;

	private constructor(codeColor: ColorValue) {
		this.codeColor = codeColor;
	}

	public static create(codeColor: ColorValue): CodeColor {
		return new CodeColor(codeColor);
	}

	public getCodeColor(alpha?: number): string {
		if (!alpha) return this.codeColor.toString();

		if (this.codeColor.toString().startsWith("#")) {
			const code = hexRgb(this.codeColor.toString(), {
				alpha: alpha,
				format: "object",
			});

			return `rgba(${code.red}, ${code.green}, ${code.blue}, ${code.alpha})`;
		}

		if (this.codeColor.toString().split(",").length === 4)
			return (
				this.codeColor.toString().substring(0, this.codeColor.toString().lastIndexOf(",")) +
				alpha +
				")"
			);

		return (
			this.codeColor.toString().substring(0, this.codeColor.toString().length - 1) +
			alpha +
			")"
		);
	}

	public setCodeColor(codeColor: string): void {
		this.codeColor = codeColor;
	}
}
