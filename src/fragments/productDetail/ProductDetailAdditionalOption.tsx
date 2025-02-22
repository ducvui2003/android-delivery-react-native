/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 6:24 PM - 28/08/2024
 *  User: lam-nguyen
 **/

// @flow
import * as React from "react";
import { useEffect, useState } from "react";
import Col from "../../components/custom/Col";
import { Text, View } from "react-native";
import textStyle from "../../configs/styles/textStyle.config";
import { OptionItem } from "../../components/optionItem/OptionItem";
import SolarDot from "../../../assets/images/icons/SolarDot";
import { neutral } from "../../configs/colors/color-template.config";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import { GroupOptionSelected } from "../../screens/ProductDetailScreen";
import { GroupOptionType, OptionType } from "../../types/productDetail.type";
import Formater from "../../utils/formater";

type ProductDetailAdditionalOptionProps = {
	data: (OptionType | GroupOptionType)[];
	onAdditionalOption?: (value: (OptionType | GroupOptionSelected)[]) => void;
};

export function ProductDetailAdditionalOption({ data, onAdditionalOption }: ProductDetailAdditionalOptionProps) {
	const [additionalOption, setAdditionalOption] = useState<(OptionType | GroupOptionSelected)[]>([]);
	const theme = useSelector((state: RootState) => state.themeState.theme);

	useEffect(() => {
		onAdditionalOption?.(additionalOption);
	}, [additionalOption]);

	const renderOption = (option: OptionType) => {
		const isSelected = additionalOption.filter(item => item.id === option.id).length > 0;
		return (
			<View key={option.id}>
				<OptionItem
					selected={isSelected}
					onPress={() => {
						if (isSelected) setAdditionalOption(additionalOption.filter(item => item.id !== option.id));
						else setAdditionalOption([...additionalOption, option]);
					}}
					icon={"square"}
					name={option.name}
					price={"+ " + Formater.formatCurrency(option.price)}
				/>
			</View>
		);
	};

	const renderGroupOption = (groupOption: GroupOptionType) => {
		const groupOptionSelected = additionalOption.filter(
			item => (item as GroupOptionSelected).id === groupOption.id
		)[0] as GroupOptionSelected | undefined;
		return (
			<Col key={groupOption.id}>
				<OptionItem
					selected={groupOptionSelected !== undefined}
					onPress={() => {
						if (groupOptionSelected)
							setAdditionalOption(
								additionalOption.filter(item => (item as GroupOptionSelected).id !== groupOption.id)
							);
						else addOption(groupOption.options[0], groupOption);
					}}
					icon={"square"}
					name={groupOption.name}
				/>
				{groupOption.options.map(option => {
					return (
						<OptionItem
							key={option.id}
							selected={groupOptionSelected?.option.id === option.id}
							beforeText={<SolarDot color={neutral.getColor("300")} />}
							onPress={() => {
								if (groupOptionSelected)
									setAdditionalOption(
										additionalOption.map(item => {
											const groupOption = item as GroupOptionSelected;
											if (groupOption.id === groupOptionSelected.id)
												return {
													...groupOption,
													option: option,
												} as GroupOptionSelected;

											return groupOption;
										})
									);
								else addOption(option, groupOption);
							}}
							icon={"circle"}
							name={option.name}
							price={"+ " + Formater.formatCurrency(option.price)}
						/>
					);
				})}
			</Col>
		);
	};

	const addOption = (option: OptionType, groupOption?: GroupOptionType) => {
		if (groupOption) {
			setAdditionalOption([
				...additionalOption,
				{
					...groupOption,
					option: option,
				} as GroupOptionSelected,
			]);
		} else {
			setAdditionalOption([...additionalOption, option]);
		}
	};

	return (
		<Col>
			<Text style={{ ...textStyle["18_semibold"], color: theme.text_1.getColor(), marginBottom: 16 }}>
				Additional Options :
			</Text>
			{data.map(item => {
				if ((item as OptionType).price) return renderOption(item as OptionType);
				return renderGroupOption(item as GroupOptionType);
			})}
		</Col>
	);
}
