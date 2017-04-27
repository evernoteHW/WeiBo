
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
  TextInput,
  RefreshControl,
  Animated,
} from 'react-native';

import { screenWidth, screenHeight } from '../constants'

export default class PopularConfigure extends Component {

    constructor(props) {
        super(props);
        console.log('dafadfad');
        this.state = {
          listData:   [{'key':'Sort Key'}, 
                       {'key':'Custom Key'}, 
                       {'key':'Remove Key'}, 
                       {'key':'Theme'},
                       {'key':'About Author'},
                       {'key':'FeedBack'}],
          refreshing: false,
          bounceValue:  new Animated.Value(1),
          decayValue:   new Animated.Value(400),
          fadeAnim:     new Animated.Value(1), 
          springValue:  new Animated.Value(400),
        };
   }

  componentDidMount() {
      console.log('dafadfad');
  }

   // startAnimation() {
  //   //弹跳动画
   
  //    Animated.sequence([

  //        Animated.spring(
  //        this.state.springValue,
  //         {
  //           toValue:  80,
  //           friction: 3,
  //         }
  //       )
         
  //    ]).start()

  // }
  // <Animated.View style={{
  //           backgroundColor: "orange",
  //           top:             this.state.springValue, 
  //           left:            200,
  //           width:           this.state.width, 
  //           height:          100,
  //           opacity:         this.state.fadeAnim
  //           // transform:    [
  //           //     {
  //           //       scale: this.state.bounceValue
  //           //     }
  //           // ]
  //         }}
  //           />

  renderItem({item, index}) {
      return(
        <View >
          <Text style = {{marginBottom: 2.5, marginTop: 5,marginRight: 10,marginLeft: 10,color: 'white',textAlign: 'center',width: 100}}>
            {item.key}
          </Text>
        </View>
     )
  }
  render() {
    return (
      <View style={styles.container}>
          <FlatList
              style                  = {{left: screenWidth - 20 - 120,top:64 ,backgroundColor: 'rgba(0,0,0,0.8)',width: 120, height: 160, borderRadius:5}}
              data                   = {this.state.listData}
              renderItem             = {this.renderItem.bind(this)}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex:            1,
    justifyContent:  'flex-end',
    // alignItems:      'center',
    // backgroundColor: 'rgb(247,247,242)',
  },
  welcome: {
    fontSize:  20,
    textAlign: 'center',
    margin:    10,
  },
  listHeaderTextInput: {
    backgroundColor: 'white',
    flex:            1, 
    marginLeft:      10,
    marginRight:     10, 
    marginTop:       10, 
    marginBottom:    10,
    borderRadius:    2,
    fontSize:        14,
  },
  headerIcon:{
    marginLeft:   10, 
    width:        50, 
    height:       50, 
    marginBottom: 10, 
    marginTop:    10,
    borderRadius: 25,
  },
  headerTitle:{
   marginLeft: 10,
   color:      '#333333',
  },
  headerSubTitle:{
    marginLeft: 10, 
    marginTop:  5, 
    color:      '#999999',
  },
  headerAttention:{
    justifyContent:  'center', 
    alignItems:      'center',
    marginRight:     10, 
    marginLeft:      10, 
    height:          30 ,
    width:           80,
    borderRadius:    3,
    borderWidth:     1,
    borderColor:     'rgb(225,225,225)',
    backgroundColor: 'rgb(247,247,242)',
  },
  itemImageContetent:{
    // marginTop:       5,
    marginBottom:    10,
    marginLeft:      10,
    marginRight:     10,
    backgroundColor: 'white',
  },
  bottom:{
    backgroundColor: 'white', 
    width:           '100%',
    flexDirection:   'row',
    borderTopWidth:  1, 
    borderColor:     'rgb(225,225,225)',
  },
  bottomItemView: {
    flexDirection:    'row',
    justifyContent:   'center', 
    alignItems:       'center',
    height:           30 ,
    flex:             3,
    marginTop:        10,
    marginBottom:     10,
    borderColor:      'rgb(225,225,225)',
    borderRightWidth: 1,
  },
  bottomItemView_icon: {
      marginRight: 4,
      marginTop:   1, 
      width:       20, 
      height:      20, 
  },
});
