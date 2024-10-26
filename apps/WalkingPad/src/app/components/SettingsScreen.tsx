import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { getSettings, saveSettings } from '../storage';

export const SettingsScreen = ({
  onSave,
}: {
  onSave: () => void;
}): JSX.Element => {
  const [ip, setIp] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getSettings();
      if (settings) {
        setIp(settings.ip);
        setToken(settings.token);
      }
      setLoading(false);
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    await saveSettings({ ip, token });
    onSave();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={ip}
        onChangeText={setIp}
        placeholder="IP Address"
      />
      <TextInput
        style={styles.input}
        value={token}
        onChangeText={setToken}
        placeholder="Token"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});
