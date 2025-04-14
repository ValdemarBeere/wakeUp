import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { authenticate, syncAlarms } from '../../utils/mcpService';

export default function CreateAlarmScreen() {
  const router = useRouter();
  const [label, setLabel] = useState('');

  const handleSave = async () => {
    try {
      const token = await authenticate('username', 'password'); // Replace with actual credentials
      const newAlarm = { label, time: new Date().toISOString() }; // Example alarm data
      await syncAlarms(token, [newAlarm]);
      console.log('Alarm saved and synced:', newAlarm);
      router.push('/alarms');
    } catch (error) {
      console.error('Failed to save and sync alarm:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Alarm</Text>
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