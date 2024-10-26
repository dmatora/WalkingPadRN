import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { WalkingPadContext } from '../contexts/WalkingPadContext';
import { Card } from './shared/Card';
import { Text } from './shared/Text';
import { spacing } from '../theme';

export const SessionTime = (): JSX.Element => {
  const { time, leftSeconds } = useContext(WalkingPadContext);

  let displayTime = '00:00:00';
  if (time) {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    displayTime = `${hours}:${minutes}:${seconds}`;
  }

  return (
    <Card>
      <View style={styles.statsContainer}>
        <Text style={styles.icon}>⏱️</Text>

        <View style={styles.row}>
          <Text variant="caption" style={styles.label}>
            Session
          </Text>
          <Text variant="h2" style={styles.value}>
            {displayTime}
          </Text>
        </View>

        <View style={styles.row}>
          <Text variant="caption" style={styles.label}>
            Next Check In
          </Text>
          <Text variant="h2" style={styles.value}>
            {leftSeconds || '?'}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    alignItems: 'center',
    gap: spacing.xs,
    height: 84,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 12,
    marginTop: 2,
  },
  value: {
    marginLeft: spacing.sm,
  },
  icon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
});
