import {StyleProp, TextStyle} from "react-native";
import React from "react";
import PromotionType from "../../../types/promotion.type";
import PaymentMethodType from "../../../types/paymentMethod.type";
import {MyLocation} from "../../../../assets/data/location/location";

type BoxInfoNecessaryProps = {
	iconTopRight:  React.JSX.Element,
	titleInfo: string,
	descriptionInfo: Pick<PromotionType, "name">[] | Pick<PaymentMethodType, "type"> | MyLocation ,
	styleDescriptionInfo?: StyleProp<TextStyle>
}

export default BoxInfoNecessaryProps;