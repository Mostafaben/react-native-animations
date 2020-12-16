import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { useCallback } from 'react';

const Lato = {
  Lato: require('./../assets/fonts/Lato-Regular.ttf'),
};

// import { PanGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');
const SPACING = 10;
const images = new Array(15).fill({}).map((_, index) => {
  const id = 1000 + index;
  return {
    // uri: `https://picsum.photos/id/${id}/400&trn=${Math.random()}`,
    // uri: `https://i.picsum.photos/id/125/400/400.jpg?hmac=UnXauuEU_d19eOGgww8kkznAOQccYPYUaSoWbCoaYYU&trn=${Math.random()}`,
    uri: `https://images.unsplash.com/photo-1608050803558-2ff1a6e4e5de?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80&trn=${Math.random()}`,
  };
});

const Mansory = ({
  onPress,
  borderRadius = 0,
  columns = 2,
  Gap = 10,
  data,
  maxHeight = 300 / columns,
  enableRandomHeight = false,
  minHeight = 100,
  activeScale = 0.9,
}) => {
  const imgWidth = width / columns - Gap * 1;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          justifyContent: 'center',
          // width,
          paddingVertical: Gap,
          paddingHorizontal: Gap / 2,
          flexDirection: 'row',
        }}
      >
        {new Array(columns).fill(10).map((_, index) => {
          return (
            <View
              style={{
                width: width / columns,
              }}
              key={'container_' + index}
            >
              {data
                .filter((_, i) => i % columns === index)
                .map((uri, i) => {
                  const imgHeight = enableRandomHeight
                    ? Math.min(maxHeight * Math.random() + minHeight, maxHeight)
                    : maxHeight;
                  return (
                    <TouchableScale
                      activeScale={activeScale}
                      friction={2}
                      key={'content_' + (index + i)}
                      onPress={onPress}
                    >
                      <ImageCard
                        Gap={Gap}
                        imgHeight={imgHeight}
                        imgWidth={imgWidth}
                        uri={uri}
                        borderRadius={borderRadius}
                      />
                    </TouchableScale>
                  );
                })}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const ImageCard = ({ borderRadius, imgHeight, imgWidth, uri, Gap }) => {
  const [state, setState] = useState(false);
  const _imageLoaded = useCallback(() => setState(true));
  return (
    <View
      style={{
        borderRadius,
        width: imgWidth,
        height: imgHeight,
        marginHorizontal: Gap / 2,
        backgroundColor: '#ddd',
        marginBottom: Gap,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!state ? (
        <ActivityIndicator
          size={'large'}
          color={'#888'}
          style={{ position: 'absolute', zIndex: 2, alignSelf: 'center' }}
        />
      ) : null}
      <Image
        source={uri}
        onLoad={_imageLoaded}
        style={[StyleSheet.absoluteFillObject, { borderRadius }]}
      />
    </View>
  );
};

const DribbbleScreenTwo = () => {
  return (
    <Mansory
      columns={2}
      maxHeight={200}
      minHeight={100}
      Gap={8}
      borderRadius={10}
      enableRandomHeight={true}
      data={images}
    />
  );
};

export default DribbbleScreenTwo;
