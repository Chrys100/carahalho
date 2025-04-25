import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { WorkoutPlan } from '@/types';
import { Clock, Dumbbell } from 'lucide-react-native';

type WorkoutCardProps = {
  workout: WorkoutPlan;
  onPress: () => void;
};

export default function WorkoutCard({ workout, onPress }: WorkoutCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Get the badge color based on workout level
  const getLevelColor = () => {
    switch (workout.level) {
      case 'beginner':
        return colors.success;
      case 'intermediate':
        return colors.warning;
      case 'advanced':
        return colors.error;
      default:
        return colors.tint;
    }
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { 
          backgroundColor: colors.card,
          borderColor: colors.border,
        }
      ]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: workout.imageUrl }} style={styles.image} />
      <View style={styles.overlay}>
        <View style={[styles.levelBadge, { backgroundColor: getLevelColor() }]}>
          <Text style={styles.levelText}>
            {workout.level.charAt(0).toUpperCase() + workout.level.slice(1)}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{workout.title}</Text>
        <Text 
          style={[styles.description, { color: colors.gray }]}
          numberOfLines={2}
        >
          {workout.description}
        </Text>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Clock size={16} color={colors.gray} style={styles.metaIcon} />
            <Text style={[styles.metaText, { color: colors.gray }]}>
              {workout.duration} min
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Dumbbell size={16} color={colors.gray} style={styles.metaIcon} />
            <Text style={[styles.metaText, { color: colors.gray }]}>
              {workout.exercises.length} exercises
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 8,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 160,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 12,
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  levelText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaIcon: {
    marginRight: 4,
  },
  metaText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});