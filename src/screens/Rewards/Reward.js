import { useEffect, useState } from 'react';
import { Colors } from '../../assets/css/general/general';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text, FlatList, ScrollView, Alert } from 'react-native';
import RewardCard from '../../components/Rewards/RewardCard';
import CollapsibleSection from '../../components/ui/CollapsibleSection';
import MyRewardCard from '../../components/Rewards/MyRewardCard';
import HowToEarnPointsCard from '../../components/Rewards/HowToEarnPointsCard';
import { useUser } from '../../hooks/UserContext';

const { primary, subtitle, brand } = Colors;

const rewardsMock = [
  { id: '1', name: 'Free Haircut', discount: 100, points: 'Redeem 500 points', date: '20/11/2024', state: true },
  {
    id: '2',
    name: '20% Off Facial Treatment',
    discount: 20,
    points: 'Redeem 200 points',
    date: '20/11/2024',
    state: true,
  },
  { id: '3', name: 'Free Manicure', discount: 100, points: 'Redeem 300 points' },
  { id: '4', name: '15% Off Any Service', discount: 15, points: 'Redeem 150 points' },
];
const rewardPoints = {
  id: 1,
  name: 'Available Points',
  points: 400,
};
const myRewardsMock = [
  { id: '101', name: 'Free Haircut', date: '20/11/2024', state: true },
  { id: '102', name: '20% Off Facial Treatment', date: '15/12/2024', state: false },
];
const adminReward = {
  id: 'admin-1',
  name: 'Premium Highlight',
  description: 'Your businesses will appear prominently as long as you have the most points.',
  points: 'Active while leading in points',
  state: true,
};

const Reward = () => {
  //const { userRole } = useUser();
  const userRole = 1;

  const renderRewards = ({ item }) => <RewardCard reward={item} iconName="star-outline" />;
  const handleUseReward = (reward) => {
    Alert.alert('Use Reward', `¿Usar ahora: ${reward.name}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Confirmar', onPress: () => console.log('Usando recompensa:', reward.name) },
    ]);
  };

  const handleRedeem = (reward) => {
    console.log('Redimiendo recompensa:', reward.name);
    Alert.alert('Validate Reward', `¿Estás seguro que quieres redimir: ${reward.name}?`, [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Redimir',
        onPress: () => console.log('Recompensa redimida:', reward.name),
      },
    ]);
  };

  return (
    <ScrollView style={styles.mainView}>
      <Text style={styles.subtitle}>Redeem your points for exclusive rewards</Text>
      <RewardCard reward={rewardPoints} colorTitle={brand} />
      <View style={styles.horizontalRule} />

      {userRole === 1 ? (
        // Admin: recompensa única
        <>
          <CollapsibleSection title="Available Rewards">
            <RewardCard
              reward={adminReward}
              iconName="ribbon-outline"
              isButton={true}
              onClick={() => handleRedeem(adminReward)}
            />
          </CollapsibleSection>
          <View style={styles.horizontalRule} />
        </>
      ) : (
        <>
          <CollapsibleSection title="Available Rewards">
            {rewardsMock.map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                iconName="star-outline"
                isButton={true}
                discount={reward.discount}
                onClick={() => handleRedeem(reward)}
              />
            ))}
          </CollapsibleSection>
          <View style={styles.horizontalRule} />
        </>
      )}

      {userRole !== 1 && (
        <>
          <CollapsibleSection title="My Rewards">
            {myRewardsMock.length > 0 ? (
              myRewardsMock.map((reward) => <MyRewardCard key={reward.id} reward={reward} onUse={handleUseReward} />)
            ) : (
              <Text style={{ textAlign: 'center', color: subtitle, marginTop: 10 }}>No rewards redeemed yet.</Text>
            )}
          </CollapsibleSection>
          <View style={styles.horizontalRule} />
        </>
      )}

      <HowToEarnPointsCard userRole={userRole} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: primary,
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: subtitle,
    textAlign: 'center',
  },
  horizontalRule: {
    height: 2,
    backgroundColor: brand,
    opacity: 0.3,
    marginVertical: 10,
  },
});

export default Reward;
