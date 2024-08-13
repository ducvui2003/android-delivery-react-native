/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 8/8/24 - 12:26 pm
 * User: ducvui2003
 **/
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

enum KEY_SECURE {
  ACCESS_TOKEN = "access_token",
}

async function setItem(
  key: keyof typeof KEY_SECURE,
  value: string
): Promise<void> {
  if (Platform.OS === "web") await AsyncStorage.setItem(key, value);
  await SecureStore.setItemAsync(key, value);
}

async function getItem(key: keyof typeof KEY_SECURE): Promise<string | null> {
  if (Platform.OS === "web") return await AsyncStorage.getItem(key);
  return await SecureStore.getItemAsync(key);
}

export { setItem, getItem, KEY_SECURE };
