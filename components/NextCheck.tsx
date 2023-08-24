import React, {useContext} from 'react';
import {Text} from 'react-native';
import {WalkingPadContext} from '../contexts/WalkingPadContext';

const NextCheck = (): JSX.Element => {
  const {leftSeconds} = useContext(WalkingPadContext);
  return (
    <Text style={{fontSize: 20, marginTop: 30}}>
      Next check in {leftSeconds || '?'} seconds
    </Text>
  );
};

export {NextCheck};
