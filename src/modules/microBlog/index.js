'use strict'
import React, { Component } from 'react'
import {
  Text,
  View,
  SectionList,
  Image,
  Animated,
  Easing,
  Dimensions,
  NavigatorIOS,
  LayoutAnimation,
} from 'react-native';

import styles from './styles.js'

const CustomSeparatorComponent = ({text}) => (
  <View>
    <SeparatorComponent />
    <Text style={styles.separatorText}>{text}</Text>
    <SeparatorComponent />
  </View>
);

export default class MicroBlog extends Component {
  constructor(props) {
    super(props);
    // var ds = new FlatList.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      bounceValue: new Animated.Value(0),
        fadeInOpacity: new Animated.Value(0),
            rotation: new Animated.Value(0),
            fontSize: new Animated.Value(0),
    };
  }
   static navigationOptions = {
      title: '我',
      header: (navigation, defaultHeader) => ({
          // visible: false , 
          style: {backgroundColor: null},    //导航栏背景颜色
     }),
  };
  startAnimation() {

    Animated.parallel(['fadeInOpacity', 'rotation', 'fontSize'].map(property => {
                return Animated.timing(this.state[property], {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            });
        })).start();
  }
  componentDidMount() {
    // your code here
    console.log("componentDidMount"); 
    this.startAnimation()
  }
  componentWillReceiveProps(){
    console.log("componentWillReceiveProps");
  }
  //  shouldComponentUpdate(){
  //   console.log("shouldComponentUpdate");
  //   return true
  // }
   componentWillUpdate(){
    console.log("componentWillUpdate");
  }
   componentDidUpdate(){
    console.log("componentDidUpdate");
  }
  render() {
         return (
          <View style={styles.container}>
            <Animated.View style={[{
              opacity: this.state.fadeInOpacity,
                  transform: [{
                      rotateZ: this.state.rotation.interpolate({
                          inputRange: [0,1],
                          outputRange: ['0deg', '360deg']
                      })
                  }]
              }]}>
                <Animated.Text style={{
                    fontSize: this.state.fontSize.interpolate({
                        inputRange: [0,1],
                        outputRange: [12,26]
                    })
                }}>
                    我骑着七彩祥云出现了:smiling_imp::dash:
                </Animated.Text>
              </Animated.View>
            </View>
    );
       }
}
