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
  Alert,
  AppState,
  NativeModules,
} from 'react-native';

import styles from './styles.js';
import { StackNavigator } from 'react-navigation';
import PopularConfigure from '../../common/popularConfigure'
import Popover from '../../common/Popover'
import DataRepository from '../../common/network'

var AppDelegate = NativeModules.AppDelegate;
var dataRepository = new DataRepository()

export default class Popular extends Component {

    constructor(props) {
      super(props);
      this.state = {
        currentAppState: AppState.currentState,
        isVisible: false,
        buttonRect: {},
        listData: [{'key':'Sort Key'}, 
                   {'key':'Custom Key'}, 
                   {'key':'Remove Key'}, 
                   {'key':'Theme'},
                   {'key':'About Author'},
                   {'key':'FeedBack'}],
      };
    }

    static navigationOptions = ({navigation}) => {

        return {
          headerTitle: '首页',
          headerVisible: true,
          headerRight: (
              <TouchableOpacity 
                    style={{justifyContent:'center', alignItems: 'center',marginRight: 7, height:30 ,width: 58}} 
                     onPress={() => navigation.state.params.rightAction()}
                     >
                    <Text style={{fontSize:16, color:"rgb(253,169,70)"}}>登录</Text>
              </TouchableOpacity>
          ),
          headerTintColor : 'orange',//文字颜色
          headerStyle: {backgroundColor: 'white'}
        }
    }
  rightAction(){
    // this.refs.toast.show()
    // this.showPopover()
    
  }


  showPopover() {
      this.setState({
        isVisible: true,
        buttonRect: {x: 0, y: 100, width: 300, height: 30}
      });
  }

  closePopover() {
    this.setState({isVisible: false});
  }

  componentDidMount() {
     this.props.navigation.setParams({ rightAction: this.rightAction.bind(this)});
  }
  render() {
   
    return (
        <View style = {styles.container}>
          <View style = {{alignItems: 'center'}}>
            <Image source = {require('../../resources/image/home/visitordiscover_feed_image_house.png')}/>
            <Text style = {{fontSize:14, color:'#999999',marginTop: 40}}>关注一些人，回这里看看有什么惊喜</Text>
            <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',backgroundColor:'white',marginTop: 40, height: 40, width: 100, borderWidth: 1, borderColor:'rgb(213,213,213)', borderRadius: 2}} 
                 onPress = {() => navigation.state.params.onSettingButtonPress(navigation)}
                 >
                <Text style = {{fontSize:15, color:'rgb(253,169,70)'}}>去关注</Text>
            </TouchableOpacity>
          </View>
          <PopularConfigure ref = 'toast' listData = {this.state.listData} placement = 'ANCHOR_TOP_RIGHT'/>
           <Popover
              isVisible = {this.state.isVisible}
              fromRect  = {this.state.buttonRect}
              onClose   = {this.closePopover.bind(this)} 
              placement = 'top'>
              <Text>I'm the content of this popover!</Text>
           </Popover>
        </View>
    );
  }
}
