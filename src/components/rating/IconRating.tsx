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

function IconRating({ total, rating, icon, iconSize, colorSelected, colorUnselected }: IconRatingProps) {
	useEffect(() => {
		if (!Number.isInteger(total)) throw new Error("Total must be an integer");
		if (rating < 0 || rating > total) throw new Error("Rating must be in range [0, total]");
	}, [rating, total]);

	return (
		<Row flex={0} style={{ justifyContent: "space-between" }}>
			{Array.from({ length: total }, (_, index) => (
				<IconRatingItem
					key={index}
					percent={rating - index >= 1 ? 100 : rating - index <= 0 ? 0 : (rating - index) * 100}
					icon={icon}
					iconSize={iconSize}
					colorSelected={colorSelected}
					colorUnselected={colorUnselected}
				/>
			))}
		</Row>
	);
}

export default IconRating;
