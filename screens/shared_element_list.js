import React from 'react';
import faker from 'faker';
import { Dimensions, StyleSheet, View, Image, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');
import CText from './../components/ui-components/custom_text';
import { SharedElement } from 'react-navigation-shared-element';
import { listItems } from './../data';

export default function SharedElementList({ navigation }) {
  const openDetails = (id) => {
    navigation.navigate('shared_element_details', { id });
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {listItems.map((item, index) => {
          return (
            <TouchableOpacity
              key={`item${index}`}
              onPress={() => openDetails(item.id)}
              style={{ marginHorizontal: 10, marginBottom: 10 }}
            >
              <View style={styles.item}>
                <SharedElement id={`item.${item.id}.image`} style={styles.img}>
                  <Image
                    source={{
                      uri: item.image,
                    }}
                    style={[StyleSheet.absoluteFillObject, { borderRadius: 5 }]}
                  />
                </SharedElement>

                <CText>{item.name}</CText>
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
