/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 8/8/24 - 12:26pm
 * User: ducvui2003
 **/
import * as SecureStore from "expo-secure-store";
import {Platform} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

enum KEY_SECURE {
    ACCESS_TOKEN = "access_token",
    REFRESH_TOKEN = "refresh_token",
}

function setItem(
    key: keyof typeof KEY_SECURE,
    value: string
) {
    if (Platform.OS === "web") AsyncStorage.setItem(key, value).then();
    SecureStore.setItemAsync(key, value).then();
}

async function getToken(key: keyof typeof KEY_SECURE): Promise<string | null> {
    if (Platform.OS === "web") return await AsyncStorage.getItem(key);
    return await SecureStore.getItemAsync(key);
}

export {setItem, getToken, KEY_SECURE};
