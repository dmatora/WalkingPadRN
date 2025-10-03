import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './shared/Text';
import { Button } from './shared/Button';
import { colors, spacing } from '../theme';

interface Props {
  visible: boolean;
  value: number | null;
  exclude?: number[];
  onSelect: (value: number) => void;
  onClose: () => void;
}

const SPEED_OPTIONS: number[] = Array.from({ length: 12 }, (_, i) => parseFloat((0.5 + i * 0.5).toFixed(1)));

export const SpeedPickerModal: React.FC<Props> = ({ visible, value, exclude = [], onSelect, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text variant="h2" style={styles.title}>Choose speed</Text>
          <View style={styles.grid}>
            {SPEED_OPTIONS.map((v) => {
              const isCurrent = value === v;
              const isExcluded = exclude.includes(v) && !isCurrent;
              return (
                <TouchableOpacity
                  key={v}
                  disabled={isExcluded}
                  onPress={() => {
                    onSelect(v);
                    onClose();
                  }}
                  style={[styles.option, isCurrent && styles.optionActive, isExcluded && styles.optionDisabled]}
                >
                  <Text style={[styles.optionText, isCurrent && styles.optionTextActive, isExcluded && styles.optionTextDisabled]}>{v.toFixed(1)}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Button variant="secondary" onPress={onClose} style={styles.closeButton}>Cancel</Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderRadius: spacing.sm,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },
  title: {
    marginBottom: spacing.md,
    color: colors.text.primary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  option: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.xs,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  optionActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionDisabled: {
    opacity: 0.5,
    backgroundColor: colors.surface,
  },
  optionText: {
    color: colors.text.primary,
    fontWeight: '600',
  },
  optionTextActive: {
    color: colors.background,
  },
  optionTextDisabled: {
    color: colors.text.disabled,
  },
  closeButton: {
    marginTop: spacing.lg,
    width: '100%',
  }
});

export default SpeedPickerModal;
