'use strict'
import React, { Component } from 'react'
import {
  Text,
  View,
  FlatList,
  Image,
  Animated,
  Dimensions,
  NavigatorIOS,
  Button,
  TouchableOpacity,
  Alert
} from 'react-native';

import styles from './styles.js';

export default class Home extends React.Component {
  viewWillAppear(){
    console.log('viewWillAppear');
  }
  viewDidAppear(){
    console.log('viewDidAppear');
  }
  viewWillDisAppear(){
    console.log('viewWillDisAppear');
  }
  viewDidDisAppear(){
    console.log('viewDidDisAppear');
  }

  componentDidFocus(){
    console.log('componentDidFocus');
  }
  componentDidMount() {
  }
  componentWillMount(){
    console.log("componentWillMount");
  }
  onSettingButtonPress(navigation){
        /*第一种方式 Push*/
        // navigation.navigate('Register', {user: 'Lucy'})
        /*第二种方式 Push*/
        // navigation.dispatch(navigateAction)
    }
    render() {
      return (

          <View style={styles.container}
          >
          
          </View>
      );
    }
}
