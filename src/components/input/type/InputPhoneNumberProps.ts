/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 1:58 PM - 17/08/2024
 *  User: lam-nguyen
 **/
import InputProps from "./InputProps";
import React from "react";
import CountryPhoneNumberType from "../../../types/countryPhoneNumber.type";

type InputPhoneNumberProps = InputProps & {
	useStateShowed?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
	onCountryPhoneNumberTypeSelected?: (item: CountryPhoneNumberType) => void;
	onValidation?: (isValid: boolean) => void;
};

export default InputPhoneNumberProps;
