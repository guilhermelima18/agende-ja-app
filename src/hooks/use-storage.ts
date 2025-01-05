import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getUserStorage() {
  const user = await AsyncStorage.getItem("@agende-ja:user");

  if (user) {
    return JSON.parse(user);
  }

  return null;
}
