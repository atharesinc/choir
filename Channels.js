import React, { useGlobal, useState, useRef, useEffect } from 'reactn';
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { uuid } from './utils';

export const Channels = props => {
  const [channels, setChannels] = useGlobal('channels');
  const [showAddChannel, changeShowAddChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');

  const toggleShowAddChannel = () => {
    changeShowAddChannel(!showAddChannel);
  };

  const addChannel = () => {
    if (!channels.includes(newChannelName) && newChannelName.trim() !== '') {
      const newChannel = {
        id: uuid(),
        name: newChannelName,
      };
      setChannels([...channels, newChannel]);
      changeShowAddChannel(false);
    }
  };

  return (
    <View style={{ flex: 1 / 3, backgroundColor: '#e9e9e9' }}>
      <ScrollView>
        {channels.map(channel => (
          <Channel channel={channel} key={channel.id} />
        ))}
      </ScrollView>
      {showAddChannel ? (
        <InputWithButton
          placeholder={'Channel Name'}
          onChangeText={setNewChannelName}
          onPress={toggleShowAddChannel}
          placeholderColor={'#333'}
          onSubmitEditing={addChannel}
          buttonContent={'X'}
        />
      ) : (
        <TextButton
          onPress={toggleShowAddChannel}
          buttonContent={'+'}
          text={'Add Channel'}
        />
      )}
    </View>
  );
};

const Channel = ({ channel: { id, name }, ...props }) => {
  const [activeChannel, setActiveChannel] = useGlobal('activeChannel');

  const updateActiveChannel = () => {
    setActiveChannel(id);
  };

  return (
    <TouchableOpacity onPress={updateActiveChannel}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

const InputWithButton = props => {
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        marginHorizontal: 10,
      }}
    >
      <TextInput
        placeholderColor={props.placeholderColor || '#333333'}
        placeholder={props.placeholder || 'Enter Text'}
        onChangeText={props.onChangeText || (() => {})}
        onSubmitEditing={props.onSubmitEditing}
        ref={inputEl}
        style={{
          backgroundColor: 'transparent',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 30,
          borderRadius: 9999,
          borderColor: '#000',
          borderWidth: 2,
          paddingHorizontal: 10,
          marginRight: 5,
          flexGrow: 1,
        }}
      />
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          width: 30,
          height: 30,
          borderRadius: 9999,
          borderColor: '#000',
          borderWidth: 2,
        }}
      >
        <Text style={{ color: '#000', padding: 5, fontSize: 20 }}>
          {props.buttonContent}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const TextButton = props => (
  <TouchableOpacity
    onPress={props.onPress || (() => {})}
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 10,
      marginHorizontal: 10,
      backgroundColor: 'transparent',
      height: 30,
      borderRadius: 9999,
      borderColor: '#000',
      borderWidth: 2,
      paddingHorizontal: 10,
    }}
  >
    <Text
      style={{
        color: '#000',
      }}
    >
      {props.text}
    </Text>

    <Text style={{ color: '#000', padding: 5, fontSize: 20 }}>
      {props.buttonContent}
    </Text>
  </TouchableOpacity>
);
