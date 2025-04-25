import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
  useColorScheme
} from 'react-native';
import { useRouter } from 'expo-router';
import { Dumbbell, Trophy, Calendar, CirclePlay as PlayCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import WorkoutCard from '@/components/workout/WorkoutCard';
import { workoutPlans, userProfile, completedWorkouts } from '@/constants/MockData';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Calculate stats
  const totalWorkouts = completedWorkouts.length;
  const totalMinutes = completedWorkouts.reduce((sum, workout) => sum + workout.duration, 0);
  
  // Get last workout
  const lastWorkout = completedWorkouts[completedWorkouts.length - 1];
  const lastWorkoutPlan = workoutPlans.find(plan => plan.id === lastWorkout?.workoutPlanId);
  
  // Get today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.date, { color: colors.gray }]}>{formattedDate}</Text>
          <Text style={[styles.greeting, { color: colors.text }]}>
            Hello, {userProfile.name.split(' ')[0]}
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Image 
            source={{ uri: userProfile.profilePicture }} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>
      
      <Card>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Dumbbell size={24} color={colors.tint} style={styles.statIcon} />
            <Text style={[styles.statValue, { color: colors.text }]}>{totalWorkouts}</Text>
            <Text style={[styles.statLabel, { color: colors.gray }]}>Workouts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Trophy size={24} color={colors.success} style={styles.statIcon} />
            <Text style={[styles.statValue, { color: colors.text }]}>{totalMinutes}</Text>
            <Text style={[styles.statLabel, { color: colors.gray }]}>Minutes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Calendar size={24} color={colors.warning} style={styles.statIcon} />
            <Text style={[styles.statValue, { color: colors.text }]}>
              {userProfile.weeklyWorkouts}
            </Text>
            <Text style={[styles.statLabel, { color: colors.gray }]}>Weekly Goal</Text>
          </View>
        </View>
      </Card>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Continue Training</Text>
        
        {lastWorkoutPlan ? (
          <Card>
            <View style={styles.lastWorkoutContainer}>
              <View style={styles.lastWorkoutContent}>
                <Text style={[styles.lastWorkoutTitle, { color: colors.text }]}>
                  {lastWorkoutPlan.title}
                </Text>
                <Text style={[styles.lastWorkoutDate, { color: colors.gray }]}>
                  Last trained on {new Date(lastWorkout.date).toLocaleDateString()}
                </Text>
                <Button 
                  title="Resume Workout"
                  onPress={() => router.push(`/(tabs)/workouts/${lastWorkoutPlan.id}`)}
                  variant="primary"
                  size="small"
                  style={styles.resumeButton}
                />
              </View>
              <View 
                style={[
                  styles.lastWorkoutIconContainer, 
                  { backgroundColor: colors.tint }
                ]}
              >
                <PlayCircle size={24} color="#ffffff" />
              </View>
            </View>
          </Card>
        ) : (
          <Card>
            <Text style={[styles.noWorkoutText, { color: colors.text }]}>
              No recent workouts. Start a new one!
            </Text>
            <Button 
              title="Start a Workout"
              onPress={() => router.push('/(tabs)/workouts')}
              variant="primary"
              style={styles.startButton}
            />
          </Card>
        )}
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recommended Workouts</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/workouts')}>
            <Text style={[styles.seeAll, { color: colors.tint }]}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {workoutPlans.slice(0, 2).map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            onPress={() => router.push(`/(tabs)/workouts/${workout.id}`)}
          />
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity 
            style={[
              styles.quickActionCard, 
              { backgroundColor: colors.tint }
            ]}
            onPress={() => router.push('/(tabs)/workouts')}
          >
            <Dumbbell size={32} color="#ffffff" />
            <Text style={styles.quickActionText}>Workouts</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.quickActionCard, 
              { backgroundColor: colors.success }
            ]}
            onPress={() => router.push('/(tabs)/progress')}
          >
            <Trophy size={32} color="#ffffff" />
            <Text style={styles.quickActionText}>Progress</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  date: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  lastWorkoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastWorkoutContent: {
    flex: 1,
  },
  lastWorkoutTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  lastWorkoutDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  lastWorkoutIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  resumeButton: {
    alignSelf: 'flex-start',
  },
  noWorkoutText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 12,
    textAlign: 'center',
  },
  startButton: {
    marginTop: 8,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  quickActionText: {
    color: '#ffffff',
    marginTop: 8,
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  footer: {
    height: 24,
  },
});