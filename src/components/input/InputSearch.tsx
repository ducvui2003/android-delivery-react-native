/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 19/08/2024 - 16:05
 * User: ducvui2003
 **/

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import InputSearchProps from "./type/inputSearch.props";
import InputIcon from "./InputIcon";
import { neutral } from "../../configs/colors/color-template.config";
import SolarMagniferOutline from "../../../assets/images/icons/MagniferOutline";
import RivetIconsFilter from "../../../assets/images/icons/SolarFilterOutline";

const InputSearch = ({
	onPressIconLeft,
	onPressIconRight,
	onChange,
	onFocus,
	onBlur,
	placeholder,
	value,
	keyboardType,
	focus,
	autoFocus,
}: InputSearchProps) => {
	const theme = useSelector((state: RootState) => state.themeState.theme);

	return (
		<InputIcon
			iconLeft={
				<SolarMagniferOutline
					width={25}
					height={25}
					style={{ marginRight: 12 }}
					color={neutral.getColor("100")}
				/>
			}
			iconRight={
				<RivetIconsFilter
					width={25}
					height={25}
					style={{ marginLeft: 12 }}
					color={theme.home.search.icon.getColor()}
				/>
			}
			styleInput={{ color: theme.text_3.getColor() }}
			onBlur={onBlur}
			keyboardType={keyboardType}
			onChange={onChange}
			onFocus={onFocus}
			value={value}
			focus={focus}
			placeholder={placeholder}
			onPressIconLeft={onPressIconLeft}
			onPressIconRight={onPressIconRight}
			autoFocus={autoFocus}
		/>
	);
};

export default InputSearch;
