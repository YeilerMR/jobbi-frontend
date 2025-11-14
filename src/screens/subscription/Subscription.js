import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../assets/css/general/general';
import PlanCard from '../../components/subscription/PlanCard';
import { getAllPlans } from '../../api/subscription';

const { primary, brand } = Colors;

// Mock data (simulando respuesta del backend)
const mockPlans = [
  {
    id_plans_subscription: 1,
    name: 'Free Plan',
    description: 'Basic free plan with limitations',
    price: 0,
    duration: 30,
    is_active: 1,
    limits: {
      maxBranches: 1,
      maxEmployeesPerBranch: 5,
    },
  },
  {
    id_plans_subscription: 3,
    name: 'Premium Plan',
    description: 'Unlimited plan for large businesses',
    price: 15,
    duration: 30,
    is_active: 1,
    limits: {
      maxBranches: null,
      maxEmployeesPerBranch: null,
    },
  },
];

const Subscription = () => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const res = await getAllPlans();
            if (res && res?.data) {
                setPlans(res.data);
            }
        } catch (error) {
            throw error;
        }
    }

  const handleSelectPlan = (plan) => {
    //subscribe logic
    console.log('Plan seleccionado: ', plan.name);
  };
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Choose your plan</Text>
        <Text style={styles.subtitle}>Choose the plan that best suits your business needs</Text>
      </View>

      {plans.map((plan) => (
        <PlanCard key={plan.id_plans_subscription} plan={plan} onSelect={handleSelectPlan} />
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
});

export default Subscription;
