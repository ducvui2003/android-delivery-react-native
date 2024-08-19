/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 16/8/24 - 7:28 pm
 * User: ducvui2003
 **/
import React from "react";
import { StyleSheet, View } from "react-native";
import { GridType } from "./type/grid.type";

function Grid<T>({ row = undefined, col, data, gapRow, gapCol, renderItem }: GridType<T>) {
	if (gapCol === undefined) gapCol = gapRow;
	const styles = makeStyled(gapRow, gapCol);
	if (row === undefined) row = Math.ceil(data.length / col);
	return (
		<View style={styles.container}>
			{Array.from({ length: row }, (_, i) => {
				return (
					<View key={i} style={styles.row}>
						{Array.from({ length: col }, (_, j) => {
							const index = i * col + j;
							return (
								<View key={index} style={styles.col}>
									{index >= data.length || data[index] === undefined
										? null
										: renderItem(data[index], index)}
								</View>
							);
						})}
					</View>
				);
			})}
		</View>
	);
}

const makeStyled = (gapRow: number, gapCol: number) =>
	StyleSheet.create({
		container: {
			gap: gapRow,
			backgroundColor: "transparent",
		},
		row: {
			flexDirection: "row",
			justifyContent: "space-between",
			gap: gapCol,
		},
		col: {
			flex: 1,
		},
	});
export default Grid;
