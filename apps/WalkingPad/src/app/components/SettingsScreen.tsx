import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from './shared/Button';
import { Text } from './shared/Text';
import { TextInput } from './shared/TextInput';
import { spacing } from '../theme';
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
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const settings = await getSettings();
    if (settings) {
      setIp(settings.ip);
      setToken(settings.token);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    await saveSettings({ ip, token });
    onSave();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text variant="h1" style={styles.title}>
        Settings
      </Text>

      <View style={styles.inputGroup}>
        <Text variant="body">Device IP</Text>
        <TextInput
          value={ip}
          onChangeText={setIp}
          placeholder="192.168.1.100"
          style={styles.input}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text variant="body">Device Token</Text>
        <TextInput
          value={token}
          onChangeText={setToken}
          placeholder="Enter device token"
          style={styles.input}
        />
      </View>

      <Button variant="primary" onPress={handleSave} style={styles.saveButton}>
        Save Settings
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  title: {
    marginBottom: spacing.xl,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  input: {
    marginTop: spacing.xs,
  },
  saveButton: {
    marginTop: spacing.xl,
  },
});
