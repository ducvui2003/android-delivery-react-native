import Svg, { Path, SvgProps } from "react-native-svg";

export function MaterialSymbolsMail(props: SvgProps) {
  return (
    <Svg width="24" height="24" color={"black"} viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"
      ></Path>
    </Svg>
  );
}
