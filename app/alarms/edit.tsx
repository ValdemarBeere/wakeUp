import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { authenticate, syncAlarms } from '../../utils/mcpService';

export default function EditAlarmScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [label, setLabel] = useState('');

  useEffect(() => {
    // Placeholder for fetching the alarm details by ID
    if (id) {
      console.log('Fetching alarm details for ID:', id);
      setLabel('Sample Alarm'); // Replace with actual fetched data
    }
  }, [id]);

  const handleSave = async () => {
    try {
      const token = await authenticate('username', 'password'); // Replace with actual credentials
      const updatedAlarm = { id, label, time: new Date().toISOString() }; // Example updated alarm data
      await syncAlarms(token, [updatedAlarm]);
      console.log('Alarm updated and synced:', updatedAlarm);
      router.push('/alarms');
    } catch (error) {
      console.error('Failed to update and sync alarm:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Alarm</Text>
      <TextInput
        style={styles.input}
        placeholder="Alarm Label"
        value={label}
        onChangeText={setLabel}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});