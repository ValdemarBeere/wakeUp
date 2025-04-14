import { Accelerometer } from 'expo-sensors';
import { Platform } from 'react-native';

let subscription: any;

export function startMotionDetection(callback: (distance: number) => void) {
  if (!Accelerometer) {
    console.error('Accelerometer is not available on this platform:', Platform.OS);
    return;
  }

  let totalDistance = 0;
  let lastAcceleration = { x: 0, y: 0, z: 0 };

  try {
    console.log('Attempting to add listener to Accelerometer...');
    subscription = Accelerometer.addListener((data) => {
      console.log('Accelerometer data received:', data);
      const { x, y, z } = data;
      const delta = Math.sqrt(
        Math.pow(x - lastAcceleration.x, 2) +
        Math.pow(y - lastAcceleration.y, 2) +
        Math.pow(z - lastAcceleration.z, 2)
      );

      console.log('Delta calculated:', delta);

      if (delta > 0.1) { // Threshold for motion detection
        totalDistance += delta;
        console.log('Updated total distance:', totalDistance);
        callback(totalDistance);
      }

      lastAcceleration = { x, y, z };
    });

    Accelerometer.setUpdateInterval(100); // Update every 100ms
    console.log('Motion detection started successfully with update interval of 100ms');
  } catch (error) {
    console.error('Error initializing Accelerometer:', error);
    console.error('Ensure that the expo-sensors package is properly installed and linked.');
  }
}

export function stopMotionDetection() {
  if (subscription) {
    subscription.remove();
    subscription = null;
  }
}