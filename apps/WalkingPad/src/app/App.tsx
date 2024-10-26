import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  AutoPanel,
  ModePanel,
  SessionTime,
  SettingsScreen,
  SpeedPanel,
  StartButton,
  Text,
} from './components';
import { WalkingPadProvider } from './contexts/WalkingPadContext';
import { colors, spacing } from './theme';
import { StepsCard } from './components/Steps';
import { getSettings } from './storage';

const App = (): JSX.Element => {
  const [showSettings, setShowSettings] = useState(false);

  // Add effect to check settings on mount
  useEffect(() => {
    const checkSettings = async () => {
      const settings = await getSettings();
      if (!settings?.ip || !settings?.token) {
        setShowSettings(true);
      }
    };
    checkSettings();
  }, []);

  return (
    <WalkingPadProvider>
      <View style={styles.container}>
        {showSettings ? (
          <SettingsScreen onSave={() => setShowSettings(false)} />
        ) : (
          <View style={styles.contentContainer}>
            <View style={styles.statsRow}>
              <View style={styles.statsItem}>
                <SessionTime />
              </View>
              <View style={styles.statsItem}>
                <StepsCard />
              </View>
            </View>
            <ModePanel />
            <SpeedPanel />
            <View style={styles.header}>
              <View style={styles.autoContainer}>
                <AutoPanel />
              </View>
              <TouchableOpacity
                onPress={() => setShowSettings(true)}
                style={styles.settingsButton}
              >
                <Text>⚙️</Text>
              </TouchableOpacity>
            </View>
            <StartButton />
          </View>
        )}
      </View>
    </WalkingPadProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  autoContainer: {
    flex: 1,
  },
  settingsButton: {
    padding: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: spacing.sm,
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contentContainer: {
    paddingTop: spacing.xl, // Add top padding to account for settings button
    flex: 1,
    gap: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statsItem: {
    flex: 1,
  },
});

export default App;
