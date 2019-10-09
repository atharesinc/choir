import React from 'react';
import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import Chat from './Chat';

export default function App() {
  const { width = 0 } = Dimensions.get('window');

  // const isWeb = Platform.OS;
  const wide = width > 600;
  return (
    <View style={wide ? styles.wide : styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Chat />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wide: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
