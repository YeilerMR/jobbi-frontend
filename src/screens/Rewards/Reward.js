import { useEffect, useState } from 'react';
import { Colors } from '../../assets/css/general/general';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text, FlatList, ScrollView } from 'react-native';
import RewardCard from '../../components/Rewards/RewardCard';
import CollapsibleSection from '../../components/ui/CollapsibleSection';

const { primary, subtitle, brand } = Colors;

const rewardsMock = [
  { id: '1', name: 'Free Haircut', discount: 100, points: 'Redeem 500 points' },
  { id: '2', name: '20% Off Facial Treatment', discount: 20, points: 'Redeem 200 points' },
  { id: '3', name: 'Free Manicure', discount: 100, points: 'Redeem 300 points' },
  { id: '4', name: '15% Off Any Service', discount: 15, points: 'Redeem 150 points' },
];
const rewardPoints = {
    id: 1,
    name: 'Available Points',
    points: 400
}

const Reward = () => {
  const renderRewards = ({ item }) => (
    <RewardCard reward={item} iconName="star-outline" />
  );

 
  return (
    <ScrollView style={styles.mainView}>
      <Text style={styles.subtitle}>
        Redeem your points for exclusive rewards
      </Text>
      <RewardCard reward={rewardPoints} colorTitle={brand}/>
      <View style = {styles.horizontalRule}/>
      <CollapsibleSection title="Available Rewards">
        {rewardsMock.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            iconName="star-outline"
            isButton= {true}
            discount={reward.discount}
          />
        ))}
      </CollapsibleSection>
      <View style = {styles.horizontalRule}/>
      <CollapsibleSection title='My Rewards'>
        
      </CollapsibleSection>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: primary,
    padding: 20,
    // alignItems: 'center' 👈 REMOVED: no lo necesitas aquí
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: subtitle,
    textAlign: 'center', // 👈 para centrar solo el texto
   },
  horizontalRule: {
  height: 2,
  backgroundColor: brand,
  opacity: 0.3,
  marginVertical: 10,
}
});

export default Reward;