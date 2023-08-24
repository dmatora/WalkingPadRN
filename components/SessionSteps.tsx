import React, {useContext} from 'react';
import {Text} from 'react-native';
import {WalkingPadContext} from '../contexts/WalkingPadContext';

const SessionSteps = (): JSX.Element => {
  const {steps} = useContext(WalkingPadContext);
  return (
    <Text style={{fontSize: 30, marginTop: 20}}>
      Session Steps {steps || '?'}
    </Text>
  );
};

export {SessionSteps};
