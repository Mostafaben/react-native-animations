import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('screen');
import { AntDesign } from '@expo/vector-icons';
import DribbbleScreenOne from './screens/dribbbleScreenOne';
import 'react-native-gesture-handler';
import DribbbleScreenTwo from './screens/DribbbleScreenTwo';
import CText from './components/ui-components/custom_text';
import data from './data';
import ButtonAnimation from './screens/buttonAnimation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SharedELementList from './screens/shared_element_list';
import SharedElementDetails from './screens/shared_element_details';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const Lato = {
  Lato: require('./assets/fonts/Lato-Regular.ttf'),
};

import { useFonts } from 'expo-font';
import {
  Appearance,
  AppearanceProvider,
  useColorScheme,
} from 'react-native-appearance';
import Tinder from './screens/tinder';
// const Stack = createStackNavigator();

const Stack = createSharedElementStackNavigator();

export default function App() {
  const options = { headerShown: false };
  const sharedElementTranstionOptions = () => ({
    transitionSpec: {
      open: {
        animation: 'timing',
        config: {
          duration: 300,
        },
      },
      close: {
        animation: 'timing',
        config: {
          duration: 300,
        },
      },
    },
    cardStyleInterpolator: ({ current: { progress } }) => ({
      cardStyle: {
        opacity: progress,
      },
    }),
  });
  let [fontLoaded] = useFonts(Lato);
  if (!fontLoaded)
    return (
      <View style={{ flexGrow: 1 }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'home'}>
        <Stack.Screen name={'home'} component={NavigationPage} />
        <Stack.Screen name={'slider'} component={Slider} options={options} />
        <Stack.Screen
          name={'screen1'}
          component={DribbbleScreenOne}
          options={options}
        />
        <Stack.Screen name={'screen2'} component={DribbbleScreenTwo} />
        <Stack.Screen name={'buttonAnimation'} component={ButtonAnimation} />
        <Stack.Screen name={'tinder'} component={Tinder} options={options} />
        <Stack.Screen
          name={'shared_element_list'}
          component={SharedELementList}
          options={sharedElementTranstionOptions}
        />
        <Stack.Screen
          name={'shared_element_details'}
          component={SharedElementDetails}
          sharedElementsConfig={(route, otherRoute, showing) => {
            const {
              params: { id },
            } = route;
            return [`item.${id}.image`, `item.${id}.name`];
          }}
          options={sharedElementTranstionOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const pages = [
  {
    name: 'slider',
  },
  {
    name: 'buttonAnimation',
  },
  {
    name: 'screen1',
  },
  {
    name: 'screen2',
  },
  {
    name: 'tinder',
  },
  {
    name: 'shared_element_list',
  },
];

const NavigationPage = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StatusBar />
      {pages.map((item) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(item.name);
          }}
          key={item.name}
        >
          <CText style={{ fontSize: 20, padding: 10 }}>{item.name}</CText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

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
