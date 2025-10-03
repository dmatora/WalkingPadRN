import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Settings {
  ip: string;
  token: string;
  speedPresets?: number[];
}

const SETTINGS_KEY = '@settings';

export const getSettings = async (): Promise<Settings | null> => {
  const data = await AsyncStorage.getItem(SETTINGS_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveSettings = async (settings: Settings): Promise<void> => {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const setSpeedPresets = async (presets: number[]): Promise<void> => {
  const settings = await getSettings();
  if (!settings) {
    // No settings yet (user likely hasn't configured ip/token); do nothing to avoid wiping token
    return;
  }
  // Normalize values: unique, fixed to 1 decimal, and sorted ascending
  const normalized = Array.from(
    new Set(presets.map((p) => parseFloat(Number(p).toFixed(1))))
  )
    .filter((p) => p >= 0.5 && p <= 6.0)
    .sort((a, b) => a - b);

  await saveSettings({ ...settings, speedPresets: normalized });
};
