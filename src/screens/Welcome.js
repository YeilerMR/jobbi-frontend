// import { StatusBar } from 'expo-status-bar';

// import {
//   InnerContainer,
//   PageTitle,
//   Subtitle,
//   StyledFormArea,
//   StyledButton,
//   ButtonText,
//   Line,
//   WelcomeContainer,
//   WelcomeImage,
//   Avatar,
// } from '../assets/css/auth/auth.js';
// import { useUser } from '../hooks/UserContext.js';


// // Componentes específicos por rol (puedes moverlos a archivos separados después)
// const AdminView = ({ navigation }) => (
//   <>
//     <PageTitle welcome={true}>Admin Dashboard</PageTitle>
//     <Subtitle welcome={true}>Manage your business, employees & services.</Subtitle>
//     <StyledButton onPress={() => navigation.navigate('Business')}>
//       <ButtonText>Go to Business</ButtonText>
//     </StyledButton>
//   </>
// );

// const ClientView = ({ navigation }) => (
//   <>
//     <PageTitle welcome={true}>Welcome, Client!</PageTitle>
//     <Subtitle welcome={true}>Book appointments and earn rewards.</Subtitle>
//     <StyledButton onPress={() => navigation.navigate('Branches')}>
//       <ButtonText>Schedule Appointment</ButtonText>
//     </StyledButton>
//   </>
// );

// const EmployeeView = ({ navigation }) => (
//   <>
//     <PageTitle welcome={true}>Hello, Employee!</PageTitle>
//     <Subtitle welcome={true}>View your schedule and services.</Subtitle>
//     <StyledButton onPress={() => navigation.navigate('Schedule')}>
//       <ButtonText>My Schedule</ButtonText>
//     </StyledButton>
//   </>
// );


// const Welcome = ({ navigation }) => {
//   const { userRole } = useUser();
//   console.log('current user role:', userRole);
  
//   // Renderiza vista según el rol
//   const renderContent = () => {
//     if (userRole === 1) {
//       return <AdminView navigation={navigation} />;
//     } else if (userRole === 2) {
//       return <ClientView navigation={navigation} />;
//     } else if (userRole === 3) {
//       return <EmployeeView navigation={navigation} />;
//     } else {
//       return (
//         <>
//           <PageTitle welcome={true}>Guest</PageTitle>
//           <Subtitle welcome={true}>Please log in to continue.</Subtitle>
//         </>
//       );
//     }
//   };

//   return (
//     <>
//       <StatusBar style="light" />
//       <InnerContainer>
//         <WelcomeImage
//           resizeMode="cover"
//           source={require('../assets/img/welcome_image.webp')}
//         />
//         <WelcomeContainer>
//           {renderContent()}
//           <StyledFormArea>
//             <Avatar
//               resizeMode="cover"
//               source={require('../assets/img/froggi.webp')}
//             />
//             <Line />
//             <StyledButton
//               onPress={() => {
//                 console.log('Out of Session');
//                 navigation.navigate('Login');
//               }}
//             >
//               <ButtonText>Logout</ButtonText>
//             </StyledButton>
//           </StyledFormArea>
//         </WelcomeContainer>
//       </InnerContainer>
//     </>
//   );
// };

// export default Welcome;


import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, ScrollView, StyleSheet } from 'react-native';
import { useUser } from '../hooks/UserContext.js';
import Tile from '../components/ui/Tile.js';

// Importa tus estilos existentes
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

// Importa el componente Tile

// Mock data — luego reemplázalo con datos reales desde tu API o store
const mockData = {
  employees: 5,
  business: 12,
  branch: 35,
  service: 8,
};

// Componentes específicos por rol (actualizados)
const AdminView = ({ navigation }) => {
  const [data, setData] = useState(mockData);

  // Aquí podrías hacer fetch de los datos reales
  useEffect(() => {
    // Ejemplo: fetchCounts().then(setData);
  }, []);

  return (
    <>
      <PageTitle welcome={true}>Admin Dashboard</PageTitle>
      {/* <Subtitle welcome={true}>Manage your business, employees & services.</Subtitle> */}

      {/* Fila 1: Rewards y Business */}
      <View style={styles.row}>
        <Tile
          title="Employees"
          count={data.employees}
          color="#4CAF50" // verde
          onPress={() => navigation.navigate('Rewards')}
        />
        <Tile
          title="Business"
          count={data.business}
          color="#F44336" // rojo
          onPress={() => navigation.navigate('Business')}
        />
      </View>

      {/* Fila 2: Branch y Service */}
      <View style={styles.row}>
        <Tile
          title="Branch"
          count={data.branch}
          color="#FF9800" // naranja
          onPress={() => navigation.navigate('Branches')}
        />
        <Tile
          title="Service"
          count={data.service}
          color="#2196F3" // azul
          onPress={() => navigation.navigate('Services')}
        />
      </View>

      {/* Lista de proyectos o actividades (placeholder por ahora) */}
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
  console.log('current user role:', userRole);

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

// Estilos adicionales para el grid y la lista
const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16, // espacio entre filas
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
