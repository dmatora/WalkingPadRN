import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Settings {
  ip: string;
  token: string;
}

const SETTINGS_KEY = '@settings';

export const getSettings = async (): Promise<Settings | null> => {
  const data = await AsyncStorage.getItem(SETTINGS_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveSettings = async (settings: Settings): Promise<void> => {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};
