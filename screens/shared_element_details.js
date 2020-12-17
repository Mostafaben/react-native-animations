import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import CText from '../components/ui-components/custom_text';
const { width, height } = Dimensions.get('screen');
import faker from 'faker';
import { SharedElement } from 'react-navigation-shared-element';
export default function SharedElementDetails({ navigation, route }) {
  const {
    params: { id },
  } = route;

  return (
    <View style={styles.container}>
      <SharedElement id={`item.${id}.image`}>
        <Image
          source={{ uri: `https://picsum.photos/id/${id}/400` }}
          style={styles.img}
        ></Image>
      </SharedElement>
      <CText style={styles.name}>{faker.name.findName()}</CText>
    </View>
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
