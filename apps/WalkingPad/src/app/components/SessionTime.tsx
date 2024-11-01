import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { WalkingPadContext } from '../contexts/WalkingPadContext';
import { Card } from './shared/Card';
import { Text } from './shared/Text';
import { spacing } from '../theme';

const StatsCard = ({ title, value }: { title: string; value: string }) => (
  <Card>
    <View style={styles.statsContainer}>
      <Text variant="caption" style={styles.statsLabel}>
        {title}
      </Text>
      <Text variant="h2">{value}</Text>
    </View>
  </Card>
);

export const SessionTime = (): JSX.Element => {
  const { time } = useContext(WalkingPadContext);

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
        <Text style={styles.statsLabel}>Session Time</Text>
        <Text variant="h1">{displayTime}</Text>
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
  statsLabel: {
    textTransform: 'uppercase',
  },
  icon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
});
