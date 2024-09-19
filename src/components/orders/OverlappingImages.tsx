import {OverlappingImagesProps} from "./type/overlappingImages.props";
import {Image, View} from "react-native";
import {neutral} from "../../configs/colors/color-template.config";

function OverlappingImages({images, limitShow = 3}: OverlappingImagesProps) {

	return (
		<View style={{
			width: 80,
			height: 80,
		}}>
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
						borderColor: "white",
						borderWidth: 2}}
				/>
			))}
		</View>
	)
}

export default OverlappingImages;