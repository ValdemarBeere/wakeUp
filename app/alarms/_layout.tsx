import { Stack } from 'expo-router';

export default function AlarmsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Alarms' }} />
      <Stack.Screen name="create" options={{ title: 'Create Alarm' }} />
      <Stack.Screen name="edit" options={{ title: 'Edit Alarm' }} />
      <Stack.Screen name="walkToDisable" options={{ title: 'Walk to Disable' }} />
    </Stack>
  );
}