import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  View,
} from 'react-native';
import { colors, spacing } from '../../theme';

interface CustomTextInputProps extends TextInputProps {
  error?: string;
}

export const TextInput: React.FC<CustomTextInputProps> = ({
  style,
  error,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <RNTextInput
        style={[styles.input, error && styles.inputError, style]}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    color: colors.text.primary,
  },
  inputError: {
    borderColor: colors.secondary,
  },
  errorText: {
    color: colors.secondary,
    fontSize: 12,
    marginTop: spacing.xs,
  },
});
