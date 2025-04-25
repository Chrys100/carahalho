import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  useColorScheme,
  Image,
  TouchableOpacity
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import { ArrowLeft, Clock, Dumbbell, Play, CircleCheck as CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react-native';
import { workoutPlans, exercises } from '@/constants/MockData';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function WorkoutDetailScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { id } = useLocalSearchParams();
  
  const [expandedExercises, setExpandedExercises] = useState<string[]>([]);
  
  // Find the workout plan
  const workout = workoutPlans.find(plan => plan.id === id);
  
  if (!workout) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.notFoundContainer}>
          <Text style={[styles.notFoundText, { color: colors.text }]}>
            Workout not found
          </Text>
          <Button
            title="Go Back"
            onPress={() => router.back()}
            variant="primary"
            style={styles.goBackButton}
          />
        </View>
      </View>
    );
  }
  
  // Toggle expanded exercise
  const toggleExercise = (exerciseId: string) => {
    if (expandedExercises.includes(exerciseId)) {
      setExpandedExercises(expandedExercises.filter(id => id !== exerciseId));
    } else {
      setExpandedExercises([...expandedExercises, exerciseId]);
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: workout.imageUrl }} style={styles.coverImage} />
        
        <View style={styles.content}>
          <View style={[styles.levelBadge, { backgroundColor: getLevelColor(workout.level, colors) }]}>
            <Text style={styles.levelText}>
              {workout.level.charAt(0).toUpperCase() + workout.level.slice(1)}
            </Text>
          </View>
          
          <Text style={[styles.title, { color: colors.text }]}>{workout.title}</Text>
          <Text style={[styles.description, { color: colors.gray }]}>{workout.description}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Clock size={18} color={colors.gray} style={styles.metaIcon} />
              <Text style={[styles.metaText, { color: colors.gray }]}>
                {workout.duration} min
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Dumbbell size={18} color={colors.gray} style={styles.metaIcon} />
              <Text style={[styles.metaText, { color: colors.gray }]}>
                {workout.exercises.length} exercises
              </Text>
            </View>
          </View>
          
          <Button
            title="Start Workout"
            onPress={() => {
              // Navigate to active workout screen (not implemented in this MVP)
              alert('Starting workout: ' + workout.title);
            }}
            variant="primary"
            style={styles.startButton}
            icon={<Play size={18} color="#ffffff" />}
          />
          
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Exercises</Text>
          
          {workout.exercises.map((workoutExercise, index) => {
            const exercise = exercises.find(e => e.id === workoutExercise.exerciseId);
            if (!exercise) return null;
            
            const isExpanded = expandedExercises.includes(exercise.id);
            
            return (
              <Card key={index} style={styles.exerciseCard}>
                <TouchableOpacity 
                  style={styles.exerciseSummary}
                  onPress={() => toggleExercise(exercise.id)}
                >
                  <Image source={{ uri: exercise.imageUrl }} style={styles.exerciseImage} />
                  <View style={styles.exerciseInfo}>
                    <Text style={[styles.exerciseName, { color: colors.text }]}>
                      {exercise.name}
                    </Text>
                    <Text style={[styles.exerciseDetails, { color: colors.gray }]}>
                      {workoutExercise.sets} sets • {' '}
                      {workoutExercise.reps ? `${workoutExercise.reps} reps` : `${workoutExercise.time}s`}
                    </Text>
                  </View>
                  {isExpanded ? (
                    <ChevronUp size={20} color={colors.gray} />
                  ) : (
                    <ChevronDown size={20} color={colors.gray} />
                  )}
                </TouchableOpacity>
                
                {isExpanded && (
                  <View style={styles.exerciseExpanded}>
                    <Text style={[styles.exerciseDescriptionTitle, { color: colors.text }]}>
                      Description
                    </Text>
                    <Text style={[styles.exerciseDescription, { color: colors.gray }]}>
                      {exercise.description}
                    </Text>
                    
                    <Text style={[styles.exerciseDescriptionTitle, { color: colors.text }]}>
                      Instructions
                    </Text>
                    {exercise.instructions.map((instruction, idx) => (
                      <View key={idx} style={styles.instructionItem}>
                        <CheckCircle2 size={16} color={colors.tint} style={styles.instructionIcon} />
                        <Text style={[styles.instructionText, { color: colors.text }]}>
                          {instruction}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

// Helper function to get color based on workout level
function getLevelColor(level: string, colors: any) {
  switch (level) {
    case 'beginner':
      return colors.success;
    case 'intermediate':
      return colors.warning;
    case 'advanced':
      return colors.error;
    default:
      return colors.tint;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    width: '100%',
    height: 240,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  levelText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaIcon: {
    marginRight: 6,
  },
  metaText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  startButton: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  exerciseCard: {
    marginBottom: 12,
  },
  exerciseSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  exerciseInfo: {
    flex: 1,
    marginLeft: 12,
  },
  exerciseName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  exerciseExpanded: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  exerciseDescriptionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  exerciseDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  instructionIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  notFoundText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  goBackButton: {
    width: 120,
  },
});