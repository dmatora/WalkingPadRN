import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';

interface CustomTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'body' | 'caption';
}

export const Text: React.FC<CustomTextProps> = ({
  variant = 'body',
  style,
  ...props
}) => {
  return (
    <RNText
      style={[styles.base, styles[variant], style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    color: colors.text.primary,
  },
  h1: typography.h1,
  h2: typography.h2,
  body: typography.body,
  caption: typography.caption,
});
