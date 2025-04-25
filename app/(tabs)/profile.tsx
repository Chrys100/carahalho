import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  useColorScheme,
  Image,
  TouchableOpacity
} from 'react-native';
import Colors from '@/constants/Colors';
import { User, Calendar, Scale, Ruler, Target, Settings, ChevronRight, Trophy, ChartBar as BarChart2 } from 'lucide-react-native';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { userProfile, completedWorkouts } from '@/constants/MockData';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Format the fitness goal text
  const formatGoalText = (goal: string) => {
    switch (goal) {
      case 'lose':
        return 'Lose Weight';
      case 'maintain':
        return 'Maintain Weight';
      case 'gain':
        return 'Gain Muscle';
      default:
        return goal;
    }
  };
  
  // Calculate achievements
  const totalWorkouts = completedWorkouts.length;
  const totalMinutes = completedWorkouts.reduce((sum, workout) => sum + workout.duration, 0);
  const totalCalories = completedWorkouts.reduce((sum, workout) => sum + workout.calories, 0);
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: userProfile.profilePicture }} style={styles.profileImage} />
          <Text style={[styles.profileName, { color: colors.text }]}>{userProfile.name}</Text>
          <View style={styles.goalContainer}>
            <Target size={16} color={colors.tint} style={styles.goalIcon} />
            <Text style={[styles.goalText, { color: colors.tint }]}>
              {formatGoalText(userProfile.fitnessGoal)}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={[
          styles.statCard, 
          { backgroundColor: colors.card, borderColor: colors.border }
        ]}>
          <Trophy size={24} color={colors.tint} />
          <Text style={[styles.statValue, { color: colors.text }]}>{totalWorkouts}</Text>
          <Text style={[styles.statLabel, { color: colors.gray }]}>Workouts</Text>
        </View>
        
        <View style={[
          styles.statCard, 
          { backgroundColor: colors.card, borderColor: colors.border }
        ]}>
          <Calendar size={24} color={colors.warning} />
          <Text style={[styles.statValue, { color: colors.text }]}>{totalMinutes}</Text>
          <Text style={[styles.statLabel, { color: colors.gray }]}>Minutes</Text>
        </View>
        
        <View style={[
          styles.statCard, 
          { backgroundColor: colors.card, borderColor: colors.border }
        ]}>
          <BarChart2 size={24} color={colors.success} />
          <Text style={[styles.statValue, { color: colors.text }]}>{totalCalories}</Text>
          <Text style={[styles.statLabel, { color: colors.gray }]}>Calories</Text>
        </View>
      </View>
      
      <Card style={styles.personalInfoCard}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Personal Information</Text>
        
        <View style={styles.infoRow}>
          <View style={styles.infoIconContainer}>
            <User size={20} color={colors.gray} />
          </View>
          <View style={styles.infoContent}>
            <Text style={[styles.infoLabel, { color: colors.gray }]}>Age</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{userProfile.age} years</Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.infoRow}>
          <View style={styles.infoIconContainer}>
            <Scale size={20} color={colors.gray} />
          </View>
          <View style={styles.infoContent}>
            <Text style={[styles.infoLabel, { color: colors.gray }]}>Weight</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{userProfile.weight} kg</Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.infoRow}>
          <View style={styles.infoIconContainer}>
            <Ruler size={20} color={colors.gray} />
          </View>
          <View style={styles.infoContent}>
            <Text style={[styles.infoLabel, { color: colors.gray }]}>Height</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{userProfile.height} cm</Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.infoRow}>
          <View style={styles.infoIconContainer}>
            <Calendar size={20} color={colors.gray} />
          </View>
          <View style={styles.infoContent}>
            <Text style={[styles.infoLabel, { color: colors.gray }]}>Weekly Target</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {userProfile.weeklyWorkouts} workouts
            </Text>
          </View>
        </View>
        
        <Button
          title="Edit Profile"
          onPress={() => {
            // Navigate to edit profile screen (not implemented in this MVP)
            alert('Edit Profile feature will be available soon!');
          }}
          variant="outline"
          style={styles.editButton}
        />
      </Card>
      
      <Card style={styles.settingsCard}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>
        
        <TouchableOpacity style={styles.settingRow}>
          <Settings size={20} color={colors.gray} style={styles.settingIcon} />
          <Text style={[styles.settingText, { color: colors.text }]}>App Settings</Text>
          <ChevronRight size={20} color={colors.gray} />
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.settingRow}>
          <Trophy size={20} color={colors.gray} style={styles.settingIcon} />
          <Text style={[styles.settingText, { color: colors.text }]}>Goals & Achievements</Text>
          <ChevronRight size={20} color={colors.gray} />
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.settingRow}>
          <Calendar size={20} color={colors.gray} style={styles.settingIcon} />
          <Text style={[styles.settingText, { color: colors.text }]}>Workout History</Text>
          <ChevronRight size={20} color={colors.gray} />
        </TouchableOpacity>
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
    marginTop: 8,
    marginBottom: 20,
  },
  profileHeader: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 102, 204, 0.1)',
  },
  goalIcon: {
    marginRight: 6,
  },
  goalText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  personalInfoCard: {
    marginBottom: 20,
  },
  settingsCard: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  editButton: {
    marginTop: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  footer: {
    height: 24,
  },
});