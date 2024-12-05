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
import {
  SocketProvider,
  useWalkingPadSocket,
  WalkingPadProvider,
} from './contexts';

import { colors, spacing } from './theme';
import { StepsCard } from './components/Steps';
import { getSettings } from './storage';

const SetupProviders = (): JSX.Element => {
  return (
    <SocketProvider>
      <WalkingPadProvider>
        <App />
      </WalkingPadProvider>
    </SocketProvider>
  );
};

const App = (): JSX.Element => {
  const [showSettings, setShowSettings] = useState(false);
  const { connected } = useWalkingPadSocket();

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
    <View style={styles.container}>
      {showSettings ? (
        <SettingsScreen onSave={() => setShowSettings(false)} />
      ) : (
        <View style={styles.contentContainer}>
          {!connected && (
            <View style={styles.connectionWarning}>
              <Text style={styles.warningText}>Connecting to device...</Text>
            </View>
          )}
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
  connectionWarning: {
    backgroundColor: colors.secondary,
    padding: spacing.sm,
    alignItems: 'center',
    borderRadius: spacing.sm,
    marginBottom: spacing.md,
  },
  warningText: {
    color: colors.background,
    fontWeight: '500',
  },
});

export default SetupProviders;
