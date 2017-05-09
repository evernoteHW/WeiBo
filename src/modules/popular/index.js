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
  Modal,
  Easing,
} from 'react-native';
import { screenWidth, screenHeight } from '../../constants'
import styles from './styles.js';
import { StackNavigator } from 'react-navigation';
import PopularConfigure from '../../common/popularConfigure'
import Popover from '../../common/Popover'
import DataRepository from '../../common/network'
import WeiBoContentCell from '../WeiBoContentCell'
import StatusesModel from '../../model/StatusesModel'
import WeiBoUserModel from '../../model/WeiBoUserModel'
import Storage from '../../common/Storage'

var storage        = new Storage()

var RNNativeBridgeModule = NativeModules.RNNativeBridgeModule;
var dataRepository = new DataRepository()

export default class Popular extends Component {

    constructor(props) {
      super(props);
      this.state = {
        refreshing:       false,
        no_attention:     false,
        rotate:           new Animated.Value(0),
        scale:            new Animated.Value(1),
        image_left:       new Animated.Value(0),
        image_top:        new Animated.Value(0),
        showImageBrowser: false,
        currentAppState:  AppState.currentState,
        isVisible:        false,
        buttonRect:       {},
        listData:         [],
      };
    }

    static navigationOptions = ({navigation}) => {
       return {
          headerTitle:   '首页',
          headerVisible: true,
          headerRight:   (
              <TouchableOpacity 
                    style={{justifyContent:'center', alignItems: 'center',marginRight: 7, height:30 ,width: 58}} 
                     onPress={() => navigation.state.params.rightAction()}
                     >
                    <Text style={{fontSize:16, color:"rgb(253,169,70)"}}>登录</Text>
              </TouchableOpacity>
            ),
            headerTintColor: 'orange',//文字颜色
            headerStyle:     {backgroundColor: 'white'},
          }
      }
    rightAction(){
        RNNativeBridgeModule.RNInvokeOCCallBack({}, (error,events) => {
          if (!error) {
            storage.setItem('WBAuthorizeResponse',JSON.stringify(events))
            this._requstData()
          }
        })
    }
    _requstData(){
        this.setState({refreshing: true})
        dataRepository.fetchNetRepository('https://api.weibo.com/2/statuses/home_timeline.json', {
            count:        50,
            page:         1,
        }).then((json) => {
            this.convertJsonToModel(json)
        })
    }
    convertJsonToModel(json){
      var jsonModels = []
      for (let i = 0; i < json.statuses.length; i++) {
        let item = json.statuses[i]
        let model = new StatusesModel(item)
        jsonModels.push(model)
      }
      this.setState({
        listData:     jsonModels,
        refreshing:   false,
        no_attention: true,
      })
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
       this._requstData()
    }
    renderItem({item, index}) {
        return( <WeiBoContentCell item={item} /> )
    }
     _itemSeparatorComponent(){
      return (
          <View style = {{flex:1,height:10}}>
          </View>
        )
    }
    _rendNoAttention(){
      return (
           <View style = {{alignItems: 'center'}}>
              <Image source = {require('../../resources/image/home/visitordiscover_feed_image_house.png')}/>
              <Text style = {{fontSize:14, color:'#999999',marginTop: 40}}>关注一些人，回这里看看有什么惊喜</Text>
              <TouchableOpacity 
                  style={{justifyContent:'center', alignItems: 'center',backgroundColor:'white',marginTop: 40, height: 40, width: 100, borderWidth: 1, borderColor:'rgb(213,213,213)', borderRadius: 2}} 
                   onPress = {() => navigate('ImageBrowser', {user: '123'})}
                   >
                  <Text style = {{fontSize:15, color:'rgb(253,169,70)'}}>去关注</Text>
              </TouchableOpacity>
          </View>
     )
    }
    _onRefresh(){
      this.setState({refreshing: true})
      this._requstData()
    }
    _rendAttentionList(){
      return(
        <FlatList
        style                            = {[{backgroundColor: 'rgb(242,242,242)', width: '100%'},{}]}
        data                             = {this.state.listData}
        renderItem                       = {this.renderItem.bind(this)}
        ItemSeparatorComponent           = {this._itemSeparatorComponent}
        onRefresh                        = {this._onRefresh.bind(this)}
        refreshing                       = {this.state.refreshing}
        automaticallyAdjustContentInsets = {false}
      />
    )
  }
  render() {

    return (
        <View style = {styles.container}>
        { this.state.no_attention ? this._rendAttentionList() : this._rendNoAttention() }
        </View>
    );
  }
}
