import React, {useContext} from 'react';
import {Text, TouchableWithoutFeedback} from 'react-native';
import {WalkingPadContext} from '../contexts/WalkingPadContext';

const StartButton = (): JSX.Element => {
  const {startRunning, run} = useContext(WalkingPadContext);
  return (
    <TouchableWithoutFeedback
      onPress={e => {
        startRunning();
      }}>
      <Text style={{fontSize: 34, color: '#027aff', marginTop: 30}}>
        {run ? '[RUNNING]' : 'START'}
      </Text>
    </TouchableWithoutFeedback>
  );
};

export {StartButton};
