'use strict'
import React, { Component } from 'react'
import {
  Text,
  View,
  SectionList,
  Image,
  Animated,
  Dimensions,
  NavigatorIOS,
  LayoutAnimation,
  AppState
} from 'react-native';

import styles from './styles.js'


export default class MicroBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width:        100,
      height:       50,
      blurBgHidden: true,
      bounceValue:  new Animated.Value(1),
      decayValue:   new Animated.Value(400),
      fadeAnim:     new Animated.Value(1), 
      springValue:  new Animated.Value(400),
      appState:     AppState.currentState 
    };
  }
   static navigationOptions = {
      header: (navigation, defaultHeader) => ({
          ...defaultHeader,
            title: '发微博',
            style: { backgroundColor: 'white'},
     }),
  };
  startAnimation() {
    //弹跳动画
   
     Animated.sequence([

         Animated.spring(
         this.state.springValue,
          {
            toValue:  80,
            friction: 3,
          }
        )
         
     ]).start()
  }
 componentDidMount() {
  this.startAnimation()
  console.log("componentDidMount");
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});
    console.log('App has come to the foreground!')
  }

  render() {
    return (
        <View style={styles.container}>
          <Animated.View style={{
            backgroundColor: "orange",
            top:             this.state.springValue, 
            left:            200,
            width:           this.state.width, 
            height:          100,
            opacity:         this.state.fadeAnim
            // transform:    [
            //     {
            //       scale: this.state.bounceValue
            //     }
            // ]
          }}
            />
        </View>
    );
  }
}
