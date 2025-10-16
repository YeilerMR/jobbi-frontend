import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmployeesModal = ({
    visible,
    onClose,
    onSave,
    employee = null // null = crear, objeto = editars
}) => {
    const [userName, setUsername] = useState('');
    const [branch, setBranch] = useState('');
    const [availability, setAvailability] = useState('');
    const [email, setEmail] = useState('');

    // Si es modo edición, carga los datos del empleado
    useEffect(() => {
        if (employee) {
            setUsername(employee.userName || '');
            setBranch(employee.branch || '');
            setAvailability(employee.availability || '');
            setEmail(employee.email || '');
        } else {
            setUsername('');
            setBranch('');
            setAvailability('');
            setEmail('');
        }
    }, [employee, visible]);

    const isEditing = !!employee;
    const title = isEditing ? 'Edit Employee' : 'Add New Employee';

    const handleSave = () => {
        if (!email.trim() && !isEditing) {
            Alert.alert('Validation', 'Employee email is required.');
            return;
        }

        const employeeData = {
            userName: employee?.userName || userName,
            id_branch: branch,
            availability: employee?.availability || availability,
            email: employee?.email || email,
            state_employee: employee?.state_employee
        };

        if (isEditing) {
            employeeData.id_employee = employee.id_employee;
        }

        onSave(employeeData);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>

                    {/* Formulario */}
                    <View style={styles.form}>
                        {
                            isEditing ? (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Username"
                                    value={userName}
                                    editable={false}
                                    selectTextOnFocus={false}
                                />
                            ) : (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email *"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            )
                        }
                        <TextInput
                            style={styles.input}
                            placeholder="Branch *"
                            value={branch}
                            onChangeText={setBranch}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Availability"
                            value={availability}
                            onChangeText={setAvailability}

                        />
                    </View>

                    {/* Botones */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.saveButton]}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveButtonText}>
                                {isEditing ? 'Update' : 'Create'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    form: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
        marginRight: 8,
    },
    saveButton: {
        backgroundColor: '#4e73df',
        marginLeft: 8,
    },
    cancelButtonText: {
        color: '#666',
        fontWeight: '600',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
});

export default EmployeesModal;