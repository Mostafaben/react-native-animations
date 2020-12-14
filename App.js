import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('screen');
import { AntDesign } from '@expo/vector-icons';
import ButtonAnimation from './screens/buttonAnimation';
import DribbbleScreenOne from './screens/dribbbleScreenOne';

import data from './data';

export default function App() {
  // return <Slider />;
  // return <ButtonAnimation />;
  return <DribbbleScreenOne />;
}

const Slider = ({ navigation }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar style={'light'} />
      {data.map((item, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const opacity = scrollX.interpolate({
          inputRange: [
            (index - 0.5) * width,
            index * width,
            (index + 0.5) * width,
          ],
          outputRange: [0, 1, 0],
        });
        const translateY = scrollX.interpolate({
          inputRange,
          outputRange: [30, 0, 30],
        });
        const translateX = scrollX.interpolate({
          inputRange,
          outputRange: [-30, 0, 30],
        });

        return (
          <Animated.View
            style={[styles.seller, { opacity, transform: [{ translateX }] }]}
            key={index + 'item'}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'white',
                textTransform: 'uppercase',
              }}
            >
              {item.sellerName}
            </Text>
            <Text style={{ color: '#ddd' }}>{item.phoneNumber}</Text>
          </Animated.View>
        );
      })}
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        data={data}
        horizontal
        bounces
        decelerationRate={'normal'}
        pagingEnabled
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 0.5) * width,
              index * width,
              (index + 0.5) * width,
            ],
            outputRange: [0, 1, 0],
          });
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
          });
          return (
            <Animated.View style={styles.item}>
              <Animated.View
                style={[
                  styles.itemContent,
                  { opacity },
                  { transform: [{ scale }] },
                ]}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ color: '#212121' }}>{item.desc}</Text>

                <Text
                  style={{
                    alignSelf: 'flex-end',
                    fontSize: 22,
                    // color: '#5AA9E6',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {item.price} $
                </Text>

                <View style={styles.rating}>
                  {new Array(item.rating).fill(0).map((_, index) => (
                    <AntDesign
                      name="star"
                      size={18}
                      color="#FFE45E"
                      key={'star' + index}
                    />
                  ))}
                </View>
                <TouchableOpacity
                  style={{
                    marginTop: 16,
                    borderColor: 'black',
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    flexDirection: 'row',
                    height: 40,
                    borderRadius: 3,
                  }}
                >
                  <AntDesign
                    style={{ marginRight: 10 }}
                    name="shoppingcart"
                    size={24}
                    color="black"
                  />
                  <Text style={{ color: 'black' }}>BUY NOW</Text>
                </TouchableOpacity>
              </Animated.View>
              <Image source={{ uri: item.image }} style={styles.itemImg} />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  item: {
    flex: 1,
    width,
    height,
  },
  itemContent: {
    position: 'absolute',
    width: width * 0.9,
    top: height * 0.6,
    alignSelf: 'center',
    zIndex: 2,
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 16,
    borderRadius: 3,
  },
  itemImg: {
    width,
    height,
  },
  rating: {
    flexDirection: 'row',
  },
  seller: {
    position: 'absolute',
    zIndex: 2,
    top: 60,
    left: 40,
  },
});
