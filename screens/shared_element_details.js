import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('screen');
import { SharedElement } from 'react-navigation-shared-element';
import { listItems } from './../data';

export default function SharedElementDetails({ navigation, route }) {
  const {
    params: { id },
  } = route;

  const item = listItems.find((_) => _.id == id);

  React.useEffect(() => {});

  return (
    <Animated.View style={styles.container}>
      <SharedElement id={`item.${id}.image`}>
        <Image source={{ uri: item.image }} style={styles.img}></Image>
      </SharedElement>
      <Text style={[styles.name]}>{item.name}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  name: {
    fontSize: 24,
    textTransform: 'uppercase',
    margin: 10,
    fontWeight: 'bold',
  },
  img: {
    width,
    height: height * 0.4,
  },
});
