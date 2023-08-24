import React, {useContext} from 'react';
import {Button, Text, TouchableWithoutFeedback, View} from 'react-native';
import {WalkingPadContext} from '../contexts/WalkingPadContext';

const AutoPanel = (): JSX.Element => {
  const {auto, updateAuto} = useContext(WalkingPadContext);
  return (
    <>
      <Button title="" />
      <Text
        style={{
          fontSize: 20,
          marginTop: 80,
        }}>
        Auto start / stop in manual mode
      </Text>
      <Button title="" />
      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          // justifyContent: 'space-between',
        }}>
        <TouchableWithoutFeedback
          onPress={e => {
            updateAuto(true);
          }}>
          <Text style={{fontSize: 30, color: '#027aff', marginRight: 84}}>
            {auto ? '[ON]' : 'ON'}
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={e => {
            updateAuto(false);
          }}>
          <Text style={{fontSize: 30, color: '#027aff'}}>
            {!auto ? '[OFF]' : 'OFF'}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export {AutoPanel};
