/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:24 PM - 06/08/2024
 * User: lam-nguyen
 **/

type NameGroupColorItem = "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";

type GroupColorItem = {
    name: NameGroupColorItem;
    color: string;
}

class ColorFactory {
    public static createSingleColor(color: string): SingleColor {
        return SingleColor.create(color);
    }

    public static createGroupColor(color: string): GroupColor {
        return GroupColor.create(color);
    }

    public static createGradientColor(colors: string[]): GradientColor {
        return GradientColor.create(colors);
    }
}

abstract class AColor {
    public abstract getColor(name?: NameGroupColorItem): string | string[];

    public abstract setColor(name: NameGroupColorItem | undefined, color: string | string[]): void;
}

class GradientColor extends AColor {
    private codeColors: string[];

    private constructor(codeColors: string[]) {
        super();
        this.codeColors = codeColors;
    }

    public static create(color: string[]): GradientColor {
        return new GradientColor(color);
    }

    public getColor(name?: NameGroupColorItem) {
        return this.codeColors;
    };

    public setColor(name: NameGroupColorItem | undefined, color: string[]): void {
        this.codeColors = color;
    };
}

class SingleColor extends AColor {
    protected codeColor: string;

    protected constructor(codeColors: string) {
        super();
        this.codeColor = codeColors;
    }

    public static create(color: string): SingleColor {
        return new SingleColor(color);
    }

    public getColor(name?: NameGroupColorItem) {
        return this.codeColor;
    };

    public setColor(name: NameGroupColorItem | undefined, color: string): void {
        this.codeColor = color;
    };
}

class GroupColor extends SingleColor {
    private groupColor: GroupColorItem[];

    private constructor(codeColor: string) {
        super(codeColor);
        this.codeColor = codeColor;
        this.groupColor = [] as GroupColorItem[];
    }

    public static create(color: string): GroupColor {
        return new GroupColor(color);
    }

    addGroupColorItem(name: NameGroupColorItem, color: string): GroupColor {
        this.groupColor.push({name, color});
        return this;
    }

    public setGroupColorItem({name, color}: GroupColorItem) {
        const item = this.groupColor.find(item => item.name == name);
        if (item)
            item.color = color;
        else
            this.groupColor.push({name, color});
    }

    public getColor(name?: NameGroupColorItem): string {
        if (name) {
            const item = this.groupColor.find(item => item.name == name);

            if (item) return item.color;
            else return this.codeColor;
        }
        return this.codeColor;
    }

    public setColor(name: NameGroupColorItem | undefined, codeColor: string) {
        if (name)
            this.setGroupColorItem({name, color: codeColor});
        else
            this.codeColor = codeColor;
    }

}

export default ColorFactory
export {GradientColor, SingleColor, GroupColor};
