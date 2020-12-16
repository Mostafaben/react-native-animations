import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('screen');
const PADDING = 20;
import { AntDesign, Feather, Entypo } from '@expo/vector-icons';
import TouchableScale from 'react-native-touchable-scale';
import BottomSheet from 'reanimated-bottom-sheet';

const DATA = [
  {
    name: 'Living Room',
    key: '1',
  },
  {
    name: 'Bathroom',
    key: '2',
  },
  {
    name: 'Kitchen',
    key: '3',
  },
  {
    name: 'Bedroom',
    key: '4',
  },
  {
    name: 'Roof',
    key: '5',
  },
];

import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';

export default function DribbbleScreenOne() {
  const [selectedTap, setSelectedTab] = useState(0);
  const scrollViewRef = useRef(null);
  const sheetRef = useRef(null);

  function changeTab(index) {
    scrollViewRef.current.scrollTo({ x: width * index, y: 0, animated: true });
  }

  return (
    <FlingGestureHandler
      direction={Directions.UP}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
          sheetRef.current.snapTo(1);
        }
      }}
    >
      <View style={styles.container}>
        <StatusBar backgroundColor={'#2D2D2D'} />
        <View style={styles.header}>
          <View style={styles.headerTextContent}>
            <Text
              style={{
                fontSize: 26,
                color: 'white',
                marginBottom: PADDING * 0.25,
              }}
            >
              Welcom Home
            </Text>
            <Text style={{ fontSize: 13, color: 'white' }}>
              Benlagha Mostafa
            </Text>
          </View>
          <Image
            source={{
              uri:
                'https://avatars0.githubusercontent.com/u/32815384?s=400&u=56c99b2b8b06a0f4028064facca76dea46997a75&v=4',
            }}
            style={styles.headerImage}
          />
        </View>
        <View style={styles.body}>
          <View style={{ paddingLeft: PADDING }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: PADDING }}
              horizontal
              data={DATA}
              renderItem={({ item, index }) => (
                <TouchableScale
                  onPress={() => {
                    changeTab(index);
                  }}
                  activeOpacity={0.8}
                >
                  <View style={styles.tabItem}>
                    <Text
                      style={{
                        color: selectedTap == index ? 'black' : '#888',
                        fontWeight: selectedTap == index ? 'bold' : 'normal',
                        fontSize: 16,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                </TouchableScale>
              )}
            />
          </View>

          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            ref={scrollViewRef}
            snapToInterval={width}
            pagingEnabled
            scrollEventThrottle={20}
            onScroll={(e) => {
              setSelectedTab(Math.round(e.nativeEvent.contentOffset.x / width));
            }}
          >
            <ScrollView
              style={{ width }}
              showsVerticalScrollIndicator={false}
              bounces
            >
              <View style={styles.tab}>
                <View style={styles.tabCardContainer}>
                  <AntDesign name={'wifi'} size={36} />
                  <Text
                    style={{ fontSize: 18, color: 'black', marginVertical: 8 }}
                  >
                    WI-FI
                  </Text>
                  <Text style={{ color: '#aaa' }}>4G LTE</Text>
                  <CheckBox />
                </View>
                <View style={styles.tabCardContainer}>
                  <Entypo name={'light-up'} size={36} />
                  <Text
                    style={{ fontSize: 18, color: 'black', marginVertical: 8 }}
                  >
                    Light
                  </Text>
                  <Text style={{ color: '#aaa' }}>Whitenoise 7</Text>
                  <CheckBox />
                </View>
                <View style={styles.tabCardContainer}>
                  <AntDesign name={'printer'} size={36} />
                  <Text
                    style={{ fontSize: 18, color: 'black', marginVertical: 8 }}
                  >
                    Printer
                  </Text>
                  <Text style={{ color: '#aaa' }}>HP 300</Text>
                  <CheckBox />
                </View>
                <View style={styles.tabCardContainer}>
                  <Feather name={'tv'} size={36} />
                  <Text
                    style={{ fontSize: 18, color: 'black', marginVertical: 8 }}
                  >
                    TV
                  </Text>
                  <Text style={{ color: '#aaa' }}>Samsung </Text>
                  <CheckBox />
                </View>
                <View style={styles.tabCardContainer}>
                  <Feather name={'tv'} size={36} />
                  <Text
                    style={{ fontSize: 18, color: 'black', marginVertical: 8 }}
                  >
                    TV
                  </Text>
                  <Text style={{ color: '#aaa' }}>Samsung </Text>
                  <CheckBox />
                </View>
                <View style={{ height: 100, width }} />
              </View>
            </ScrollView>
            <ScrollView
              style={{ width }}
              showsVerticalScrollIndicator={false}
              bounces
            >
              <View style={styles.tab}>
                <View style={styles.tabCardContainer}>
                  <AntDesign name={'wifi'} size={36} />
                  <Text
                    style={{ fontSize: 18, color: 'black', marginVertical: 8 }}
                  >
                    WI-FI
                  </Text>
                  <Text style={{ color: '#aaa' }}>4G LTE</Text>
                  <CheckBox />
                </View>
                <View style={styles.tabCardContainer}>
                  <Entypo name={'light-up'} size={36} />
                  <Text
                    style={{ fontSize: 18, color: 'black', marginVertical: 8 }}
                  >
                    Light
                  </Text>
                  <Text style={{ color: '#aaa' }}>Whitenoise 7</Text>
                  <CheckBox />
                </View>
                <View style={styles.tabCardContainer}>
                  <AntDesign name={'printer'} size={36} />
                  <Text
                    style={{ fontSize: 18, color: 'black', marginVertical: 8 }}
                  >
                    Printer
                  </Text>
                  <Text style={{ color: '#aaa' }}>HP 300</Text>
                  <CheckBox />
                </View>
                <View style={styles.tabCardContainer}>
                  <Feather name={'tv'} size={36} />
                  <Text
                    style={{ fontSize: 18, color: 'black', marginVertical: 8 }}
                  >
                    TV
                  </Text>
                  <Text style={{ color: '#aaa' }}>Samsung </Text>
                  <CheckBox />
                </View>
                <View style={styles.tabCardContainer}>
                  <Feather name={'tv'} size={36} />
                  <Text
                    style={{ fontSize: 18, color: 'black', marginVertical: 8 }}
                  >
                    TV
                  </Text>
                  <Text style={{ color: '#aaa' }}>Samsung </Text>
                  <CheckBox />
                </View>
                <View style={{ height: 100, width }} />
              </View>
            </ScrollView>
          </ScrollView>
          <BottomNavigation />
        </View>

        <TouchableScale
          style={styles.cardContainer}
          onPress={() => {
            sheetRef.current.snapTo(1);
          }}
        >
          <View style={styles.cardHeader}>
            <View>
              <Text style={{ fontSize: 18 }}>Queen</Text>
              <Text style={{ color: '#aaa' }}>You Wanna rock</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <AntDesign
                name={'star'}
                size={24}
                color={'#FAEFA4'}
                style={{ marginHorizontal: PADDING * 0.3 }}
              />
              <Feather
                name={'repeat'}
                size={24}
                color={'#FAEFA4'}
                style={{ marginHorizontal: PADDING * 0.3 }}
              />
              <AntDesign name={'pause'} size={24} color={'#FAEFA4'} />
            </View>
          </View>
          <View style={styles.cardFooter}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: PADDING * 0.3,
                marginTop: PADDING,
              }}
            >
              <Text style={{ color: '#aaa' }}>2:33</Text>
              <Text style={{ color: '#aaa' }}>2:33</Text>
            </View>
            <ProgressBar progressBarwidth={width - 80} persentage={0.7} />
          </View>
        </TouchableScale>
        <BottomSheet
          ref={sheetRef}
          initialSnap={0}
          borderRadius={PADDING}
          snapPoints={[0, width * 0.4 + PADDING * 2, width * 0.4 + PADDING * 2]}
          renderContent={renderContent}
        />
      </View>
    </FlingGestureHandler>
  );
}

const renderContent = () => (
  <View
    style={{
      backgroundColor: '#2D2D2D',
      padding: PADDING,
      height: width * 0.4 + PADDING * 2,
      flexDirection: 'row',
      alignItems: 'center',
    }}
  >
    <Image
      source={{
        uri:
          'https://i.pinimg.com/736x/ea/1f/64/ea1f64668a0af149a3277db9e9e54824.jpg',
      }}
      style={{
        width: width * 0.4,
        height: width * 0.4,
        borderRadius: PADDING * 0.5,
        marginRight: PADDING,
      }}
    />
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexGrow: 1,
        alignItems: 'center',
      }}
    >
      <Entypo name={'controller-jump-to-start'} size={32} color={'#ddd'} />
      <Entypo name={'controller-play'} size={80} color={'#ddd'} />
      <Entypo name={'controller-next'} size={32} color={'#ddd'} />
    </View>
    <Text
      style={{
        color: '#ddd',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        position: 'absolute',
        top: 20,
        left: width * 0.4 + PADDING * 2,
      }}
    >
      Queen
    </Text>
    <Text
      style={{ color: '#ddd', position: 'absolute', bottom: 20, right: 20 }}
    >
      3:30
    </Text>
  </View>
);
const TABONEDATA = [{}];

const NAVDATA = [
  {
    icon: 'home',
    name: 'Home',
    key: 'item1',
  },
  {
    icon: 'music',
    name: 'Music',
    key: 'item2',
  },
  {
    icon: 'shopping-bag',
    name: 'Shop',
    key: 'item3',
  },
  {
    icon: 'settings',
    name: 'Settings',
    key: 'item4',
  },
];

const BottomNavigation = () => {
  const [selectedPage, setSelectedPage] = useState(0);

  const changePage = (index) => {
    setSelectedPage(index);
  };

  return (
    <View style={[bottomStyles.container, styles.shadow]}>
      {NAVDATA.map((item, index) => (
        <TouchableScale
          onPress={() => {
            changePage(index);
          }}
        >
          <View style={bottomStyles.item} key={item.key}>
            {index != selectedPage ? (
              <Feather name={item.icon} size={24} color={'#888'} />
            ) : null}
            <Text
              style={[
                bottomStyles.itemName,
                {
                  color: selectedPage == index ? '#8A7F3C' : '#888',
                  transform: [
                    {
                      translateY: selectedPage == index ? -4 : 0,
                    },
                  ],
                },
              ]}
            >
              {item.name}
            </Text>

            {selectedPage == index ? (
              <View style={[bottomStyles.circle]}></View>
            ) : null}
          </View>
        </TouchableScale>
      ))}
    </View>
  );
};
const bottomStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: PADDING * 0.5,
    alignSelf: 'center',
    backgroundColor: '#2D2D2D',
    padding: PADDING,
    width: width - 2 * PADDING,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: PADDING * 1.5,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    color: '#888',
  },
  circle: {
    width: 6,
    height: 6,
    transform: [{ translateY: 8 }],
    borderRadius: 4,
    backgroundColor: '#8A7F3C',
  },
});

const ProgressBar = ({ persentage, progressBarwidth }) => {
  return (
    <View style={[styles.progressBarContainer, { width: progressBarwidth }]}>
      <View
        style={[styles.progressBar, { width: progressBarwidth * persentage }]}
      ></View>
    </View>
  );
};

const CheckBox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const animate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let random = Math.random();
    if (random > 0.5) setIsChecked(false);
    else setIsChecked(true);
    check();
  }, []);

  //   const translateX = animate.interpolate({
  //     inputRange: [0, 1],
  //     outputRange: [0, 26],
  //   });

  function check() {
    let value = 26;
    if (isChecked) value = 0;
    Animated.timing(animate, {
      toValue: value,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsChecked(!isChecked);
  }

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={check}>
      <Animated.View
        style={{
          width: 58,
          height: 32,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: PADDING * 0.5,
          backgroundColor: isChecked ? '#A9EC93' : '#888',
        }}
      >
        <Animated.View
          style={[
            {
              height: 26,
              width: 26,
              margin: 3,
              borderRadius: 14,
              backgroundColor: 'white',
            },
            { transform: [{ translateX: animate }] },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.01,
    shadowRadius: 4.65,
    elevation: 7,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#FCF6D2',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F7E673',
  },

  container: {
    flex: 1,
    width,
    height,
  },
  header: {
    position: 'absolute',
    top: 0,
    width: width,
    paddingHorizontal: PADDING * 1.5,
    height: 230,
    zIndex: -1,
    backgroundColor: '#2D2D2D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  headerImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },

  cardContainer: {
    backgroundColor: 'white',
    padding: PADDING,
    borderRadius: PADDING,
    position: 'absolute',
    top: 160,
    alignSelf: 'center',
    width: width * 0.9,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.01,
    shadowRadius: 4.65,
    elevation: 7,
  },
  body: {
    marginTop: 210,
    paddingTop: 80,
    backgroundColor: 'whitesmoke',
    width: width,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: -1,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabItem: {
    paddingRight: PADDING,
    paddingVertical: PADDING * 0.5,
  },
  tab: {
    width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: PADDING * 0.5,
  },
  tabCardContainer: {
    shadowColor: '#ddd',
    shadowOffset: { height: 3, width: 3 },
    elevation: 7,
    padding: PADDING,
    backgroundColor: 'white',
    flexGrow: 1,
    margin: PADDING * 0.5,
    borderRadius: PADDING,
    minWidth: width * 0.4,
    maxWidth: width * 0.5 - PADDING * 1.5,
  },
});
