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
} from 'react-native';
import testdata from './home_test.json'
import styles from './styles.js'

const CustomSeparatorComponent = ({text}) => (
  <View>
    <SeparatorComponent />
    <Text style={styles.separatorText}>{text}</Text>
    <SeparatorComponent />
  </View>
);

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
var THUMB_URLS = [
  require('../../resources/image/home/home_banner1242X882.jpg'),
  require('../../resources/image/home/PJ-ICON.png'),
  require('../../resources/image/home/安全保障icon.png'),
  require('../../resources/image/home/新手礼包icon.png'),
];
export default class Finance extends Component {
  constructor(props) {
    super(props);
    // var ds = new FlatList.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {flatlistdata: testdata};
  }
  // 返回一个Item IOS叫做Cell
  _renderItem = ({item}) => {
    return(
      <View style={styles.itemComponent}>
            <Text style={styles.leftPercent}>{item.percent}</Text>
            <Text style={styles.rightPercent}>{item.day}天</Text>
            <Text style={styles.leftTipTitle}>预期年化收益率</Text>
            <Text style={styles.rightTipTitle}>期限</Text>
      </View>
    )
  }
  _headerComponent = ({item}) => {
    return(
         <View style={styles.headerComponent}>
               <Image style={{alignSelf:'center', resizeMode: 'cover', height: 280}} source={THUMB_URLS[0]} />
               <View style={styles.whiteShadow}>
                 <View style={{flex: 3}}>
                   <Image style={{marginTop: 10, alignSelf:'center'}} source={THUMB_URLS[1]} />
                   <Text style={styles.headerText} >品牌介绍</Text>
                   <Text style={{color:'#666666', fontSize:12, alignSelf:'center', marginTop:10}}>专注票据10余年</Text>
                 </View>
                 <View style={{flex: 3}}>
                    <Image style={{marginTop: 10, alignSelf:'center'}} source={THUMB_URLS[2]} />
                    <Text style={styles.headerText} >安全保障</Text>
                    <Text style={{color:'#666666', fontSize:12, alignSelf:'center', marginTop:10}}>八重安全保障</Text>
                 </View>
                 <View style={{flex: 3}}>
                   <Image style={{marginTop: 10, alignSelf:'center'}} source={THUMB_URLS[3]} />
                   <Text style={styles.headerText} >新手有礼</Text>
                   <Text style={{color:'#666666', fontSize:12, alignSelf:'center', marginTop: 5}}>开启第1笔理财</Text>
                 </View>
               </View>
         </View>
    )
  }
  _footerComponent = ({item}) => {
    return(
         <View style={styles.footerComponent}>
           <View style={{backgroundColor:'rgb(241,239,235)', flex: 4, height:1, marginLeft:10, marginRight:5}} />
           <Image source={require('../../resources/image/home/华兴银行存管icon.png')} />
           <Text> 资金由华兴银行存管</Text>
           <View style={{backgroundColor:'rgb(241,239,235)', flex: 4, height:1, marginLeft:5,marginRight:10}} />
         </View>
    )
  }
  _itemSeparatorComponent = ({item}) => {
    return( <View style={{marginLeft: 10, marginRight: 10, backgroundColor:'rgb(241,239,235)', height:0.5}} /> )
  }

 componentDidMount(){

 }
  render() {
    return (

        <View style={styles.container}>
        </View>


    );
  }
}
