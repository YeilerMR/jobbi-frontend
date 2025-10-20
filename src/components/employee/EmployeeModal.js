import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getUsers } from '../../api/user';

const EmployeesModal = ({
    visible,
    onClose,
    onSave,
    branch = null,
    employee = null,
}) => {
    const [userName, setUsername] = useState('');
    const [userResults, setUserResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (employee) {
            setUsername(employee.name || '');
            setSelectedUser({
                id_user: employee.id_user,
                name: employee.name,
            });
        } else {
            setUsername('');
            setSelectedUser(null);
        }
    }, [employee, visible]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (userName.length > 1) {
                fetchUsers(userName);
            } else {
                setUserResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [userName]);

    const fetchUsers = async (query) => {
        try {
            setLoading(true);
            const { data } = await getUsers(query);
            setUserResults(data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    const handleInvite = () => {
        if (!selectedUser) return;

        const employeeData = {
            id_branch: branch,
            availability: 1,
            id_user: selectedUser.id_user,
        };

        if (employee) {
            employeeData.id_employee = employee.id_employee;
        }

        onSave(employeeData);
        onClose();
    };

    const isEditing = !!employee;
    const title = isEditing ? 'Edit Employee' : 'Add New Employee';

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Username *"
                            value={userName}
                            onChangeText={(text) => {
                                setUsername(text);
                                setSelectedUser(null);
                            }}
                        />

                        {loading && <ActivityIndicator size="small" color="#4e73df" />}

                        {!loading && userResults.length > 0 && (
                            <FlatList
                                data={userResults}
                                keyExtractor={(item) => item.id_user.toString()}
                                style={styles.resultsList}
                                renderItem={({ item }) => {
                                    const isSelected =
                                        selectedUser?.id_user === item.id_user;
                                    return (
                                        <View
                                            style={[
                                                styles.resultItem,
                                                isSelected && styles.selectedItem,
                                            ]}
                                        >
                                            <TouchableOpacity
                                                style={styles.userInfo}
                                                onPress={() => handleSelectUser(item)}
                                            >
                                                <Ionicons
                                                    name="person-circle-outline"
                                                    size={22}
                                                    color={isSelected ? '#fff' : '#4e73df'}
                                                />
                                                <Text
                                                    style={[
                                                        styles.resultText,
                                                        isSelected && styles.selectedText,
                                                    ]}
                                                >
                                                    {item.name}
                                                </Text>
                                            </TouchableOpacity>

                                            {isSelected && (
                                                <TouchableOpacity
                                                    style={styles.inviteButton}
                                                    onPress={handleInvite}
                                                >
                                                    <Text style={styles.inviteButtonText}>
                                                        Invite
                                                    </Text>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    );
                                }}
                            />
                        )}
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
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
        maxHeight: '80%',
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
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    resultsList: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        maxHeight: 200,
    },
    resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    selectedItem: {
        backgroundColor: '#4e73df',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    resultText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    selectedText: {
        color: '#fff',
        fontWeight: '600',
    },
    inviteButton: {
        backgroundColor: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    inviteButtonText: {
        color: '#4e73df',
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    button: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        minWidth: 100,
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    cancelButtonText: {
        color: '#666',
        fontWeight: '600',
    },
});

export default EmployeesModal;
