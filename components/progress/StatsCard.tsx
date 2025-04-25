import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import Card from '@/components/ui/Card';

type StatsCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
};

export default function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon,
  change
}: StatsCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <Card style={styles.container}>
      <View style={styles.topRow}>
        <Text style={[styles.title, { color: colors.gray }]}>{title}</Text>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
      </View>
      <View style={styles.valueContainer}>
        <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
        {change && (
          <Text 
            style={[
              styles.change, 
              { color: change.isPositive ? colors.success : colors.error }
            ]}
          >
            {change.isPositive ? '↑' : '↓'} {Math.abs(change.value)}%
          </Text>
        )}
      </View>
      {subtitle && (
        <Text style={[styles.subtitle, { color: colors.gray }]}>{subtitle}</Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 140,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  iconContainer: {
    marginLeft: 8,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginRight: 8,
  },
  change: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
});