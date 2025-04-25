import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  useColorScheme,
} from 'react-native';
import Colors from '@/constants/Colors';
import { Activity, Dumbbell, Timer, Flame, Scale } from 'lucide-react-native';
import Card from '@/components/ui/Card';
import StatsCard from '@/components/progress/StatsCard';
import ProgressBar from '@/components/ui/ProgressBar';
import { userProfile, progressData, completedWorkouts } from '@/constants/MockData';

export default function ProgressScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Calculate stats
  const totalWorkouts = completedWorkouts.length;
  const weeklyGoal = userProfile.weeklyWorkouts;
  const weeklyProgress = totalWorkouts / weeklyGoal;
  
  // Calculate weekly changes
  const thisWeekCalories = completedWorkouts.reduce((sum, workout) => sum + workout.calories, 0);
  const totalMinutes = completedWorkouts.reduce((sum, workout) => sum + workout.duration, 0);
  
  // Weight tracking
  const currentWeight = progressData[progressData.length - 1].weight;
  const previousWeight = progressData[progressData.length - 2].weight;
  const weightChange = ((currentWeight - previousWeight) / previousWeight) * 100;
  
  // Activity graph data - we'll use a simplified representation for the MVP
  const lastSixWeeks = progressData.slice(-6);
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Your Progress</Text>
      </View>
      
      <View style={styles.statsSection}>
        <View style={styles.statsRow}>
          <StatsCard
            title="Weight"
            value={`${currentWeight} kg`}
            icon={<Scale size={20} color={colors.gray} />}
            change={{
              value: parseFloat(weightChange.toFixed(1)),
              isPositive: userProfile.fitnessGoal === 'gain' ? weightChange > 0 : weightChange < 0,
            }}
          />
          <StatsCard
            title="Calories"
            value={thisWeekCalories}
            subtitle="Burned this week"
            icon={<Flame size={20} color={colors.gray} />}
          />
        </View>
        <View style={styles.statsRow}>
          <StatsCard
            title="Workouts"
            value={totalWorkouts}
            subtitle={`Goal: ${weeklyGoal} per week`}
            icon={<Dumbbell size={20} color={colors.gray} />}
          />
          <StatsCard
            title="Active Time"
            value={`${totalMinutes} min`}
            subtitle="Total workout time"
            icon={<Timer size={20} color={colors.gray} />}
          />
        </View>
      </View>
      
      <Card style={styles.weeklyProgressCard}>
        <Text style={[styles.weeklyProgressTitle, { color: colors.text }]}>
          Weekly Goal Progress
        </Text>
        <ProgressBar 
          progress={weeklyProgress} 
          height={12} 
          showPercentage 
          label={`${totalWorkouts} of ${weeklyGoal} workouts completed`}
        />
      </Card>
      
      <Card style={styles.weightChartCard}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>
          Weight History
        </Text>
        <View style={styles.weightChartContainer}>
          {lastSixWeeks.map((data, index) => {
            const date = new Date(data.date);
            const weekNumber = `Week ${index + 1}`;
            // Calculate the height of the bar as a percentage of the maximum range
            const maxWeight = Math.max(...lastSixWeeks.map(d => d.weight));
            const minWeight = Math.min(...lastSixWeeks.map(d => d.weight));
            const range = maxWeight - minWeight;
            const normalizedHeight = range === 0 ? 1 : (data.weight - minWeight) / range;
            
            return (
              <View key={index} style={styles.weightChartBar}>
                <View 
                  style={[
                    styles.weightChartFill, 
                    { 
                      height: `${Math.max(normalizedHeight * 100, 10)}%`,
                      backgroundColor: colors.tint 
                    }
                  ]}
                />
                <Text style={[styles.weightChartLabel, { color: colors.gray }]}>
                  {weekNumber}
                </Text>
                <Text style={[styles.weightChartValue, { color: colors.text }]}>
                  {data.weight}
                </Text>
              </View>
            );
          })}
        </View>
      </Card>
      
      <Card style={styles.activityCard}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>
          Activity Summary
        </Text>
        <View style={styles.activityChartContainer}>
          {lastSixWeeks.map((data, index) => {
            // Calculate the height of the bar as a percentage of the maximum activities
            const maxActivities = Math.max(...lastSixWeeks.map(d => d.workoutsCompleted));
            const normalizedHeight = maxActivities === 0 ? 0 : data.workoutsCompleted / maxActivities;
            const date = new Date(data.date);
            const weekNumber = `Week ${index + 1}`;
            
            return (
              <View key={index} style={styles.activityChartBar}>
                <View 
                  style={[
                    styles.activityChartFill, 
                    { 
                      height: `${normalizedHeight * 100}%`,
                      backgroundColor: colors.success 
                    }
                  ]}
                />
                <Text style={[styles.activityChartLabel, { color: colors.gray }]}>
                  {weekNumber}
                </Text>
                <Text style={[styles.activityChartValue, { color: colors.text }]}>
                  {data.workoutsCompleted}
                </Text>
              </View>
            );
          })}
        </View>
      </Card>
      
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
    marginTop: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  statsSection: {
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  weeklyProgressCard: {
    marginBottom: 20,
  },
  weeklyProgressTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
  },
  weightChartCard: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
  },
  weightChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    marginTop: 16,
  },
  weightChartBar: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  weightChartFill: {
    width: 20,
    minHeight: 10,
    borderRadius: 4,
  },
  weightChartLabel: {
    fontSize: 10,
    marginTop: 6,
    fontFamily: 'Inter-Regular',
  },
  weightChartValue: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    position: 'absolute',
    bottom: 0,
  },
  activityCard: {
    marginBottom: 20,
  },
  activityChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    marginTop: 16,
  },
  activityChartBar: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  activityChartFill: {
    width: 20,
    borderRadius: 4,
  },
  activityChartLabel: {
    fontSize: 10,
    marginTop: 6,
    fontFamily: 'Inter-Regular',
  },
  activityChartValue: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    position: 'absolute',
    bottom: 0,
  },
  footer: {
    height: 24,
  },
});