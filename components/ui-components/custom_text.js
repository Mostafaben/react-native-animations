import React from 'react';

import { View, ActivityIndicator, Text } from 'react-native';
import { useFonts } from 'expo-font';

const CText = ({ style, children }) => {
  return <Text style={[{ fontFamily: 'Lato', ...style }]}>{children}</Text>;
};

export default CText;
