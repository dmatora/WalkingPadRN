import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useWalkingPad } from '../contexts/WalkingPadContext';
import { Text } from './shared/Text';
import { colors, spacing } from '../theme';

const StartButton = (): JSX.Element => {
  const { startRunning, stopRunning, run, ready } = useWalkingPad();

  if (!ready) return null;

  return (
    <TouchableOpacity
      style={[styles.button, run ? styles.running : styles.stopped]}
      onPress={run ? stopRunning : startRunning}
    >
      <Text variant="h2" style={styles.buttonText}>
        {run ? 'STOP (and reset session steps)' : 'START'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: spacing.lg,
    borderRadius: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.md,
  },
  running: {
    backgroundColor: colors.secondary,
  },
  stopped: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.background,
    fontWeight: '700',
  },
});

export { StartButton };
