
import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, ScrollView, StyleSheet } from 'react-native';
import { useUser } from '../hooks/UserContext.js';
import Tile from '../components/ui/Tile.js';

import {
  InnerContainer,
  PageTitle,
  Subtitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
} from '../assets/css/auth/auth.js';

const mockData = {
  employees: 5,
  business: 12,
  branch: 35,
  service: 8,
};

const AdminView = ({ navigation }) => {
  const [data, setData] = useState(mockData);


  return (
    <>
      <PageTitle welcome={true}>Admin Dashboard</PageTitle>

      <View style={styles.row}>
        <Tile
          title="Employees"
          count={data.employees}
          color="#4CAF50"
          onPress={() => navigation.navigate('Employees')}
        />
        <Tile
          title="Business"
          count={data.business}
          color="#F44336"
          onPress={() => navigation.navigate('Business')}
        />
      </View>

      <View style={styles.row}>
        <Tile
          title="Branch"
          count={data.branch}
          color="#FF9800" 
          onPress={() => navigation.navigate('Branches')}
        />
        <Tile
          title="Service"
          count={data.service}
          color="#2196F3"
          onPress={() => navigation.navigate('Services')}
        />
      </View>

      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        <ScrollView style={styles.listContainer}>
          <View style={styles.listItem}>
            <Text>• New reward added: "Summer Sale"</Text>
          </View>
          <View style={styles.listItem}>
            <Text>• Business "Café Del Sol" updated</Text>
          </View>
          <View style={styles.listItem}>
            <Text>• Branch "Downtown" has 5 new bookings</Text>
          </View>
          <View style={styles.listItem}>
            <Text>• Service "Haircut" is now available</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const ClientView = ({ navigation }) => (
  <>
    <PageTitle welcome={true}>Welcome, Client!</PageTitle>
    <Subtitle welcome={true}>Book appointments and earn rewards.</Subtitle>
    <StyledButton onPress={() => navigation.navigate('Branches')}>
      <ButtonText>Schedule Appointment</ButtonText>
    </StyledButton>
  </>
);

const EmployeeView = ({ navigation }) => (
  <>
    <PageTitle welcome={true}>Hello, Employee!</PageTitle>
    <Subtitle welcome={true}>View your schedule and services.</Subtitle>
    <StyledButton onPress={() => navigation.navigate('Schedule')}>
      <ButtonText>My Schedule</ButtonText>
    </StyledButton>
  </>
);



const Welcome = ({ navigation }) => {
  const { userRole } = useUser();

  const renderContent = () => {
    if (userRole === 1) {
      return <AdminView navigation={navigation} />;
    } else if (userRole === 2) {
      return <ClientView navigation={navigation} />;
    } else if (userRole === 3) {
      return <EmployeeView navigation={navigation} />;
    } else {
      return (
        <>
          <PageTitle welcome={true}>Guest</PageTitle>
          <Subtitle welcome={true}>Please log in to continue.</Subtitle>
        </>
      );
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        {/* <WelcomeImage
          resizeMode="cover"
          source={require('../assets/img/welcome_image.webp')}
        /> */}
        <WelcomeContainer>
          <ScrollView
            contentContainerStyle = {styles.scrollContent}
            showsVerticalScrollIndicator= {false}
          >

            {renderContent()}
            
          </ScrollView>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  listSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  listContainer: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  listItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default Welcome;
