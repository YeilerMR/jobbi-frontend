import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import {
  User,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
} from "lucide-react-native";
import { cancelApointment, completeApointment, getMyEvents } from "../../api/appointment";

const EmployeeScheduleScreen = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await getMyEvents();
      const rows = res?.data?.employeeRows || [];

      const mapped = rows.map(ev => ({
        id: ev.id_book_event,
        name: ev.event_name,
        employee_name: ev.employee_name,
        client_name: ev.client_name,
        date: ev.formatted_datetime,
        location: ev.branch_location,
        price: ev.service_price,
        duration: `${ev.duration_minutes}min`,
        status: ev.state || "Stateless",
      }));
      setAppointments(mapped);
    };
    load();
  }, []);

  async function handleCancel(id) {
    try {
      const res = await cancelApointment(id);
      Alert.alert("Success", "The appointment was successfully cancelled.");

      setAppointments((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      Alert.alert("Error", "The appointment could not be cancelled.");
    }
  }

  async function handleComplete(id) {
    try {
      const res = await completeApointment(id);
      Alert.alert("Éxito", "La cita fue completada correctamente.");
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "Completada" } : item
        )
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo completar la cita.");
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.iconRow}>
        <User size={16} color="#555" />
        <Text style={styles.subText}> {item.client_name}</Text>
      </View>

      <View style={styles.iconRow}>
        <Calendar size={16} color="#555" />
        <Text style={styles.subText}> {item.date}</Text>
      </View>

      <View style={styles.iconRow}>
        <MapPin size={16} color="#555" />
        <Text style={styles.subText}> {item.location}</Text>
      </View>

      <View style={styles.iconRow}>
        <User size={16} color="#555" />
        <Text style={styles.subText}> {item.employee_name}</Text>
      </View>

      <View style={styles.priceRow}>
        <View style={styles.iconRow}>
          <DollarSign size={16} color="#333" />
          <Text style={styles.priceText}>{item.price}</Text>
        </View>

        <View style={styles.iconRow}>
          <Clock size={16} color="#333" />
          <Text style={styles.priceText}>{item.duration}</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => handleComplete(item.id)}
        >
          <CheckCircle size={18} color="#fff" />
          <Text style={styles.completeText}>Completar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleCancel(item.id)}
        >
          <XCircle size={18} color="#000" />
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment List</Text>
      {!appointments && (
        <Text style={styles.title}>No appointment found</Text>
      )}
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  statusBadge: {
    backgroundColor: "#050021",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  statusText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  subText: {
    fontSize: 14,
    color: "#555",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 16,
  },
  priceText: {
    fontSize: 15,
    color: "#333",
    marginLeft: 4,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  completeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28a745",
    flex: 1,
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 10,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
    flex: 1,
    paddingVertical: 10,
    marginLeft: 8,
    borderRadius: 10,
  },
  completeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 6,
  },
  cancelText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 6,
  },
});

export default EmployeeScheduleScreen;
