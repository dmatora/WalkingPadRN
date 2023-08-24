import React, {useContext} from 'react';
import {Button, Text, TouchableWithoutFeedback, View} from 'react-native';
import {WalkingPadContext} from '../contexts/WalkingPadContext';

const SpeedPanel = (): JSX.Element => {
  const {speed, updateSpeed} = useContext(WalkingPadContext);
  return (
    <>
      <Text
        style={{
          fontSize: 20,
          marginTop: 80,
        }}>
        Select current/start speed
      </Text>
      <Button title="" />
      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          // justifyContent: 'space-between',
        }}>
        <TouchableWithoutFeedback onPress={e => updateSpeed(5)}>
          <Text style={{fontSize: 30, color: '#027aff', marginRight: 30}}>
            {speed === 5 ? '[0.5]' : '0.5'}
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={e => updateSpeed(10)}>
          <Text style={{fontSize: 30, color: '#027aff', marginRight: 30}}>
            {speed === 10 ? '[1.0]' : '1.0'}
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={e => updateSpeed(15)}>
          <Text style={{fontSize: 30, color: '#027aff', marginRight: 30}}>
            {speed === 15 ? '[1.5]' : '1.5'}
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={e => updateSpeed(20)}>
          <Text style={{fontSize: 30, color: '#027aff'}}>
            {speed === 20 ? '[2.0]' : '2.0'}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export {SpeedPanel};
