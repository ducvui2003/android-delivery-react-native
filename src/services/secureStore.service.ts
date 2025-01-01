/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 8/8/24 - 12:26pm
 * User: ducvui2003
 **/
import * as SecureStore from "expo-secure-store";

enum KEY_SECURE {
	ACCESS_TOKEN = "access_token",
	REFRESH_TOKEN = "refresh_token",
}

async function setToStorage(key: KEY_SECURE, value: string) {
	await SecureStore.setItemAsync(key, value).then();
}

async function getFromStorage(key: KEY_SECURE | string): Promise<string | null> {
	return await SecureStore.getItemAsync(key);
}

async function removeFromStorage(key: KEY_SECURE): Promise<void> {
	try {
		await SecureStore.deleteItemAsync(key);
	} catch (e) {
		console.error("Error removing data from SecureStore", e);
	}
}

async function removeAllFromStorage(): Promise<void> {
	try {
		for (const key in KEY_SECURE) {
			const value = KEY_SECURE[key as keyof typeof KEY_SECURE];
			await removeFromStorage(value);
		}
	} catch (e) {
		console.error("Error removing data from SecureStore", e);
	}
}

export { setToStorage, getFromStorage, KEY_SECURE, removeFromStorage, removeAllFromStorage };
