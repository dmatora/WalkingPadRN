import React, { useContext } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { WalkingPadContext } from '../contexts/WalkingPadContext';

const ModePanel = (): JSX.Element => {
  const { mode, updateMode } = useContext(WalkingPadContext);
  return (
    <View
      style={{
        // flex: 1,
        marginTop: 20,
        flexDirection: 'row',
        // justifyContent: 'space-between',
      }}
    >
      <TouchableWithoutFeedback
        onPress={(e) => {
          updateMode('manual');
        }}
      >
        <Text style={{ fontSize: 34, color: '#027aff', marginRight: 40 }}>
          {mode === 'manual' ? '[MANUAL]' : 'MANUAL'}
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={(e) => {
          updateMode('standby');
        }}
      >
        <Text style={{ fontSize: 34, color: '#027aff' }}>
          {mode === 'standby' ? '[STANDBY]' : 'STANDBY'}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export { ModePanel };
