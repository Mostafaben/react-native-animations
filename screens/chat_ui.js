import React, { useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import { messages as data, user } from './../data';
import faker from 'faker';
import { Feather, AntDesign } from '@expo/vector-icons';
import { Colors } from './../ui-config/config';
const { width, height } = Dimensions.get('screen');
import { useEffect } from 'react';
import TouchableScale from 'react-native-touchable-scale';
import CText from '../components/ui-components/custom_text';
const SPACING = 20;

export default function ChatUI({ navigation }) {
  const [showProfile, setShowProfile] = useState(false);
  const [focus, setFocus] = useState(false);
  const [messages, setMessages] = useState(data);
  const scrollRef = React.useRef(null);

  function closeBottomSheet() {
    setShowProfile(false);
  }

  useEffect(() => {
    setTimeout(() => scrollToEnd(width * messages.length), 2000);
  }, []);

  function scrollToEnd(y) {
    scrollRef.current?.scrollTo({
      x: 0,
      y: y,
      animated: true,
    });
  }

  function addNewMessage({ nativeEvent: { text }, currentTarget }) {
    if (text?.length == 0) return;
    setMessages([
      ...messages,
      { txt: text, isSent: true, isImage: false, time: new Date() },
    ]);
    currentTarget.clear();
    setTimeout(() => {
      scrollToEnd(width * (messages.length + 1));
    }, 50);
  }

  function showPopup(message, y) {
    setEmojiPopup(true);
    Vibration.vibrate(100);
    let index = messages.findIndex((_) => _.txt === message);
    if (index === -1) return;
    Animated.parallel([
      Animated.sequence([
        Animated.timing(opacity, {
          duration: 150,
          useNativeDriver: true,
          toValue: 1.1,
        }),
        Animated.timing(opacity, {
          duration: 150,
          useNativeDriver: true,
          toValue: 1,
        }),
      ]),
      Animated.timing(translateY, {
        duration: 0,
        useNativeDriver: true,
        toValue: y - 100,
      }),
    ]).start();
  }

  function hideEmojiPopup() {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setEmojiPopup(false);
    }, 200);
  }
  const translateY = React.useRef(new Animated.Value(0)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;
  const [emojiPopup, setEmojiPopup] = React.useState(false);
  const emojiList = ['smile', 'heart', 'check', 'delete', 'edit-2'];
  return (
    <View style={styles.container}>
      <StatusBar />
      <Modal
        transparent
        animationDuration={200}
        visible={emojiPopup}
        children={
          <TouchableOpacity
            activeOpacity={1}
            style={{ flex: 1 }}
            onPress={hideEmojiPopup}
          >
            <Animated.View
              style={{
                opacity,
                transform: [{ translateY }, { scale: opacity }],
                height: 70,
                alignSelf: 'center',
                width: width * 0.8,
                backgroundColor: 'rgba(90 , 90 , 90 , 0.95)',
                borderRadius: 40,
                position: 'absolute',
                zIndex: 10,
                flexDirection: 'row',
                paddingHorizontal: SPACING,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {emojiList.map((name, index) => (
                <TouchableScale
                  key={index + 'emoji'}
                  activeScale={3}
                  friction={10}
                  onPress={() => {
                    setTimeout(() => hideEmojiPopup(), 300);
                  }}
                >
                  <Feather name={name} size={30} color="#ddd" />
                </TouchableScale>
              ))}
            </Animated.View>
          </TouchableOpacity>
        }
      />
      <ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={{
          paddingVertical: SPACING,
        }}
      >
        <TouchableOpacity
          onPress={() => setShowProfile(true)}
          activeOpacity={0.9}
        >
          <AvatarHeader />
        </TouchableOpacity>

        {messages.length == 0 ? (
          <AntDesign
            name="inbox"
            size={60}
            color="#A3AEB7"
            style={{ alignSelf: 'center', marginVertical: 100 }}
          />
        ) : null}

        {messages.map((message, index) => (
          <Message
            key={index}
            message={message.txt}
            isSent={message.isSent}
            showPopup={showPopup}
            isImage={message.isImage}
            recivedAt={message.time}
          />
        ))}
      </ScrollView>
      <View style={styles.bottom}>
        <TextInput
          style={[styles.input, { fontFamily: 'adobeClean' }]}
          placeholder={'Write something...'}
          onFocus={() => setFocus(true)}
          onSubmitEditing={addNewMessage}
          onBlur={() => setFocus(false)}
        />
        <Feather
          name="smile"
          size={30}
          color={focus ? '#2B3595' : '#A3AEB7'}
          style={styles.inputIcon}
        />
      </View>
      <Modal
        hitSlop={() => Alert.alert('asdjka')}
        visible={showProfile}
        animationType={'slide'}
        animationDuration={400}
        transparent
        children={<BottomSheet onClose={closeBottomSheet} />}
      />
    </View>
  );
}

function AvatarHeader() {
  return (
    <View style={styles.header}>
      <Image
        style={styles.headerImage}
        source={require('./../assets/images/me.jpg')}
      />
      <View>
        <CText style={{ fontSize: 18, fontWeight: 'bold' }}>{user.name}</CText>
        <CText style={{ color: '#888' }}>{user.email}</CText>
      </View>
    </View>
  );
}

function BottomSheet({ onClose }) {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onClose} style={{ flex: 1 }}>
      <Animated.View style={[styles.bottomSheetContainer, {}]}>
        <AvatarHeader />
        <TouchableOpacity activeOpacity={0.8} style={styles.bottomSheetButton}>
          <CText style={{ color: 'white' }}>View Profile</CText>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
}

function Message({ message, isSent = false, showPopup, isImage, recivedAt }) {
  const time = React.useRef(new Animated.Value(0)).current;
  const inputRange = [0, 1];
  let clicked = false;
  const opacity = time.interpolate({
    inputRange,
    outputRange: [0, 1],
  });
  const translateY = time.interpolate({
    inputRange,
    outputRange: [-SPACING, 0],
  });

  const marginBottom = time.interpolate({
    inputRange,
    outputRange: [0, SPACING],
  });

  const showTime = () => {
    let value = 1;
    if (clicked) value = 0;
    Animated.timing(time, {
      toValue: value,
      duration: 200,
      useNativeDriver: false,
    }).start();
    clicked = !clicked;
  };

  function showPopupDialog(e) {
    showPopup(message, e.nativeEvent.pageY);
  }

  const imageURL = React.useRef(
    `https://picsum.photos/id/${Math.round(Math.random() * 100) + 900}/400`
  ).current;

  //   const imageURL =
  // 'https://i.picsum.photos/id/940/400/400.jpg?hmac=-2sTA1minw9QpqhwlBkLG_EBiADfH09BPU_VwY2fwVk';
  //   console.log(imageURL);

  return (
    <Animated.View style={{ marginBottom }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={showTime}
        onLongPress={showPopupDialog}
      >
        <View style={[styles.messageContainer, isSent ? styles.sent : null]}>
          {!isImage ? (
            <CText
              style={[
                styles.messageText,
                { color: isSent ? 'white' : '#212121' },
              ]}
            >
              {message}
            </CText>
          ) : (
            <Image
              source={{ uri: imageURL }}
              style={[
                {
                  height: width * 0.6,
                  width: width * 0.6,
                  borderRadius: SPACING * 0.5,
                },

                isSent
                  ? {
                      borderBottomRightRadius: 0,
                    }
                  : {
                      borderBottomLeftRadius: 0,
                    },
              ]}
            />
          )}
        </View>
      </TouchableOpacity>
      <Animated.Text
        style={[
          styles.time,
          {
            alignSelf: isSent ? 'flex-end' : 'flex-start',
            opacity: opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        {recivedAt.toISOString()}
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bottomSheetButton: {
    height: 60,
    borderRadius: SPACING,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetContainer: {
    padding: SPACING,
    // height: height / 2,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width,
    borderTopLeftRadius: SPACING,
    borderTopRightRadius: SPACING,
    shadowColor: 'black',
    elevation: 10,
  },

  header: {
    flexDirection: 'row',
    marginBottom: SPACING,
    alignItems: 'center',
  },
  headerImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginRight: SPACING * 0.5,
  },

  time: {
    color: '#A3AEB7',
    fontSize: 11,
    marginTop: 4,
  },
  sent: {
    backgroundColor: '#2B3595',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: SPACING,
  },
  messageContainer: {
    borderTopLeftRadius: SPACING,
    padding: SPACING,
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    alignSelf: 'flex-start',
    borderTopRightRadius: SPACING,
    // marginBottom: SPACING * 0.5,
    borderBottomRightRadius: SPACING,
  },
  messageText: {
    color: '#303030',
    width: 'auto',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    height,
    width,
    paddingHorizontal: SPACING,

    paddingBottom: 90,
  },
  bottom: {
    width,
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: SPACING,
  },
  input: {
    width: width - 2 * SPACING,
    height: 60,
    paddingHorizontal: SPACING * 3,
    borderRadius: 30,
    // borderWidth: 1,
    backgroundColor: '#F2F2F2',
  },
  inputIcon: {
    position: 'absolute',
    left: 40,
    top: 35,
  },
});
