import AsyncStorage from "@react-native-async-storage/async-storage";


enum KEY_ASYNC {
	SET_PIN = "set_pin",
}

const saveToStorage = async (key: KEY_ASYNC, value: string) => {
	try {
		await AsyncStorage.setItem(key.toString(), value);
	} catch (error) {
		console.error('Error saving data to AsyncStorage', error);
	}
};

const getFromStorage = async (key: KEY_ASYNC): Promise<string | null> => {
	try {
		return await AsyncStorage.getItem(key.toString());
	} catch (error) {
		console.error('Error fetching data from AsyncStorage', error);
		return null;
	}
};

const removeFromStorage = async (key: KEY_ASYNC) => {
	try {
		await AsyncStorage.removeItem(key.toString());
	} catch (error) {
		console.error('Error removing data from AsyncStorage', error);
	}
};