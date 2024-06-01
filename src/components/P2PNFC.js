// P2PNFC.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import NfcManager, { NfcTech, NfcEvents } from 'react-native-nfc-manager';

// Initialize NFC Manager
NfcManager.start();

const P2PNFC = () => {
  const [supported, setSupported] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Check if NFC is supported
    NfcManager.isSupported()
      .then(supported => {
        setSupported(supported);
        if (supported) {
          // Check if NFC is enabled
          NfcManager.isEnabled().then(enabled => {
            setEnabled(enabled);
          });
        }
      });

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };
  }, []);

  const startNFC = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const ndef = await NfcManager.getNdefMessage();
      console.log('NDEF Message:', ndef);
      Alert.alert('NDEF Message', JSON.stringify(ndef));
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
      NfcManager.cancelTechnologyRequest();
    }
  };

  const sendNFCMessage = async () => {
    try {
      const message = [{ type: 'text/plain', payload: 'Hello, NFC!' }];
      await NfcManager.setNdefMessage(message);
      Alert.alert('Message Sent', 'Hello, NFC!');
    } catch (ex) {
      console.warn(ex);
    }
  };

  if (!supported) {
    return <Text>NFC is not supported on this device</Text>;
  }

  if (!enabled) {
    return <Text>NFC is not enabled. Please enable NFC.</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Start NFC" onPress={startNFC} />
      <Button title="Send NFC Message" onPress={sendNFCMessage} />
    </View>
  );
};

export default P2PNFC;
