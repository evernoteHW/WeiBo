
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
  ScrollView,
  Button,
  Image,
  FlatList,
  SectionList,
} from 'react-native';

import { screenWidth, screenHeight } from '../../constants'
import { NavigationActions } from 'react-navigation'
import DataRepository from '../../common/network'
import Storage from '../../common/Storage'
import WeiBoUserModel from '../../model/WeiBoUserModel'

var dataRepository = new DataRepository()
var storage        = new Storage()

const navigateAction = NavigationActions.navigate({
  routeName: 'Setting',
  params:    {},
  action:    NavigationActions.navigate({ routeName: 'Setting'})
})


export default class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userModel: undefined,
      listData: [
              {data: [
                  {title: '新的好友',subTitle:'',url: require('../../resources/image/mine/mine_addfriends.png')},
                  {title: '新手任务',subTitle:'完成任务，抽取大奖',url: require('../../resources/image/mine/mine_rengwu.png')}
                ]
                ,key: '0'
              },
              {data: [
                {title: '我的相册',subTitle:'',url: require('../../resources/image/mine/mine_dianping.png')},
                {title: '我的点评',subTitle:'',url: require('../../resources/image/mine/mine_photos.png')},
                {title: '我的赞',subTitle:'收藏，移到这里了',url: require('../../resources/image/mine/mine_prise.png')}],
                  key: '1'
                },
              {data: [
                {title: '微博钱包',subTitle:'一秒钟爱上文字',url: require('../../resources/image/mine/mine_money.png')},
                {title: '微博运动',subTitle:'夏日我要腰，赢美腰神器',url: require('../../resources/image/mine/mine_yundong.png')},
                {title: '免流量',subTitle:'微博微卡',url: require('../../resources/image/mine/mine_liuliang.png')}],
                key: '2'},
              {data: [
                  {
                    title: '草稿箱',subTitle:'',url: require('../../resources/image/mine/mine_caogaoxiang.png')
                  }
                ],
              key: '3'},
        ],
    }
  }
   static navigationOptions = ({navigation}) => {

        return {
          headerTitle: '我',
          headerVisible: true,
          headerRight: (
              <TouchableOpacity 
                    style={{justifyContent:'center', alignItems: 'center',marginRight: 7, height:30 ,width: 58}} 
                     onPress={() => navigation.state.params.onSettingButtonPress()}
                     >
                    <Text style={{fontSize:16, color:"rgb(253,169,70)"}}>登录</Text>
              </TouchableOpacity>
          ),
          headerTintColor : 'orange',//文字颜色
          headerStyle: {backgroundColor: 'white'}
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
      this.props.navigation.setParams({ onSettingButtonPress: this.onSettingButtonPress.bind(this) });
      this._requstData()
    }
    onSettingButtonPress(navigation){
        /*第一种方式 Push*/
        // navigation.navigate('Setting', {user: 'Lucy'})
        /*第二种方式 Push*/
        // navigation.dispatch(navigateAction)
        
    }
     _requstData(){
        storage.getItem('WeiBoUserUID').then((data) =>{
            dataRepository.fetchNetRepository('https://api.weibo.com/2/users/show.json', {
                uid: data
            }).then((json) => {
                this.convertJsonToModel(json)
            })
        })
      }
      convertJsonToModel(json){
        // WeiBoUserModel
        // console.log(`.......${json}`);
        this.setState({userModel: new WeiBoUserModel(json)})

      }
    /**
     * 登陆
     * @return {[type]} [description]
     */
    onLoginButtonPress(navigate){
      navigate('Register', {user: 'Lucy'})
      console.log("登陆");
    }
    /**
     * 注册
     * @return {[type]} [descripnavigation.navigate('Register', {user: 'Lucy'})tion]
     */
    onRegisterButtonPress(navigate){
      navigate('Register', {user: 'Lucy'})
      // navigation.navigate('Register', {user: 'Lucy'})
      console.log("注册");
    }
    renderItem = ({item, index}) =>{
      return( 
          <TouchableOpacity style={{backgroundColor: 'white', flexDirection: 'row', height: 44,alignItems: 'center'}}>
            <Image 
              source = {item.url} 
              style  = {{width: 20, height: 20,marginLeft: 10}}
            />
            <Text style = {{marginLeft: 10, fontSize: 14}}>{item.title}</Text>
            <Text style = {{marginLeft: 5, color: 'gray', fontSize: 12}}>{item.subTitle}</Text>
          </TouchableOpacity>
      )
    }
    _listHeaderComponent = () =>{
      if(typeof this.state.userModel == "undefined"){ return null }
      return (
        <View>
          <View style={{marginBottom: 1, marginTop: 10, flexDirection: 'row',alignItems:'center',backgroundColor:'white'}}>
            <Image 
              source = {{url: this.state.userModel.profile_image_url}} 
              style  = {{width: 60, height: 60,marginTop: 10,marginBottom: 10,marginLeft: 10, backgroundColor: 'orange', borderRadius:30}}
            />
            <View style={{marginLeft: 10}}>
              <Text>{this.state.userModel.screen_name}</Text>
              <Text style={{marginTop: 5}}>简介:暂无介绍</Text>
            </View>
    
          </View>
           <View style={{ flexDirection: 'row',backgroundColor:'white',marginBottom: 10}}>
              <TouchableOpacity style={{flex: 3,height: 40,justifyContent:'center',alignItems:'center',marginBottom: 5,marginTop: 5}}>
                  <Text>{this.state.userModel.statuses_count}</Text>
                  <Text>微博</Text>
              </TouchableOpacity>
               <TouchableOpacity style={{flex: 3,height: 40,justifyContent:'center',alignItems:'center',marginBottom: 5,marginTop: 5}}>
                  <Text>{this.state.userModel.friends_count}</Text>
                  <Text>关注</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex: 3,height: 40,justifyContent:'center',alignItems:'center',marginBottom: 5,marginTop: 5}}>
                  <Text>{this.state.userModel.followers_count}</Text>
                  <Text>粉丝</Text>
              </TouchableOpacity>
            </View>
        </View>
      )
    }
    _sectionSeparatorComponent = () =>{
      return( <View style={{flex:1,height:10}} /> )
    }
    _itemSeparatorComponent = () =>{
      return( <View style={{flex:1,height:1}} /> )
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>
            <SectionList 
                style                     = {[{backgroundColor: 'rgb(242,242,242)', width: '100%'},{}]}
                sections                  = {this.state.listData}
                renderItem                = {this.renderItem}
                keyExtractor              = {(item,index) => `${index}`}
                SectionSeparatorComponent = {this._sectionSeparatorComponent}
                ItemSeparatorComponent    = {this._itemSeparatorComponent}
                ListHeaderComponent       = {this._listHeaderComponent}
            />
          </View>
          
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    // flexDirection:  'row',
    backgroundColor: 'rgb(247,247,242)',
  },
  contentContainer: {
    // position:           'absoulute',
    // // width:              '100%',
    // left : 0,
    // right: 0,
    // bottom: 0,
    // top: 100,
    // resizeMode:         'cover'
    // paddingBottom:   49,
    // height: screenHeight - 49 - 64,
    // backgroundColor: 'red',
  },
  headerBg:{
    // flex:       1,
    // resizeMode: 'cover',
    // alignSelf:  'auto',
    // width:      '100%',
    // height:     300,
    // flex:       1,
    width:           "100%",
    height:          '100%',
    backgroundColor: '#123456', 
  },
  header:{
    justifyContent:  'center', 
    alignItems:      'center',
    height:          200
  },
  headerIcon:{
    left:         (screenWidth - 80)/2.0,
    position:     'absolute', 
    width:        80,
    height:       80,
    borderRadius: 40,
    backgroundColor: '#123456',
  },
  loginBtn: {
    justifyContent: 'center', 
    alignItems:     'center',
    marginLeft:     7, 
    height:         30 ,
    width:          100, 
    marginLeft:     10, 
    borderWidth:    0.5,
    borderColor:    '#999999'
  },
  registerBtn: {
    justifyContent: 'center', 
    alignItems:     'center',
    marginRight:    10, 
    height:         30 ,
    width:          100, 
    borderWidth:    0.5, 
    borderColor:    '#999999'
  },
  instructions: {
    textAlign:    'center',
    color:        '#333333',
    marginBottom: 5,
  },
});
