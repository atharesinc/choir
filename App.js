import React, {
  useState,
  addCallback,
  useGlobal,
  useEffect,
  setGlobal,
} from 'reactn';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import { Chat } from './Chat';
import { Channels } from './Channels';

// Set an initial global state directly:
async () => {};

setGlobal({
  messages: [],
  channels: [],
  user: null,
  width: Dimensions.get('window').width,
});

export default function App() {
  const [stateLoaded, setStateLoaded] = useState(false);

  const [width, setWidth] = useGlobal('width');

  const updateWidth = ({ window: { width } }) => {
    setWidth(width);
  };

  const persist = global => {
    AsyncStorage.setItem('global', JSON.stringify(global));
  };

  const hydrateGlobal = async () => {
    const globalState = JSON.parse(await AsyncStorage.getItem('global'));
    setGlobal({
      ...globalState,
    });

    setStateLoaded(true);
  };

  useEffect(() => {
    hydrateGlobal();
    Dimensions.addEventListener('change', updateWidth);
    addCallback(global => persist);
    return () => {
      Dimensions.removeEventListener('change', updateWidth);
    };
  }, []);

  // const isWeb = Platform.OS; // ios | android | web
  const wide = width > 600;

  if (!stateLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <View style={wide ? styles.wide : styles.container}>
      {wide && <Channels />}
      <Chat //style={{ flex: 1 }}
      />
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
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});
