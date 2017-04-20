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
  LayoutAnimation
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
      width: 100,
      height: 50,
      blurBgHidden: true
    };
  }
   static navigationOptions = {
      title: '我',
      header: (navigation, defaultHeader) => ({
          headerModel: 'screen',
          model: 'screen',
          visible: false , 
          style: {backgroundColor: null},    //导航栏背景颜色
     }),
  };
  startAnimation() {
    // LayoutAnimation.configureNext({
    //   duration: 500000, //持续时间
    //   create: { // 视图创建
    //       type: LayoutAnimation.Types.spring,
    //       property: LayoutAnimation.Properties.scaleXY,// opacity、scaleXY
    //   },
    //   update: { // 视图更新
    //       type: LayoutAnimation.Types.spring,
    //   },
    // });
    // this.setState({width: this.state.width + 10});
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
          <View style={{backgroundColor:"orange", width: this.state.width, height: 100}}/>
        </View>
    );
  }
}
