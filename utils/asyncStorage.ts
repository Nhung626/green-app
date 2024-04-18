import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearAllAsyncStorage = async () => {
    AsyncStorage.clear();
};

export const setItemAsyncStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(error);
    }
};

export const getItemStringAsyncStorage = async key => {
    const value = await AsyncStorage.getItem(key);
    return value;
};

export const getItemObjectAsyncStorage = async key => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) { }
};