import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { WalkingPadContext } from '../contexts/WalkingPadContext';
import { Card } from './shared/Card';
import { Text } from './shared/Text';
import { spacing } from '../theme';

const StatsCard = ({ title, value }: { title: string; value: string }) => (
  <Card>
    <View style={styles.statsContainer}>
      <Text variant="caption" style={styles.statsLabel}>{title}</Text>
      <Text variant="h2">{value}</Text>
    </View>
  </Card>
);

export const SessionSteps = (): JSX.Element => {
  const { steps } = useContext(WalkingPadContext);
  return <StatsCard title="Session Steps" value={steps?.toString() || '0'} />;
};

const styles = StyleSheet.create({
  statsContainer: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  statsLabel: {
    textTransform: 'uppercase',
  },
});
