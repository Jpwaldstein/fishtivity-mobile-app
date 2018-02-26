import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
  }
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/fishtivity-cover-jonwaldstein.jpg')}
        style={styles.backgroundImage}
      >
        <Text style={styles.Title}>Fishtivity</Text>
        <Text style={styles.subTitle}>A community of fishing enthusiasts</Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Title: {
    fontSize: 50,
    fontWeight: '500',
    color: 'white'
  },
  subTitle: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white'
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: null,
    height: null,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },

});
