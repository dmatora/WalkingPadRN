import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  AutoPanel,
  ModePanel,
  NextCheck,
  SessionTime,
  SpeedPanel,
  StartButton,
  TodaySteps,
} from './components';
import {SessionSteps} from './components/SessionSteps';
import {WalkingPadProvider} from './contexts/WalkingPadContext';

const App = (): JSX.Element => {
  useEffect(() => {
    // miioInit().then(async () => {
    //   setWalkingPadReady(true);
    //   const success = await initHealthKit();
    //   setHealthKitReady(success);
    //   // this.checkSteps(0);
    // });
  }, []);

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
