import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getAllBranches } from '../../api/branches';
import { searchSpecialties } from '../../api/services';
import { getEmployeesByBranch } from '../../api/employees';
import { Ionicons } from '@expo/vector-icons';

const mockFetchHours = async (date) => {
    await new Promise((r) => setTimeout(r, 500));
    return ['08:00', '09:30', '11:00', '13:00', '15:00', '16:30'];
};

const ScheduleScreen = () => {
    const [service, setService] = useState('');
    const [branches, setBranches] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [hours, setHours] = useState([]);

    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBranches = async () => {
            setLoading(true);
            try {
                const res = await searchSpecialties(service);
                setBranches([]);
                setBranches(res.data);
            } finally {
                setLoading(false);
            }
        };
        fetchBranches();
    }, [service]);

    const handleSelectBranch = async (branch) => {
        setSelectedBranch(branch);
        setSelectedEmployee(null);
        setSelectedDate(null);
        setSelectedHour(null);
        setEmployees([]);
        setHours([]);
        setLoading(true);
        const res = await getEmployeesByBranch(branch.id_branch);
        setEmployees(res?.data || []);
        setLoading(false);
    };

    const handleSelectEmployee = (employee) => {
        setSelectedEmployee(employee);
        setSelectedDate(null);
        setSelectedHour(null);
        setHours([]);
    };

    const handleDateChange = async (event, date) => {
        setShowDatePicker(false);
        if (!date) return;
        setSelectedDate(date.toISOString().split('T')[0]);
        setSelectedHour(null);
        setLoading(true);
        const data = await mockFetchHours(date);
        setHours(data);
        setLoading(false);
    };

    const resetTo = (level) => {
        switch (level) {
            case 'branch':
                setSelectedBranch(null);
                setSelectedEmployee(null);
                setSelectedDate(null);
                setSelectedHour(null);
                setEmployees([]);
                setHours([]);
                break;
            case 'employee':
                setSelectedEmployee(null);
                setSelectedDate(null);
                setSelectedHour(null);
                setHours([]);
                break;
            case 'date':
                setSelectedDate(null);
                setSelectedHour(null);
                setHours([]);
                break;
            case 'hour':
                setSelectedHour(null);
                break;
        }
    };

    const getStepTitle = () => {
        if (!selectedBranch) return 'Select a branch';
        if (!selectedEmployee) return 'Select an employee';
        if (!selectedDate) return 'Select an available date';
        if (!selectedHour) return 'Select a time';
        return 'Confirm your appointment';
    };

    const confirmAppointment = () => {
        alert(`Confirmed appointment`);
    };

    // (today → 2 months)
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 2);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Find your service</Text>

            <TextInput
                style={styles.input}
                placeholder="Service"
                value={service}
                onChangeText={(text) => setService(text)}
            />

            {selectedBranch && (
                <View style={styles.selection}>
                    <Text style={styles.selectionText}>Branch: {selectedBranch.name}</Text>
                    <TouchableOpacity onPress={() => resetTo('branch')}>
                        <Text style={styles.changeText}>Change</Text>
                    </TouchableOpacity>
                </View>
            )}

            {selectedEmployee && (
                <View style={styles.selection}>
                    <Text style={styles.selectionText}>Employee: {selectedEmployee.name}</Text>
                    <TouchableOpacity onPress={() => resetTo('employee')}>
                        <Text style={styles.changeText}>Change</Text>
                    </TouchableOpacity>
                </View>
            )}

            {selectedDate && (
                <View style={styles.selection}>
                    <Text style={styles.selectionText}>Date: {selectedDate}</Text>
                    <TouchableOpacity onPress={() => resetTo('date')}>
                        <Text style={styles.changeText}>Change</Text>
                    </TouchableOpacity>
                </View>
            )}

            {selectedHour && (
                <View style={styles.selection}>
                    <Text style={styles.selectionText}>Hour: {selectedHour}</Text>
                    <TouchableOpacity onPress={() => resetTo('hour')}>
                        <Text style={styles.changeText}>Change</Text>
                    </TouchableOpacity>
                </View>
            )}

            <Text style={styles.stepTitle}>{getStepTitle()}</Text>

            {loading && <ActivityIndicator size="large" color="#0066cc" style={{ marginTop: 20 }} />}

            {!loading && branches.length > 0 && !selectedBranch && (
                <FlatList
                    data={branches}
                    keyExtractor={(item, index) => `${item.id_branch}-${index}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item} onPress={() => handleSelectBranch(item)}>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <Text size={14} color="#555">{item.service_name ?? 'N/A'}</Text>
                            <View style={styles.iconRow}>
                                <Ionicons name="location-outline" size={18} color="#555" style={{ marginRight: 6 }} />
                                <Text style={styles.subText}>{item.location}</Text>
                            </View>

                            <View style={styles.iconRow}>
                                <Ionicons name="call-outline" size={18} color="#555" style={{ marginRight: 6 }} />
                                <Text style={styles.subText}>{item.phone}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}

            {!loading && branches.length == 0 && !selectedBranch && (
                <Text style={styles.itemText}>Branches not found.</Text>
            )}

            {selectedBranch && employees.length > 0 && !selectedEmployee && (
                <FlatList
                    data={employees}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item} onPress={() => handleSelectEmployee(item)}>
                            <Text style={styles.itemText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            {selectedBranch && employees.length == 0 && !loading && (
                <Text style={styles.itemText}>Employees not found.</Text>
            )}

            {selectedEmployee && !selectedDate && (
                <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={styles.dateButtonText}>Select date</Text>
                </TouchableOpacity>
            )}

            {showDatePicker && (
                <DateTimePicker
                    value={today}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    minimumDate={today}
                    maximumDate={maxDate}
                    onChange={handleDateChange}
                />
            )}

            {selectedDate && !selectedHour && hours.length > 0 && (
                <View style={styles.hoursContainer}>
                    {hours.map((h) => (
                        <TouchableOpacity
                            key={h}
                            style={[
                                styles.hourButton,
                                selectedHour === h && styles.hourButtonSelected,
                            ]}
                            onPress={() => setSelectedHour(h)}
                        >
                            <Text
                                style={[
                                    styles.hourText,
                                    selectedHour === h && styles.hourTextSelected,
                                ]}
                            >
                                {h}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {selectedHour && (
                <TouchableOpacity style={styles.confirmButton} onPress={confirmAppointment}>
                    <Text style={styles.confirmText}>Confirm appointment</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    subText: {
        fontSize: 14,
        color: '#555',
    },
    container: {
        flex: 1,
        backgroundColor: '#f4f6f9',
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    stepTitle: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: '500',
        color: '#444',
    },
    item: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        marginVertical: 6,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
    selection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#e8f0fe',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    selectionText: {
        fontSize: 15,
        color: '#333',
    },
    changeText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#0066cc',
    },
    dateButton: {
        marginTop: 10,
        backgroundColor: '#0066cc',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    dateButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    hoursContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    hourButton: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        margin: 6,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    hourButtonSelected: {
        backgroundColor: '#0066cc',
    },
    hourText: {
        fontSize: 15,
        color: '#333',
    },
    hourTextSelected: {
        color: '#fff',
    },
    confirmButton: {
        marginTop: 20,
        backgroundColor: '#28a745',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    confirmText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default ScheduleScreen;
