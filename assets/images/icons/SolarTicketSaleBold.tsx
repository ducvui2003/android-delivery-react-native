/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:23 PM - 06/09/2024
 *  User: lam-nguyen
 **/

import Svg, { Path, Defs, LinearGradient, Stop, SvgProps } from "react-native-svg";

export default function SolarTicketSaleBold(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" {...props}>
      <Defs>
        <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="100%" stopColor="#FAB53C" />
          <Stop offset="0%" stopColor="#FDDEA7" />
        </LinearGradient>
      </Defs>
      <Path
        fill="url(#gradient)"
        fillRule="evenodd"
        d="M9.995 4h4.01c3.78 0 5.67 0 6.845 1.172c.81.806 1.061 1.951 1.14 3.817c.015.37.023.556-.046.679c-.07.123-.345.278-.897.586a1.999 1.999 0 0 0 0 3.492c.552.309.828.463.897.586s.061.308.045.678c-.078 1.867-.33 3.012-1.139 3.818C19.676 20 17.786 20 14.005 20h-4.01c-3.78 0-5.67 0-6.845-1.172c-.81-.806-1.061-1.951-1.14-3.817c-.015-.37-.023-.556.046-.679c.07-.123.345-.277.897-.586a1.999 1.999 0 0 0 0-3.492c-.552-.308-.828-.463-.897-.586s-.061-.308-.045-.679c.078-1.866.33-3.01 1.139-3.817C4.324 4 6.214 4 9.995 4m5.553 4.47a.75.75 0 0 1 0 1.06l-6.015 6a.753.753 0 0 1-1.063 0a.75.75 0 0 1 0-1.06l6.015-6a.753.753 0 0 1 1.063 0m-1.033 7.03a1.001 1.001 0 1 0 0-2c-.554 0-1.003.448-1.003 1s.45 1 1.003 1m-5.013-5c.554 0 1.003-.448 1.003-1s-.449-1-1.003-1a1.001 1.001 0 1 0 0 2"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}
