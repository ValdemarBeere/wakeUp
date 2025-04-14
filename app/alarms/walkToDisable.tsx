import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { startMotionDetection, stopMotionDetection } from '../../utils/motionUtils';
import { Audio } from 'expo-av';

export default function WalkToDisableScreen() {
  const router = useRouter();
  const [distance, setDistance] = useState(0);
  const targetDistance = 3; // Target distance in meters

  useEffect(() => {
    startMotionDetection((newDistance) => {
      setDistance(newDistance);
    });

    return () => stopMotionDetection();
  }, []);

  useEffect(() => {
    if (distance >= targetDistance) {
      alert('Alarm disabled!');
      router.push('/alarms');
    }
  }, [distance]);

  useEffect(() => {
    let sound: Audio.Sound;

    const playAlarmSound = async () => {
      try {
        sound = new Audio.Sound();
        await sound.loadAsync(require('../../assets/sounds/alarm.mp3'));
        await sound.setIsLoopingAsync(true);
        await sound.playAsync();
      } catch (error) {
        console.error('Error playing alarm sound:', error);
      }
    };

    playAlarmSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Walk to Disable Alarm</Text>
      <Text style={styles.distance}>Distance walked: {distance.toFixed(2)} meters</Text>
      <Button title="Cancel" onPress={() => router.push('/alarms')} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  distance: {
    fontSize: 18,
    marginBottom: 16,
  },
});