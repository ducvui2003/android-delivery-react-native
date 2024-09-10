/**
* Author: Nguyen Thanh Binh
* Email: binnguci@gmail.com.vn
* Phone number: +84 9013 230 70
* Create at: 4:42 PM - 10/09/2024
* User: Binnguci 
**/
import { Text, View } from "react-native";

type InformationPromotionFragmentProps = {
	id: string;
	onFocus?: () => void;
};

function InformationPromotionFragment({ id, onFocus }: InformationPromotionFragmentProps) {
	return (
		<View>
			<Text>Information Promotion</Text>
		</View>
	);
}

export default InformationPromotionFragment;