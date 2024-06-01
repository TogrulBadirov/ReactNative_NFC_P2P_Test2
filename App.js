// App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import P2PNFC from './src/components/P2PNFC';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <P2PNFC />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
