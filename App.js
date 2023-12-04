import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import React, { useState } from 'react';

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

export default function App() {
  const [isTfReady, setIsTfReady] = useState(false);
  const [tensorResult, setTensorResult] = useState(null);
  const [mulResult, setMulResult] = useState(null);

  React.useEffect(() => {
    (async () => {
      await tf.ready();
      setIsTfReady(true);
    })();
  }, []);

  const runSample = async () => {
    try {
      const a = tf.tensor1d([1, 2, 3, 4]);
      setTensorResult(a.arraySync());
    } catch (error) {
      console.log(error);
    }

    try {
      const a = tf.tensor1d([1, 2, 3, 4]);
      const b = tf.tensor1d([2, 3, 4, 5]);
      setMulResult(a.mul(b).arraySync());
    } catch (error) {
      console.log(error);
      setMulResult(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>
        tfjs status: {isTfReady ? 'ready' : 'loading'}
      </Text>
      <Text>-------------------</Text>
      <Button title="Run sample" onPress={runSample} />
      <Text>-------------------</Text>
      <Text>
        tensor create result: {JSON.stringify(tensorResult)}
      </Text>
      <Text>
        multiply op result: {JSON.stringify(mulResult)}
      </Text>
      <StatusBar style="auto" />
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
});
