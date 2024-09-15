/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:12 PM - 13/09/2024
 *  User: lam-nguyen
 **/

import { Image } from "react-native";
import money from "./money.png";

export default function LogosMoney({ width = 20, height = 20 }: { width?: number; height?: number }) {
  return <Image source={money} style={{ width, height, justifyContent: "center", alignItems: "center" }} />;
}
