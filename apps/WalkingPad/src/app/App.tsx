import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  AutoPanel,
  ModePanel,
  NextCheck,
  SessionSteps,
  SessionTime,
  SpeedPanel,
  StartButton,
  TodaySteps,
} from './components';
import { WalkingPadProvider } from './contexts/WalkingPadContext';

const App = (): JSX.Element => {
  return (
    <WalkingPadProvider>
      <View style={styles.container}>
        <TodaySteps />
        <SessionSteps />
        <SessionTime />
        <NextCheck />
        <StartButton />
        <ModePanel />
        <SpeedPanel />
        <AutoPanel />
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
});

export default App;
