import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Colors } from '../../assets/css/general/general';
import PlanCard from '../../components/subscription/PlanCard';
import { getAllPlans, getCurrentPlan, upgradePlan } from '../../api/subscription';

const { primary, brand, green } = Colors;

const Subscription = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePlanId, setActivePlanId] = useState(null);

  useEffect(() => {
    fetchPlans();
    fetchCurrentPlan();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await getAllPlans();
      if (res && res?.data) {
        setPlans(res.data);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentPlan = async () => {
    try {
        const res = await getCurrentPlan();
        if (res && res.data) {
            setActivePlanId(res.data.plan_id);
        }
    } catch (error) {
        console.error('Error fetching active plan:', error);
        throw error;
    }
  }

  const handleSelectPlan = async (plan) => {
    //subscribe logic

    if (plan.id_plans_subscription === activePlanId) {
        return;
    }

    setLoading(true);
    try {
        
        const res = await upgradePlan({newPlanId: plan.id_plans_subscription});

        if (res?.data?.plan_id) {
            setActivePlanId(res.data.plan_id);
        } else {
            setActivePlanId(plan.id_plans_subscription);
        }

        alert(`Plan updated to ${plan.name} successfully!`);

    } catch (error) {
        console.error('error en handleSelectPlan', error);
        alert('Failed to update plan. Please try again.');
    } finally {
        setLoading(false);
    }
  };
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Choose your plan</Text>
        <Text style={styles.subtitle}>Choose the plan that best suits your business needs</Text>
      </View>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color={brand} />
          <Text style={[styles.overlayText, { marginTop: 12 }]}>Loading plans...</Text>
        </View>
      )}
      {plans.map((plan) => (
        <PlanCard key={plan.id_plans_subscription} plan={plan} isActive={plan.id_plans_subscription === activePlanId} onSelect={handleSelectPlan} />
      ))}
    </ScrollView>
  );
};

//styles
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: primary,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: brand,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  overlayText: {
    color: green,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Subscription;
