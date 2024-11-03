import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useWalkingPad } from '../contexts/WalkingPadContext';
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
  modeButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: spacing.xs,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  modeButtonActive: {
    backgroundColor: colors.primary,
  },
  modeButtonText: {
    color: colors.text.primary,
  },
  modeButtonTextActive: {
    color: colors.background,
  },
});

const ModePanel = (): JSX.Element => {
  const { mode, updateMode, ready } = useWalkingPad();

  const ModeButton = ({
    value,
    label,
  }: {
    value: 'manual' | 'standby';
    label: string;
  }) => (
    <TouchableOpacity
      style={[styles.modeButton, mode === value && styles.modeButtonActive]}
      onPress={() => updateMode(value)}
    >
      <Text
        style={[
          styles.modeButtonText,
          mode === value && styles.modeButtonTextActive,
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
        Mode
      </Text>
      <View style={styles.buttonContainer}>
        <ModeButton value="manual" label="Manual" />
        <ModeButton value="standby" label="Standby" />
      </View>
    </Card>
  );
};
export { ModePanel };
