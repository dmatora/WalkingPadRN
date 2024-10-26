import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { WalkingPadContext } from '../contexts/WalkingPadContext';
import { Card } from './shared/Card';
import { Text } from './shared/Text';
import { spacing } from '../theme';

export const StepsCard = (): JSX.Element => {
  const { steps, todaySteps } = useContext(WalkingPadContext);

  return (
    <Card>
      {/*<Text style={styles.label}>Steps</Text>*/}
      <Text style={styles.icon}>👟 </Text>
      <View style={styles.row}>
        <Text variant="caption" style={styles.label}>
          Session Steps
        </Text>
        <Text variant="h2" style={styles.value}>
          {steps || '0'}
        </Text>
      </View>
      <View style={styles.row}>
        <Text variant="caption" style={styles.label}>
          Today Steps
        </Text>
        <Text variant="h2" style={styles.value}>
          {todaySteps || '0'}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: spacing.sm,
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
    textAlign: 'center',
    fontSize: 24,
    marginBottom: spacing.xs,
  },
});
