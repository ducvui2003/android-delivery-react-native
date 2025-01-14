import { OverlappingImagesProps } from "./type/overlappingImages.props";
import { Image, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";

function OverlappingImages({ images, limitShow = 3 }: OverlappingImagesProps) {
	const theme = useSelector((root: RootState) => root.themeState.theme);
	return (
		<View
			style={{
				width: 80,
				height: 80,
			}}
		>
			{images.slice(0, limitShow).map((url, index) => (
				<Image
					key={index}
					source={url}
					style={{
						width: 80,
						height: 80,
						left: index * 20,
						position: "absolute",
						borderRadius: 10,
						borderColor: theme.basket.background.getColor(),
						borderWidth: 2.5,
					}}
				/>
			))}
		</View>
	);
}

export default OverlappingImages;
