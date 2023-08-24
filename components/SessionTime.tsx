import React, {useContext} from 'react';
import {Text} from 'react-native';
import {WalkingPadContext} from '../contexts/WalkingPadContext';

const SessionTime = (): JSX.Element => {
  const {time} = useContext(WalkingPadContext);
  let displayTime = '?';

  if (time) {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    displayTime = `${hours}:${minutes}:${seconds}`;
  }

  return (
    <Text style={{fontSize: 30, marginTop: 20}}>
      Session Time {displayTime}
    </Text>
  );
};

export {SessionTime};
