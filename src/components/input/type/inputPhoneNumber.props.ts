/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:58 PM - 17/08/2024
 *  User: lam-nguyen
 **/
import InputProps from "./input.props";
import CountryPhoneNumberType from "../../../types/countryPhoneNumber.type";

type InputPhoneNumberProps = InputProps & {
	showed?: boolean;
	onShow?: (isShow: boolean) => void;
	onCountryPhoneNumberSelected?: (item: CountryPhoneNumberType) => void;
	onValidation?: (isValid: boolean) => void;
};

export default InputPhoneNumberProps;
