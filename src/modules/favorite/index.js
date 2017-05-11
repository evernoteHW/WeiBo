
'use strict'
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
  NativeModules,
} from 'react-native';

import { screenWidth, screenHeight } from '../../constants'

import StatusesModel from '../../model/StatusesModel'
import WeiBoUserModel from '../../model/WeiBoUserModel'
import TimerUIUtiles from '../../UIUtils/TimerUIUtils'

import DataRepository from '../../common/network'
import WeiBoContentCell from '../WeiBoContentCell'
import Storage from '../../common/Storage'

var RNNativeBridgeModule = NativeModules.RNNativeBridgeModule;
var dataRepository = new DataRepository()
var storage        = new Storage()
var timerUIUtiles  = new TimerUIUtiles()

const onRegisterButtonPress = () => {
  Alert.alert('Button has been pressed!');
};
const onLoginButtonPress = () => {
  Alert.alert('Button has been pressed!');
};


export default class Favorite extends Component {

    constructor(props) {
        super(props);
        this.state = {
          listData: [],
          refreshing: false
        };
    }
    static navigationOptions = ({navigation}) => {

        return {
          headerTitle: (
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity 
              style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
              onPress={onRegisterButtonPress}>
                  <Text style={{fontSize:16, color:"#333333"}}>热门</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
                onPress={onRegisterButtonPress}>
                  <Text style={{fontSize:16, color:"#333333"}}>明星</Text>
              </TouchableOpacity>
            </View>),
          headerLeft: (
              <TouchableOpacity 
                    style={{justifyContent:'center', alignItems: 'center',marginRight: 7, height:30 ,width: 58}} 
                     onPress={() => navigation.state.params.rightAction()}
                     >
                    <Text style={{fontSize:16, color:"rgb(253,169,70)"}}>登录</Text>
              </TouchableOpacity>
          ),
          headerRight: (
              <TouchableOpacity 
                    style={{justifyContent:'center', alignItems: 'center',marginRight: 7, height:30 ,width: 58}} 
                     onPress={() => navigation.state.params.rightAction()}
                     >
                    <Text style={{fontSize:16, color:"rgb(253,169,70)"}}>登录</Text>
              </TouchableOpacity>
          ),
          headerStyle: {backgroundColor: 'white'}
        }
    }
    componentWillMount() {
     
    }
    onRegisterButtonPress(e){
        console.log("1111");
    };
    onLoginButtonPress(e){
        console.log("2222");
    };

    componentDidMount() {
      this._requstData()
    }
    _requstData(){
      this.setState({refreshing: true})
      //存本地
      dataRepository.fetchNetRepository('https://api.weibo.com/2/statuses/public_timeline.json',
        {
          count:        5,
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
        listData:   jsonModels,
        refreshing: false,
      })
    }

    renderItem({item, index}) {
        return( <WeiBoContentCell item={item} /> )
    }

 
  _listFooterComponent() {
      return (
        <View style = {{flex:1,height:70,justifyContent:'center',alignItems:'center'}}>
          <Text>上啦加载更多</Text>
        </View>
        )
  }
  _listHeaderComponent(){
    return (
        <View style={{backgroundColor: 'rgb(229,229,229)', height: 45,flex: 1}}>
          <TextInput 
            style       = {styles.listHeaderTextInput}
            editable    = {true}
            placeholder = 'Useless Multiline Placeholder'
          />
        </View>
    )
  }
  _itemSeparatorComponent(){
    return (
        <View style = {{flex:1,height:10}}>
        </View>
      )
  }
  _onRefresh(){
    
    console.log('正在刷鞋');
  }
  _onEndReached(){
    console.log('加载更多。。。。');
  }
  render() {
    return (
      <View style={styles.container}>
          <FlatList
              style                            = {{backgroundColor: 'rgb(242,242,242)', width: '100%'}}
              data                             = {this.state.listData}
              renderItem                       = {this.renderItem.bind(this)}
              ItemSeparatorComponent           = {this._itemSeparatorComponent}
              ListHeaderComponent              = {this._listHeaderComponent}
              onRefresh                        = {this._onRefresh.bind(this)}
              refreshing                       = {this.state.refreshing}
              automaticallyAdjustContentInsets = {false}

          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    justifyContent:  'center',
    alignItems:      'center',
    backgroundColor: 'rgb(247,247,242)',
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
});
