import { image } from 'faker';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH;
const SPACING = 20;
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const images = [
  {
    uri:
      'https://i.pinimg.com/originals/b4/75/00/b4750046d94fed05d00dd849aa5f0ab7.jpg',
  },
  {
    uri:
      'https://i.pinimg.com/originals/3a/f0/e5/3af0e55ea66ea69e35145fb108b4a636.jpg',
  },
  {
    uri:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
  },
  {
    uri:
      'https://i.pinimg.com/originals/b4/75/00/b4750046d94fed05d00dd849aa5f0ab7.jpg',
  },
  {
    uri:
      'https://i.pinimg.com/originals/3a/f0/e5/3af0e55ea66ea69e35145fb108b4a636.jpg',
  },
  {
    uri:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
  },
  {
    uri:
      'https://i.pinimg.com/originals/b4/75/00/b4750046d94fed05d00dd849aa5f0ab7.jpg',
  },
  {
    uri:
      'https://i.pinimg.com/originals/3a/f0/e5/3af0e55ea66ea69e35145fb108b4a636.jpg',
  },
  {
    uri:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
  },
  {
    uri:
      'https://i.pinimg.com/originals/b4/75/00/b4750046d94fed05d00dd849aa5f0ab7.jpg',
  },
  {
    uri:
      'https://i.pinimg.com/originals/3a/f0/e5/3af0e55ea66ea69e35145fb108b4a636.jpg',
  },
  {
    uri:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
  },
  {
    uri:
      'https://i.pinimg.com/originals/b4/75/00/b4750046d94fed05d00dd849aa5f0ab7.jpg',
  },
  {
    uri:
      'https://i.pinimg.com/originals/3a/f0/e5/3af0e55ea66ea69e35145fb108b4a636.jpg',
  },
  {
    uri:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
  },
];

import {
  FlingGestureHandler,
  State,
  Directions,
} from 'react-native-gesture-handler';
import TouchableScale from 'react-native-touchable-scale';
import CText from '../components/ui-components/custom_text';

export default function Tinder({ navigation }) {
  const Like = useRef(new Animated.Value(0)).current;
  const dislike = useRef(new Animated.Value(0)).current;
  const heartInputRange = [0, 1];
  const showHeartAnimation = Like.interpolate({
    inputRange: heartInputRange,
    outputRange: [0, 4],
  });
  const moveHeartAnimation = Like.interpolate({
    inputRange: heartInputRange,
    outputRange: [0, -100],
  });
  const heartOpacity = Like.interpolate({
    inputRange: heartInputRange,
    outputRange: [0, 1],
  });
  const rotateHeartAnimate = Like.interpolate({
    inputRange: [0, 0.2, 0.4, 0.7, 0.8, 1],
    outputRange: ['0deg', '90deg', '0deg', '90deg', '0deg', '0deg'],
  });

  function showHeart() {
    Animated.sequence([
      Animated.timing(Like, {
        useNativeDriver: true,
        duration: 1000,
        toValue: 1,
      }),
      Animated.timing(Like, {
        useNativeDriver: true,
        duration: 1000,
        toValue: 0,
      }),
    ]).start();
  }

  const dislikeOpacity = dislike.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0, 1, 1],
  });
  const dislikeRotate = dislike.interpolate({
    inputRange: [0, 0.2, 0.5, 0.7, 1],
    outputRange: ['0deg', '-45deg', '20deg', '-20deg', '35deg'],
  });
  const dislikeScale = dislike.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 4],
  });
  function showDislike() {
    Animated.sequence([
      Animated.timing(dislike, {
        toValue: 0.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(dislike, {
        useNativeDriver: true,
        duration: 500,
        toValue: 1,
      }),
      Animated.timing(dislike, {
        toValue: 0,
        useNativeDriver: true,
        duration: 700,
      }),
    ]).start();
  }

  return (
    <View style={style.container}>
      {images.map((item, index) => {
        const scrollX = useRef(new Animated.Value(1)).current;
        function Delete() {
          Animated.timing(scrollX, {
            toValue: 0,
            useNativeDriver: true,
            duration: 400,
          }).start();
        }
        function Like() {
          Animated.timing(scrollX, {
            toValue: 2,
            useNativeDriver: true,
            duration: 400,
          }).start();
        }
        const inputRange = [0, 1, 2];

        const rotate = scrollX.interpolate({
          inputRange,
          outputRange: ['-45deg', '0deg', '45deg'],
        });
        const translateX = scrollX.interpolate({
          inputRange,
          outputRange: [-width * 2, 0, width],
        });
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 1.5],
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1, 1.2],
        });

        return (
          <FlingGestureHandler
            key={'gesture_' + index}
            numberOfPointers={1}
            direction={Directions.LEFT}
            onHandlerStateChange={(e) => {
              if (e.nativeEvent.state == State.END) {
                Delete();
                showDislike();
              }
            }}
          >
            <FlingGestureHandler
              numberOfPointers={1}
              direction={Directions.RIGHT}
              onHandlerStateChange={(e) => {
                if (e.nativeEvent.state == State.END) {
                  Like();
                  showHeart();
                }
              }}
            >
              <Animated.View
                style={[
                  style.posterContainer,
                  {
                    zIndex: images.length - index,
                    left: (width - ITEM_WIDTH) / 2,
                    opacity,
                    transform: [
                      { scale },
                      {
                        translateX,
                      },
                      {
                        rotate,
                      },
                    ],
                  },
                ]}
                key={'poster' + index}
              >
                <TouchableScale activeScale={0.5}>
                  <Image source={item} style={style.poster} />
                </TouchableScale>
              </Animated.View>
            </FlingGestureHandler>
          </FlingGestureHandler>
        );
      })}

      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: height / 2 - 40,
            zIndex: 1000,
            alignSelf: 'center',
          },
          {
            opacity: dislikeOpacity,

            transform: [
              { rotateZ: dislikeRotate },
              { scale: dislikeScale },
              //   { translateY: moveHeartAnimation },
            ],
          },
        ]}
      >
        <MaterialCommunityIcons name="heart-broken" size={40} color="#eee" />
      </Animated.View>
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: SPACING * 4,
            zIndex: images.length + 2,
            alignSelf: 'center',
          },
          {
            opacity: heartOpacity,
            transform: [
              { rotateY: rotateHeartAnimate },
              { scale: showHeartAnimation },
              { translateY: moveHeartAnimation },
            ],
          },
        ]}
      >
        <AntDesign name="heart" size={40} color="red" />
      </Animated.View>

      <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}
      >
        <MaterialCommunityIcons name="sticker-emoji" size={50} color="#888" />
        <CText style={{ fontSize: 20, color: '#888', marginTop: 20 }}>
          No more users
        </CText>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: 'center',
    alignContent: 'center',
    // backgroundColor: 'white',
  },
  posterContainer: {
    position: 'absolute',
  },
  poster: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 10,
  },
});
