import React from 'react';
import faker from 'faker';
import { Dimensions, StyleSheet, View, Image, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');
import CText from './../components/ui-components/custom_text';
import { SharedElement } from 'react-navigation-shared-element';

export default function SharedElementList({ navigation }) {
  const randomDataList = new Array(10).fill(0);

  const openDetails = (id) => {
    navigation.navigate('shared_element_details', { id });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {randomDataList.map((_, index) => {
          return (
            <TouchableOpacity
              key={`item${index}`}
              onPress={() => openDetails(index + 900)}
              style={{ marginHorizontal: 10, marginBottom: 10 }}
            >
              <View style={styles.item}>
                <SharedElement
                  id={`item.${index + 900}.image`}
                  style={styles.img}
                >
                  <Image
                    source={{
                      uri: `https://picsum.photos/id/${index + 900}/400`,
                    }}
                    style={StyleSheet.absoluteFillObject}
                  />
                </SharedElement>
                <CText>{faker.name.findName()}</CText>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
});
