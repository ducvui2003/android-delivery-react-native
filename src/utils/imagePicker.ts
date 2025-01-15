/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:36 PM - 10/09/2024
 * User: lam-nguyen
 **/

import * as ImagePicker from "expo-image-picker";

const pickImage = async () => {
	// No permissions request is necessary for launching the image library
	const result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.All,
		allowsEditing: true,
		quality: 1,
	});

	if (!result.canceled) {
		return result.assets[0];
	}
};

export default { pickImage };
