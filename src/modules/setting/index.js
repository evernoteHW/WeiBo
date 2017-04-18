
'use strict'
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView,
  RefreshControl,
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native';


export default class Setting extends Component {
   constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {
      header: (navigation, defaultHeader) => ({
          visible: true , // 覆盖预设中的此项
          title: "设置",
          titleStyle:{color: '#333333'},
     }),
  };
  render() {
    return (
      <View style={styles.container}>
     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#666666',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
