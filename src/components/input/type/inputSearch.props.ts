/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 19/08/2024 - 16:05
 * User: ducvui2003
 **/

import InputProps from "./input.props";

type InputSearchProps = InputProps & {
	onPressIconLeft?: () => void;
	onPressIconRight?: () => void;
};
export default InputSearchProps;
