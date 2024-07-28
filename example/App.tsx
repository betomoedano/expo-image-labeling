import { StyleSheet, Text, View } from 'react-native';

import * as ExpoImageLabeling from 'expo-image-labeling';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoImageLabeling.hello()}</Text>
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
