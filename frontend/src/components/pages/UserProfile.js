import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1234567890',
  });

  const handleEdit = () => setIsEditing(!isEditing);

  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      <Text style={styles.label}>Name:</Text>
      {isEditing ? (
        <TextInput style={styles.input} value={user.name} onChangeText={(text) => handleChange('name', text)} />
      ) : (
        <Text style={styles.text}>{user.name}</Text>
      )}

      <Text style={styles.label}>Email:</Text>
      {isEditing ? (
        <TextInput style={styles.input} value={user.email} onChangeText={(text) => handleChange('email', text)} />
      ) : (
        <Text style={styles.text}>{user.email}</Text>
      )}

      <Text style={styles.label}>Phone:</Text>
      {isEditing ? (
        <TextInput style={styles.input} value={user.phone} onChangeText={(text) => handleChange('phone', text)} />
      ) : (
        <Text style={styles.text}>{user.phone}</Text>
      )}

      <Button title={isEditing ? 'Save' : 'Edit'} onPress={handleEdit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontWeight: 'bold', marginTop: 10 },
  text: { fontSize: 16, marginBottom: 10 },
  input: { height: 40, borderBottomWidth: 1, marginBottom: 10, paddingHorizontal: 10 },
});
