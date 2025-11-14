// PlanCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../assets/css/general/general';

const { green, brand, badgeEnable, darkLight } = Colors;

const PlanCard = ({ plan, isActive, onSelect }) => {
  const isFree = plan.price === 0;
  const isPremium = !isFree;

  const renderLimit = (label, value) => {
    if (value === null) return `${label}: Unlimited`;
    return `${label}: ${value}`;
  };

  // Determinar colores del botón
  let buttonText = '';
  let buttonBgColor;
  let buttonTextColor;

  if (isActive) {
    // Botón deshabilitado: es el plan actual
    buttonBgColor = darkLight;
    buttonTextColor = isFree ? badgeEnable : brand;
    buttonText = isFree ? 'Current Plan' : 'Active Subscription';
  } else {
    // Botón habilitado: no es el plan actual
    buttonBgColor = isFree ? green : brand;
    buttonTextColor = badgeEnable;
    buttonText = isFree ? 'Use Free Plan' : 'Subscribe';
  }

  return (
    <View
      style={[
        styles.card,
        isPremium && { borderWidth: 2, borderColor: brand, backgroundColor: '#f0f9ff' },
      ]}
    >
      {/* Badges */}
      {isPremium && !isActive && (
        <View style={styles.premiumBadge}>
          <Text style={styles.premiumBadgeText}>PREMIUM</Text>
        </View>
      )}
      {isActive && (
        <View style={[styles.activeBadge, isPremium && { backgroundColor: brand }]}>
          <Text style={styles.activeBadgeText}>ACTIVE</Text>
        </View>
      )}

      <Text style={[styles.planName, isPremium && { color: brand }]}>
        {plan.name}
      </Text>

      {isFree ? (
        <Text style={styles.priceFree}>Free</Text>
      ) : (
        <Text style={styles.price}>
          ${plan.price} <Text style={styles.duration}>/ {plan.duration} days</Text>
        </Text>
      )}

      <Text style={styles.description}>{plan.description}</Text>

      <View style={styles.limits}>
        <Text style={styles.limitItem}>
          {renderLimit('Branches', plan.limits.maxBranches)}
        </Text>
        <Text style={styles.limitItem}>
          {renderLimit('Employees x branch', plan.limits.maxEmployeesPerBranch)}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonBgColor }]}
        onPress={() => onSelect(plan)}
        disabled={isActive} // solo deshabilitado si es el plan actual
      >
        <Text style={[styles.buttonText, { color: buttonTextColor }]}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 3,
    position: 'relative',
  },
  premiumBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: brand,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  premiumBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  activeBadge: {
    position: 'absolute',
    top: -12,
    left: 20,
    backgroundColor: '#4CAF50', // puedes cambiarlo si quieres que sea dinámico
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  activeBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  priceFree: {
    fontSize: 24,
    fontWeight: 'bold',
    color: green,
    marginBottom: 8,
  },
  duration: {
    fontSize: 16,
    color: '#777',
    fontWeight: '400',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 18,
  },
  limits: {
    marginBottom: 20,
  },
  limitItem: {
    fontSize: 15,
    color: '#444',
    marginBottom: 6,
    fontWeight: '500',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
  },
});

export default PlanCard;