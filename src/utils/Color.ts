/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:24 PM - 06/08/2024
 * User: lam-nguyen
 **/
import {CodeColor} from "./CodeColor";

type NameGroupColorItem = "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";

type GroupColorItem = {
    name: NameGroupColorItem;
    codeColor: CodeColor;
}

class ColorFactory {
    public static createSingleColor(color: string): SingleColor {
        return SingleColor.create(color);
    }

    public static createGroupColor(color: string): GroupColor {
        return GroupColor.create(color);
    }

    public static createGradientColor(...colors: string[]): GradientColor {
        return GradientColor.create(colors);
    }
}

class GradientColor {
    private codeColors: CodeColor[];

    private constructor(codeColors: string[]) {
        this.codeColors = codeColors.map(color => CodeColor.create(color));
    }

    public static create(color: string[]): GradientColor {
        return new GradientColor(color);
    }

    public getColor(alpha?: number | number[]): string[] {
        if (typeof alpha === "number")
            return this.codeColors.map(color => color.getCodeColor(alpha));

        return this.codeColors.map((color, index) => color.getCodeColor(alpha ? alpha[index] : undefined));
    };
}

class SingleColor {
    private codeColor: CodeColor;

    private constructor(codeColor: string) {
        this.codeColor = CodeColor.create(codeColor);
    }

    public static create(color: string): SingleColor {
        return new SingleColor(color);
    }

    public getColor(alpha?: number): string {
        return this.codeColor.getCodeColor(alpha);
    };
}

class GroupColor {
    private codeColor: CodeColor;
    private groupColor: GroupColorItem[];

    private constructor(codeColor: string) {
        this.codeColor = CodeColor.create(codeColor);
        this.groupColor = [] as GroupColorItem[];
    }

    public static create(color: string): GroupColor {
        return new GroupColor(color);
    }

    addGroupColorItem(name: NameGroupColorItem, color: string): GroupColor {
        const codeColor = CodeColor.create(color);
        this.groupColor.push({name, codeColor});
        return this;
    }

    public getColor(name?: NameGroupColorItem, alpha?: number): string {
        if (!name)
            return this.codeColor.getCodeColor(alpha);

        const groupColorItem = this.groupColor.find(item => item.name == name);

        if (groupColorItem)
            return groupColorItem.codeColor.getCodeColor(alpha)


        return this.codeColor.getCodeColor(alpha)
    }
}

export default ColorFactory
export {GradientColor, SingleColor, GroupColor};
