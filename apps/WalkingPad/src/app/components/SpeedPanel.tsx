import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useWalkingPad } from '../contexts/WalkingPadContext';
import { Card } from './shared/Card';
import { Text } from './shared/Text';
import { colors, spacing } from '../theme';
import { Button } from './shared/Button';
import { getSettings, setSpeedPresets } from '../storage';
import SpeedPickerModal from './SpeedPickerModal';

const DEFAULT_SPEED_PRESETS = [0.5, 1.0, 1.5, 2.0];

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  title: {},
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
  tipText: {
    marginTop: spacing.sm,
    color: colors.text.secondary,
  },
});

const SpeedPanel = (): JSX.Element => {
  const { speed, updateSpeed, ready } = useWalkingPad();
  const [presets, setPresets] = useState<number[]>(DEFAULT_SPEED_PRESETS);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadPresets = async () => {
      const settings = await getSettings();
      if (settings?.speedPresets && settings.speedPresets.length > 0) {
        setPresets(settings.speedPresets);
      } else {
        setPresets(DEFAULT_SPEED_PRESETS);
      }
    };
    loadPresets();
  }, []);

  const SpeedButton = ({
    value,
    label,
    onLongPress,
  }: {
    value: number;
    label: string;
    onLongPress?: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.speedButton, speed === value && styles.speedButtonActive]}
      onPress={() => updateSpeed(value)}
      onLongPress={onLongPress}
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
      <View style={styles.headerRow}>
        <Text variant="h2" style={styles.title}>
          Speed
        </Text>
        <Button
          variant="secondary"
          size="small"
          onPress={async () => {
            await setSpeedPresets(DEFAULT_SPEED_PRESETS);
            setPresets(DEFAULT_SPEED_PRESETS);
          }}
        >
          Reset
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        {presets.map((p, idx) => {
          const valueInt = Math.round(p * 10);
          return (
            <SpeedButton
              key={p}
              value={valueInt}
              label={p.toFixed(1)}
              onLongPress={() => setEditingIndex(idx)}
            />
          );
        })}
      </View>
      <Text variant="caption" style={styles.tipText}>
        Long-press a button to customize
      </Text>
      <SpeedPickerModal
        visible={editingIndex !== null}
        value={editingIndex !== null ? presets[editingIndex] : null}
        exclude={
          editingIndex !== null
            ? presets.filter((_, i) => i !== editingIndex)
            : []
        }
        onSelect={async (val) => {
          if (editingIndex === null) return;
          const next = [...presets];
          next[editingIndex] = val;
          const sorted = Array.from(new Set(next)).sort((a, b) => a - b);
          await setSpeedPresets(sorted);
          setPresets(sorted);
          setEditingIndex(null);
        }}
        onClose={() => setEditingIndex(null)}
      />
    </Card>
  );
};

export { SpeedPanel };
