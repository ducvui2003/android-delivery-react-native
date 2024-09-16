/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 2:40 PM - 13/09/2024
 *  User: lam-nguyen
 **/

import React, { useEffect } from "react";
import Row from "../custom/Row";
import CardNumberProps from "./type/cardNumber.props";
import Cell from "./Cell";
import Space from "../custom/Space";
import spacing from "../../configs/styles/space.config";

function CardNumber({ cardNumber = "", focus = false }: CardNumberProps) {
	const numberCard = Array.from({ length: 16 }, (_, index) => Number.parseInt(cardNumber.charAt(index)));

	return (
		<Row flex={0}>
			{numberCard.map((number, index) => {
				return (
					<Row flex={0} key={`card_number_${index}`}>
						<Cell value={Number.isNaN(number) ? -1 : number} focus={cardNumber.length === index && focus} />
						{index % 4 === 3 && <Space width={spacing["spaced-3"]} />}
					</Row>
				);
			})}
		</Row>
	);
}

export default CardNumber;
