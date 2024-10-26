import React, { useContext } from 'react';
import { Text } from 'react-native';
import { WalkingPadContext } from '../contexts/WalkingPadContext';

const TodaySteps = (): JSX.Element => {
  const { todaySteps } = useContext(WalkingPadContext);
  return <Text style={{ fontSize: 30 }}>Steps Today {todaySteps}</Text>;
};

export { TodaySteps };
