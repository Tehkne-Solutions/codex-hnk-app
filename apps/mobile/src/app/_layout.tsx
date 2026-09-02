import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#08090c' },
          headerTintColor: '#f6e7a1',
          contentStyle: { backgroundColor: '#08090c' },
        }}
      />
    </>
  );
}
