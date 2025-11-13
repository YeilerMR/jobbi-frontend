import { useEffect, useState } from 'react';
import { Colors } from '../../assets/css/general/general';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text, FlatList, ScrollView, Alert } from 'react-native';
import RewardCard from '../../components/Rewards/RewardCard';
import CollapsibleSection from '../../components/ui/CollapsibleSection';
import MyRewardCard from '../../components/Rewards/MyRewardCard';
import HowToEarnPointsCard from '../../components/Rewards/HowToEarnPointsCard';
import { useUser } from '../../hooks/UserContext';

import { getAvailableRewards, getPoints, getMyRewards, redeemReward } from '../../api/gift';

const { primary, subtitle, brand } = Colors;

const myRewardsMock = [
  { id: '101', name: 'Free Haircut', date: '20/11/2024', state: true },
  { id: '102', name: '20% Off Facial Treatment', date: '15/12/2024', state: false },
];

const Reward = () => {
  const { userRole } = useUser();
  const [userPoints, setUserPoints] = useState(0);
  const [availableRewards, setAvailableRewards] = useState([]);
  const [myRewards, setMyRewards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pointsData = await getPoints();
        if (pointsData.success && pointsData.data) {
          setUserPoints(pointsData.data.total_points);
        }

        const rewardsData = await getAvailableRewards();
        if (rewardsData.success && Array.isArray(rewardsData.data)) {
          const mappedRewards = rewardsData.data.map((gift) => ({
            id: gift.id_gift.toString(),
            name: gift.name,
            description: gift.description,
            points: `Redeem ${gift.min_points} points`,
            state: gift.is_active === 1,
            min_points: gift.min_points,
          }));
          setAvailableRewards(mappedRewards);
        }

        const myRewardsData = await getMyRewards();
        if (myRewardsData.success && Array.isArray(myRewardsData.data)) {
          const mappedMyRewards = myRewardsData.data.map((gift) => ({
            id: gift.id_user_gift.toString(),
            name: gift.gift_name,
            redeemedDate: new Date(gift.gift_date).toLocaleDateString(),
            isActive: gift.is_active === 1,
          }));
          setMyRewards(mappedMyRewards);
        }
      } catch (error) {
        console.error('Error fetching points', error);
      }
    };
    fetchData();
  }, []);

  const handleUseReward = (reward) => {
    Alert.alert('Use Reward', `¿Usar ahora: ${reward.name}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Confirmar', onPress: () => console.log('Usando recompensa:', reward.name) },
    ]);
  };

  const handleRedeem = (reward) => {
    Alert.alert('Validate Reward', `¿Estás seguro que quieres redimir: ${reward.name}?`, [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Redimir',
        onPress: async () => {
          try {
            const result = await redeemReward(reward.id);

            if (result.success) {
              Alert.alert('Success', 'Reward redeemed successfully!');

              const myRewardsData = await getMyRewards();
              if (myRewardsData.success && Array.isArray(myRewardsData.data)) {
                const mappedMyRewards = myRewardsData.data.map((gift) => ({
                  id: gift.id_user_gift.toString(),
                  name: gift.gift_name,
                  redeemedDate: new Date(gift.gift_date).toLocaleDateString(),
                  isActive: gift.is_active === 1,
                }));
                setMyRewards(mappedMyRewards);
              }

              const pointsData = await getPoints();
              if (pointsData.success && pointsData.data) {
                setUserPoints(pointsData.data.total_points);
              }
            }
          } catch (error) {
            console.error('Error redeeming reward:', error);
            let errorMessage = 'Failed to redeem reward, Please try again';
            if (error.response?.data?.message) {
              errorMessage = error.response.data.message;
            }
            Alert.alert('Error', errorMessage)
          }
        },
      },
    ]);
  };

  const rewardPoints = {
    id: 'points-card',
    name: 'Total Points',
    points: `${userPoints} points`,
  };

  return (
    <ScrollView style={styles.mainView}>
      <Text style={styles.subtitle}>Redeem your points for exclusive rewards</Text>
      <RewardCard reward={rewardPoints} colorTitle={brand} />
      <View style={styles.horizontalRule} />

      <CollapsibleSection title="Available Rewards">
        {availableRewards.length > 0 ? (
          availableRewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              iconName="star-outline"
              isButton={true}
              isDisabled={userPoints < reward.min_points}
              onClick={() => handleRedeem(reward)}
            />
          ))
        ) : (
          <Text style={{ textAlign: 'center', color: subtitle, marginTop: 10 }}>No available rewards.</Text>
        )}
      </CollapsibleSection>

      {userRole !== 1 && (
        <CollapsibleSection title="My Rewards">
          {myRewards.length > 0 ? (
            myRewards.map((reward) => <MyRewardCard key={reward.id} reward={reward} onUse={handleUseReward} />)
          ) : (
            <Text style={{ textAlign: 'center', color: subtitle, marginTop: 10 }}>No rewards redeemed yet.</Text>
          )}
        </CollapsibleSection>
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
