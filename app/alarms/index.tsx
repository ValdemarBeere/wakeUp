import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function AlarmsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/wake_up_bg.png')} style={styles.headerImage} />
      <Text style={styles.title}>Alarms</Text>
      {/* Placeholder for alarm list */}
      <Button title="Create Alarm" onPress={() => router.push('/alarms/create')} />
      <Button title="Simulate Active Alarm" onPress={() => router.push('/alarms/walkToDisable')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});