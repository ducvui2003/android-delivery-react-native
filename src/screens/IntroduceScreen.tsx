/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:20 PM - 14/08/2024
 * User: lam-nguyen
 **/

import React, { useEffect, useRef, useState } from "react";
import {
	SafeAreaView,
	StyleProp,
	StyleSheet,
	Text,
	TextStyle,
	TouchableHighlight,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native";
import introduce_1 from "../../assets/images/introduce/introduce_1.png";
import introduce_2 from "../../assets/images/introduce/introduce_2.png";
import introduce_3 from "../../assets/images/introduce/introduce_3.png";
import introduce_4 from "../../assets/images/introduce/introduce_4.png";
import { useSelector } from "react-redux";
import { RootState } from "../configs/redux/store.config";
import { neutral, primary, white } from "../configs/colors/color-template.config";
import textStyle from "../configs/styles/textStyle.config";
import PagerView from "react-native-pager-view";
import { FragmentIntroduceType } from "../types/fragmentIntroduce.type";
import IntroduceItemFragment from "../fragments/IntroduceItemFragment";
import Carousel from "../components/carousel/Carousel";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigations/stack.type";

const data: FragmentIntroduceType[] = [
	{
		source: introduce_1,
		content: "More than 400 restaurants nationwide.",
		title: "Wide Selection",
	},
	{ source: introduce_2, content: "Receive goods after 10 minutes.", title: "Fast Delivery" },
	{ source: introduce_3, content: "Track your orders in real-time.", title: "Order Tracking" },
	{ source: introduce_4, content: "Special offers", title: "Special offers" },
];

type TextButtonSkip = "Skip" | "Login / Register";
const textButtonNext: Record<TextButtonSkip, "Next" | "Start enjoying"> = {
	Skip: "Next",
	"Login / Register": "Start enjoying",
};

function IntroduceScreen() {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "IntroduceScreen">>();
	const theme = useSelector((state: RootState) => state.themeState.theme);
	const [textButtonSkip, setTextButtonSkip] = useState<TextButtonSkip>("Skip");
	const [currentPageViewPager, setCurrentPageViewPager] = useState(0);
	const viewPagerRef = useRef<PagerView>();

	const onLoginOrRegister = () => {
		navigation.replace("SignUpScreen");
	};

	const onPressButtonNext = () => {
		if (textButtonSkip === "Login / Register" || !viewPagerRef || !viewPagerRef.current) {
			onLoginOrRegister();
			return;
		}
		viewPagerRef.current.setPage(currentPageViewPager + 1);
	};

	const onSkip = () => {
		viewPagerRef?.current?.setPage(data.length - 1);
	};

	const styleAndActionPropButtonSkip: Record<
		TextButtonSkip,
		{
			button: StyleProp<ViewStyle>;
			text: StyleProp<TextStyle>;
			onPress: () => void;
		}
	> = {
		Skip: {
			text: {
				color: theme.textSkip.getColor(),
			},
			button: {
				borderColor: theme.background.getColor(),
			},
			onPress: onSkip,
		},
		"Login / Register": {
			text: {
				color: primary.getColor("500"),
			},
			button: {
				borderColor: neutral.getColor("50"),
			},
			onPress: onLoginOrRegister,
		},
	};

	useEffect(() => {
		if (currentPageViewPager === data.length - 1) {
			setTextButtonSkip("Login / Register");
			return;
		}

		setTextButtonSkip("Skip");
	}, [currentPageViewPager]);

	return (
		<SafeAreaView style={[style.container, { backgroundColor: theme.background.getColor() }]}>
			<Carousel<FragmentIntroduceType>
				data={data}
				viewPagerRef={pagerView => {
					viewPagerRef.current = pagerView;
				}}
				renderItem={(item, index) => {
					return <IntroduceItemFragment key={index} {...item} />;
				}}
				onCurrentPage={setCurrentPageViewPager}
			/>
			<View style={style.viewBottom}>
				<TouchableOpacity style={[style.buttonNext]} onPress={onPressButtonNext}>
					<Text style={[style.textButtonNext]}>{textButtonNext[textButtonSkip]}</Text>
				</TouchableOpacity>
				<TouchableHighlight
					activeOpacity={0.6}
					underlayColor={primary.getColor("500", 0.5)}
					onPress={styleAndActionPropButtonSkip[textButtonSkip].onPress}
					style={[style.buttonSkip, styleAndActionPropButtonSkip[textButtonSkip].button]}
				>
					<Text style={[style.textButtonNext, styleAndActionPropButtonSkip[textButtonSkip].text]}>
						{textButtonSkip}
					</Text>
				</TouchableHighlight>
			</View>
		</SafeAreaView>
	);
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 25,
	},
	viewBottom: {
		marginHorizontal: 25,
	},
	buttonNext: {
		marginTop: 25,
		padding: 15,
		borderRadius: 999,
		backgroundColor: primary.getColor("500"),
	},
	buttonSkip: {
		padding: 15,
		borderRadius: 999,
		marginTop: 8,
		borderWidth: 1,
		borderStyle: "solid",
	},
	textButtonNext: {
		...textStyle["18_semibold"],
		color: white.getColor(),
		textAlign: "center",
	},
	viewPager: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default IntroduceScreen;
