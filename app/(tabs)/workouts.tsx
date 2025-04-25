import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Search, Filter, X } from 'lucide-react-native';
import WorkoutCard from '@/components/workout/WorkoutCard';
import { workoutPlans } from '@/constants/MockData';

export default function WorkoutsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  
  const filters = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  
  // Filter workouts based on search query and selected filter
  const filteredWorkouts = workoutPlans.filter(workout => {
    const matchesSearch = workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           workout.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'All' || selectedFilter === null || 
                           workout.level === selectedFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.searchContainer}>
        <View style={[
          styles.searchBar,
          { 
            backgroundColor: colors.card,
            borderColor: colors.border
          }
        ]}>
          <Search size={20} color={colors.gray} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search workouts..."
            placeholderTextColor={colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={20} color={colors.gray} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      
      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollView}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && {
                  backgroundColor: colors.tint
                },
                { borderColor: colors.border }
              ]}
              onPress={() => setSelectedFilter(filter === selectedFilter ? null : filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: selectedFilter === filter ? 'white' : colors.text }
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {filteredWorkouts.length > 0 ? (
        <ScrollView 
          style={styles.workoutsList}
          contentContainerStyle={styles.workoutsListContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onPress={() => router.push(`/(tabs)/workouts/${workout.id}`)}
            />
          ))}
          <View style={styles.footer} />
        </ScrollView>
      ) : (
        <View style={styles.emptyStateContainer}>
          <Filter size={48} color={colors.gray} />
          <Text style={[styles.emptyStateText, { color: colors.text }]}>
            No workouts found
          </Text>
          <Text style={[styles.emptyStateSubtext, { color: colors.gray }]}>
            Try adjusting your search or filters
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  filtersContainer: {
    paddingBottom: 8,
  },
  filtersScrollView: {
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  workoutsList: {
    flex: 1,
  },
  workoutsListContent: {
    padding: 16,
    paddingTop: 8,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  footer: {
    height: 24,
  },
});