import React, { useGlobal, useEffect } from 'reactn';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { GiftedChat } from 'react-native-gifted-chat';
import emojiUtils from 'emoji-utils';

import SlackMessage from './SlackMessage';
import AccessoryBar from './AccessoryBar';
import CustomActions from './CustomActions';
import CustomView from './CustomView';

export const Chat = props => {
  const [messages, setMessages] = useGlobal('messages');
  const [activeChannel, setActiveChannel] = useGlobal('activeChannel');

  // useEffect(() => {
  //   setMessages([
  //     ...messages,
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);

  const onSend = (newMessages = []) => {
    newMessages = newMessages.map(msg => ({
      ...msg,
      channel: { id: activeChannel },
    }));
    setMessages(GiftedChat.append(messages, newMessages));
  };

  const renderCustomView = props => {
    return <CustomView {...props} />;
  };
  const renderCustomActions = props => (
    // Platform.OS === 'web' ? null :
    <CustomActions {...props} onSend={onSend} />
  );
  const renderAccessory = () => <AccessoryBar onSend={onSend} />;

  const renderMessage = props => {
    const {
      currentMessage: { text: currText, _id: id },
    } = props;

    let messageTextStyle;

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30,
      };
    }

    return (
      <SlackMessage key={id} {...props} messageTextStyle={messageTextStyle} />
    );
  };

  const filteredMessages = messages.filter(
    message => message.channel.id === activeChannel,
  );

  return (
    <GiftedChat
      messages={filteredMessages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      }}
      renderMessage={renderMessage}
      renderAccessory={Platform.OS === 'web' ? null : renderAccessory}
      renderActions={renderCustomActions}
      renderCustomView={renderCustomView}
    />
  );
};
