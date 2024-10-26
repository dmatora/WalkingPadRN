import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { WalkingPadContext } from '../contexts/WalkingPadContext';
import { Card } from './shared/Card';
import { Text } from './shared/Text';
import { colors, spacing } from '../theme';

const StatusIndicator = ({ active }: { active: boolean }) => (
  <View
    style={[
      styles.indicator,
      active ? styles.indicatorActive : styles.indicatorInactive,
    ]}
  />
);

const AutoPanel = (): JSX.Element => {
  const { auto, ready } = useContext(WalkingPadContext);

  if (!ready) return null;

  return (
    <Card>
      <View style={styles.statusItem}>
        <StatusIndicator active={auto} />
        <Text>Auto Start/Stop in manual mode</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  indicatorActive: {
    backgroundColor: colors.primary,
  },
  indicatorInactive: {
    backgroundColor: colors.text.disabled,
  },
});

export { AutoPanel };
