import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { WalkingPadContext } from '../contexts/WalkingPadContext';
import { Card } from './shared/Card';
import { Text } from './shared/Text';
import { colors, spacing } from '../theme';

const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  speedButton: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: spacing.xs,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  speedButtonActive: {
    backgroundColor: colors.primary,
  },
  speedButtonText: {
    color: colors.text.primary,
  },
  speedButtonTextActive: {
    color: colors.background,
  },
});

const SpeedPanel = (): JSX.Element => {
  const { speed, updateSpeed, ready } = useContext(WalkingPadContext);

  const SpeedButton = ({ value, label }: { value: number; label: string }) => (
    <TouchableOpacity
      style={[styles.speedButton, speed === value && styles.speedButtonActive]}
      onPress={() => updateSpeed(value)}
    >
      <Text
        style={[
          styles.speedButtonText,
          speed === value && styles.speedButtonTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  if (!ready) return null;

  return (
    <Card>
      <Text variant="h2" style={styles.title}>
        Speed
      </Text>
      <View style={styles.buttonContainer}>
        <SpeedButton value={5} label="0.5" />
        <SpeedButton value={10} label="1.0" />
        <SpeedButton value={15} label="1.5" />
        <SpeedButton value={20} label="2.0" />
      </View>
    </Card>
  );
};

export { SpeedPanel };
