import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
const { width, height } = Dimensions.get('screen');
import { AntDesign } from '@expo/vector-icons';

function ButtonAnimation() {
  const animateBtn = useRef(new Animated.Value(1)).current;
  //   const translateY = animateBtn.interpolate({
  //     inputRange: [0.8, 0.9, 1],
  //     outputRange: [-100, 10, 0],
  //   });
  const colorAnimation = useRef(new Animated.Value(0)).current;
  const rotateY = animateBtn.interpolate({
    inputRange: [1, 20],
    outputRange: ['0deg', '-90deg'],
  });
  const backgroundColor = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['white', '#00272B'],
  });
  const [black, setBlack] = useState(false);

  function handleClick() {
    Animated.sequence([
      Animated.timing(animateBtn, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animateBtn, {
        toValue: 20,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animateBtn, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    let newValue = 0;
    if (black) newValue = 0;
    else newValue = 1;

    Animated.timing(colorAnimation, {
      duration: 1000,
      toValue: newValue,
      useNativeDriver: false,
    }).start();

    setBlack(!black);
  }

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity onPress={handleClick} activeOpacity={0.9}>
        <Animated.View
          style={[
            styles.btn,

            {
              transform: [
                { scale: animateBtn },
                // { translateY },
                { rotateY },
                { perspective: 1000 },
              ],
            },
          ]}
        >
          <AntDesign name={'android1'} size={30} style={styles.btnContent} />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    height,
  },
  btn: {
    backgroundColor: '#FF6663',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    // shadowColor: '#888',
    // shadowRadius: 1,
    // elevation: 4,
    // shadowOffset: {
    //   height: 3,
    //   width: 3,
    // },
    // shadowOpacity: 1,
  },
  btnContent: {
    color: 'white',
  },
});

export default ButtonAnimation;
