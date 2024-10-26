import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { WalkingPadContext } from '../contexts/WalkingPadContext';
import { Card } from './shared/Card';
import { Text } from './shared/Text';
import { colors, spacing } from '../theme';

const StatusPanel = (): JSX.Element => {
  const { auto, mode, ready } = useContext(WalkingPadContext);

  return (
    <Card>
      <Text variant="h2" style={styles.title}>
        Status
      </Text>
      <View style={styles.indicators}>
        <Indicator label="Auto" active={auto} />
        <Indicator label="Ready" active={ready} />
        <Indicator label="Manual" active={mode === 'manual'} />
      </View>
    </Card>
  );
};

const Indicator = ({ label, active }: { label: string; active: boolean }) => (
  <View style={styles.indicator}>
    <View
      style={[styles.dot, active ? styles.dotActive : styles.dotInactive]}
    />
    <Text variant="caption">{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.md,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  indicator: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  dotInactive: {
    backgroundColor: colors.text.disabled,
  },
});

export { StatusPanel };
