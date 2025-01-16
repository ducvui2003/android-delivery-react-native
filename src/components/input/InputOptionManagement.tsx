import { GroupOptionType, OptionType } from "../../types/productDetail.type";
import { StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import { ThemeType } from "../../types/theme.type";
import InputIcon from "./InputIcon";
import Selector from "../selector/Selector";
import * as React from "react";
import { useState } from "react";
import { OptionKind } from "./type/inputOptionManagement.props";
import { primary, white } from "../../configs/colors/color-template.config";
import Col from "../custom/Col";
import Row from "../custom/Row";

function OptionProductManagement(prop: (OptionType | GroupOptionType)[] | undefined) {
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const styles = makeStyled(theme);
	const [optionKind, setOptionKind] = useState<OptionKind>("Mono");
	const [infoOptionBaseCount, setInfoOptionBaseCount] = useState<number>(2);

	const renderOptionType = (item: OptionKind, index: number) => {
		return (
			<Text key={index} style={styles.itemSelected}>
				{item}
			</Text>
		);
	};
	const renderOptionTypeSelected = (item: OptionKind) => {
		return <Text>{item}</Text>;
	};
	return (
		<Col style={styles.container}>
			<InputIcon
				width={92}
				height={56}
				placeholder={optionKind === "Mono" ? "Name" : "Group Name"}
				iconRight={
					<Selector
						data={["Mono", "Group"]}
						renderItem={renderOptionType}
						renderItemSelected={renderOptionTypeSelected}
						backgroundColorSelected={primary.getColor("500")}
						backgroundColorItems={theme.background_input.getColor()}
					/>
				}
			/>
			{/*{optionKind === "Mono" ? (*/}
			{/*	<InputIcon placeholder={"Price"} height={56} />*/}
			{/*) : (*/}
			{/*	<Col>*/}
			{/*		{Array.from({ length: infoOptionBaseCount }).map((record: OptionType, index) => (*/}
			{/*			<InfoOptionBase {...record} />*/}
			{/*		))}*/}
			{/*	</Col>*/}
			{/*)}*/}
		</Col>
	);
}

export function InfoOptionBase(prop: OptionType) {
	return (
		<Row
			style={{
				paddingVertical: 12,
				alignItems: "center",
				justifyContent: "space-between",
			}}
			key={prop.id}
		>
			<InputIcon placeholder={"Name"} height={56} width={168} value={prop.name} />
			<InputIcon placeholder={"Price"} height={56} width={168} value={prop.name} />
		</Row>
	);
}

const makeStyled = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.background.getColor(),
			width: 138,
			alignItems: "center",
			justifyContent: "space-between",
			shadowColor: "#0D0A2C",
			shadowOffset: { width: -50, height: 5 },
			shadowOpacity: 0.2,
			shadowRadius: 10,
			elevation: 5,
		},
		itemSelected: {
			fontWeight: "bold",
			color: white.getColor(),
		},
	});

export default OptionProductManagement;
