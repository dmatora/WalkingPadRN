import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  AutoPanel,
  ModePanel,
  NextCheck,
  SessionSteps,
  SessionTime,
  SettingsScreen,
  SpeedPanel,
  StartButton,
  TodaySteps,
} from './components';
import { WalkingPadProvider } from './contexts/WalkingPadContext';

const App = (): JSX.Element => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <WalkingPadProvider>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setShowSettings(true)}
        >
          <Text>⚙️</Text>
        </TouchableOpacity>

        {showSettings ? (
          <SettingsScreen onSave={() => setShowSettings(false)} />
        ) : (
          <>
            <TodaySteps />
            <SessionSteps />
            <SessionTime />
            <NextCheck />
            <StartButton />
            <ModePanel />
            <SpeedPanel />
            <AutoPanel />
          </>
        )}
      </View>
    </WalkingPadProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12%',
    fontSize: 18,
  },
  settingsButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
});

export default App;
