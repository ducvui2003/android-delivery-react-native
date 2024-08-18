/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:12 PM - 07/08/2024
 * User: lam-nguyen
 **/
import ColorFactory from "../../utils/Color";


const gradient = ColorFactory.createGradientColor("#FF6347", "#FF826C");
const gradientBorder = ColorFactory.createGradientColor("rgb(255, 255, 255, 5%)", "rgb(255, 255, 255, 60%)");
const blackBottomSheet = ColorFactory.createSingleColor("#1F2A37");
const blackPopUp = ColorFactory.createSingleColor("#1F2A37");
const gradient2 = ColorFactory.createGradientColor("#FDDEA7", "#FAB53C")
const otherMethodSignIn = ColorFactory.createSingleColor("#6D6C69");
const borderOthMethodSignIn = ColorFactory.createSingleColor("#D6D6D6");

const primary = ColorFactory.createGroupColor("#65291e")
    .addGroupColorItem("50", "#FFEFED")
    .addGroupColorItem("100", "#FFCFC6")
    .addGroupColorItem("200", "#FFB7AA")
    .addGroupColorItem("300", "#FF9684")
    .addGroupColorItem("400", "#FF826C")
    .addGroupColorItem("500", "#FF6347")
    .addGroupColorItem("600", "#E85A41")
    .addGroupColorItem("700", "#B54632")
    .addGroupColorItem("800", "#8C3627")
    .addGroupColorItem("900", "#6B2A1E");

const secondary = ColorFactory.createGroupColor("#6b5401")
    .addGroupColorItem("50", "#FFF9E6")
    .addGroupColorItem("100", "#FFEEB0")
    .addGroupColorItem("200", "#FFE58A")
    .addGroupColorItem("300", "#FFD954")
    .addGroupColorItem("400", "#FFD233")
    .addGroupColorItem("500", "#FFC700")
    .addGroupColorItem("600", "#E8B500")
    .addGroupColorItem("700", "#B58D00")
    .addGroupColorItem("800", "#8C6D00")
    .addGroupColorItem("900", "#6B5400");

const green = ColorFactory.createGroupColor("#0a6640")
    .addGroupColorItem("50", "#E7F9F5")
    .addGroupColorItem("100", "#B6ECDE")
    .addGroupColorItem("200", "#92E3CF")
    .addGroupColorItem("300", "#61D6B9")
    .addGroupColorItem("400", "#42CEAB")
    .addGroupColorItem("500", "#13C296")
    .addGroupColorItem("600", "#11B189")
    .addGroupColorItem("700", "#0D8A6B")
    .addGroupColorItem("800", "#0A6B53")
    .addGroupColorItem("900", "#08513F");

const neutral = ColorFactory.createGroupColor("#0d1317")
    .addGroupColorItem("50", "#E9EAEB")
    .addGroupColorItem("100", "#BABDC1")
    .addGroupColorItem("200", "#989DA3")
    .addGroupColorItem("300", "#697079")
    .addGroupColorItem("400", "#4C555F")
    .addGroupColorItem("500", "#1F2A37")
    .addGroupColorItem("600", "#1C2632")
    .addGroupColorItem("700", "#161E27")
    .addGroupColorItem("800", "#11171E")
    .addGroupColorItem("900", "#0D1217");

const white = ColorFactory.createSingleColor("#ffffff");

export {white, primary, secondary, green, neutral, gradient, gradient2, blackBottomSheet, blackPopUp, gradientBorder, borderOthMethodSignIn, otherMethodSignIn};
