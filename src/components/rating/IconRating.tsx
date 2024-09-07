/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 8:04 PM - 05/09/2024
 *  User: lam-nguyen
 **/

// @flow
import * as React from "react";
import { useEffect } from "react";
import Row from "../custom/Row";
import IconRatingItem from "./IconRatingItem";
import IconRatingProps from "./type/iconRating.props";

function IconRating({
	total,
	rating,
	icon,
	iconSize,
	colorSelected,
	colorUnselected,
	isChangeable = false,
	onChangeRating,
}: IconRatingProps) {
	useEffect(() => {
		if (!Number.isInteger(total)) throw new Error("Total must be an integer");
		if (rating < 0 || rating > total) throw new Error("Rating must be in range [0, total]");
	}, [rating, total]);
	const [currentRating, setCurrentRating] = React.useState(rating);

	useEffect(() => {
		onChangeRating?.(currentRating);
	}, [currentRating]);

	return (
		<Row flex={0} style={{ justifyContent: "space-between" }}>
			{Array.from({ length: total }, (_, index) => (
				<IconRatingItem
					key={index}
					index={index + 1}
					percent={rating - index >= 1 ? 100 : rating - index <= 0 ? 0 : (rating - index) * 100}
					icon={icon}
					iconSize={iconSize}
					colorSelected={colorSelected}
					colorUnselected={colorUnselected}
					onSelect={isChangeable ? setCurrentRating : () => {}}
				/>
			))}
		</Row>
	);
}

export default IconRating;
