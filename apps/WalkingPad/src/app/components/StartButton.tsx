import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { WalkingPadContext } from '../contexts/WalkingPadContext';
import { Text } from './shared/Text';
import { colors, spacing } from '../theme';

const StartButton = (): JSX.Element => {
  const { startRunning, run, ready } = useContext(WalkingPadContext);

  if (!ready) return null;

  return (
    <TouchableOpacity
      style={[styles.button, run ? styles.running : styles.stopped]}
      onPress={startRunning}
    >
      <Text variant="h2" style={styles.buttonText}>
        {run ? 'STOP' : 'START'}
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
