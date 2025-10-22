import { useEffect, useState } from 'react';
import { Colors } from '../../assets/css/general/general';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text, FlatList } from 'react-native';
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
    <View style={styles.mainView}>
      <Text style={styles.subtitle}>
        Redeem your points for exclusive rewards
      </Text>
      <RewardCard reward={rewardPoints} colorTitle={brand}/>
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
      <CollapsibleSection title='My Rewards'>
        
      </CollapsibleSection>
    </View>
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
//   emptyText: {
//     fontSize: 16,
//     color: subtitle,
//     marginTop: 40,
//     textAlign: 'center',
//   },
//   footer: {
//     alignItems: 'center',
//     marginTop: 20,
//     width: '100%',
//   },
//   divider: {
//     width: 60,
//     height: 2,
//     backgroundColor: subtitle, // o cualquier color que quieras
//     opacity: 0.3,
//     borderRadius: 1,
//     marginBottom: 12,
//   },
//   footerText: {
//     fontSize: 14,
//     color: subtitle,
//     opacity: 0.6,
//   },
});

export default Reward;