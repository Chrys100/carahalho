import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { Exercise } from '@/types';
import { ChevronRight } from 'lucide-react-native';

type ExerciseItemProps = {
  exercise: Exercise;
  onPress: () => void;
};

export default function ExerciseItem({ exercise, onPress }: ExerciseItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
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
      activeOpacity={0.7}
    >
      <Image source={{ uri: exercise.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]}>{exercise.name}</Text>
        <Text style={[styles.category, { color: colors.gray }]}>{exercise.category}</Text>
        <View style={styles.muscles}>
          {exercise.muscles.slice(0, 3).map((muscle, index) => (
            <View 
              key={index} 
              style={[
                styles.muscleTag, 
                { backgroundColor: colors.lightGray }
              ]}
            >
              <Text style={[styles.muscleText, { color: colors.gray }]}>
                {muscle}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <ChevronRight size={20} color={colors.gray} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
    borderWidth: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 2,
  },
  category: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 6,
  },
  muscles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  muscleTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  muscleText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
});