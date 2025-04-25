import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

type ProgressBarProps = {
  progress: number; // 0 to 1
  height?: number;
  label?: string;
  showPercentage?: boolean;
  color?: string;
};

export default function ProgressBar({
  progress,
  height = 8,
  label,
  showPercentage = false,
  color,
}: ProgressBarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Ensure progress is between 0 and 1
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const percentage = Math.round(clampedProgress * 100);
  
  const progressBarColor = color || colors.tint;
  
  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
      <View style={[styles.track, { height, backgroundColor: colors.lightGray }]}>
        <View
          style={[
            styles.progress,
            {
              width: `${percentage}%`,
              height,
              backgroundColor: progressBarColor,
            },
          ]}
        />
      </View>
      {showPercentage && (
        <Text style={[styles.percentage, { color: colors.text }]}>{percentage}%</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'Inter-Medium',
  },
  track: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    borderRadius: 4,
  },
  percentage: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
    fontFamily: 'Inter-Regular',
  },
});