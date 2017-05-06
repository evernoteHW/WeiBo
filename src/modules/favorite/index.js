
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
var AppDelegate = NativeModules.AppDelegate;
import StatusesModel from '../../model/StatusesModel'
import WeiBoUserModel from '../../model/WeiBoUserModel'

const BottomSetting = [
    {
      icon:  require('../../resources/image/discover/statusdetail_icon_retweet.png'),
      title: '888',
    },{
      icon:  require('../../resources/image/discover/statusdetail_icon_retweet.png'),
      title: '888',
    },{
      icon:  require('../../resources/image/discover/statusdetail_icon_retweet.png'),
      title: '888',
    },
];

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
          listData: []
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
          headerTintColor : 'white',//文字颜色
          headerStyle: {backgroundColor: 'rgb(0,185,80)'}
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
       AppDelegate.RNInvokeOCCallBack({'key':'login'}, (error,events) => {
          if (!error) {
              let url = `https://api.weibo.com/2/statuses/public_timeline.json?access_token=${events.accessToken}`
              fetch(url,{
                method: 'GET',
              }).then((response) => {
                if (response.ok) {
                  return response.json()
                }
              }).then((json)=>{
                this.convertJsonToModel(json)
              }).catch((error) =>{
                  console.log(error);
              })
          }

      });
    }
    convertJsonToModel(json){
      var jsonModels = []
      for (let i = 0; i < json.statuses.length; i++) {
        let item = json.statuses[i]
        let model = new StatusesModel(item)
        jsonModels.push(model)
      }
      this.setState({
        listData:  jsonModels
      })
    }

    renderItem({item, index}) {
    const seperaWidth = 2;
    return(
        <View style = {{flex: 1, width: '100%'}}>
            {this._renderHeaderViewItemView(item)}
            {this._rendContentView(item)}
            {this._renderImaegsView(item)}
          <View style = {styles.bottom}>
              {this._renderBottomItemView(require('../../resources/image/discover/statusdetail_icon_retweet.png'),'9988')}
              {this._renderBottomItemView(require('../../resources/image/discover/timeline_icon_comment.png'),'9988')}
              {this._renderBottomItemView(require('../../resources/image/discover/timeline_icon_unlike.png'),'2万')}
          </View>

        </View>
     )
  }

  _renderImaegsView(item){
    const { gif_ids_array_url } = item
    if (gif_ids_array_url && gif_ids_array_url.length > 0) {
        return (
         <View style = {{backgroundColor: 'white'}}>
             <FlatList
                  style      = {styles.itemImageContetent}
                  data       = {gif_ids_array_url}
                  renderItem = {({sub_item,sub_index}) => 
                    <Image
                     style  = {{width: (screenWidth - 10 - 2)/3.0,height: (screenWidth - 10 - 2)/3.0,backgroundColor: 'orange',marginRight: 1,marginTop: 1}}
                     source = {{url: sub_item}}
                     >
                     <Text>{sub_item} ......{sub_index}</Text>
                    </Image>
                  }
                  numColumns = {3}
              />

         </View>
      )
    }else{
      return null
    }
    
  }
  _rendContentView(item){
    return (
      <View style={{backgroundColor:'white'}}>
         <Text style={{marginLeft: 10, marginRight: 10, marginBottom: 10,}}>
          {item.text}
         </Text>
       </View>
    )
  }
  _renderHeaderViewItemView(item){
    return (
         <View style={{backgroundColor:'white',flexDirection: 'row'}}>
            <Image source = {{url: item.user.profile_image_url}} style={styles.headerIcon} />
            <View style={{flexDirection: 'column', flex: 1, justifyContent: 'center'}}>
                <Text style={styles.headerTitle}>{item.user.screen_name}</Text>
                <Text style={styles.headerSubTitle}>6小时前 来自{item.source}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems: 'center'}}>
              <TouchableOpacity style={styles.headerAttention}>
                <Text style={{fontSize:16, color:"orange"}}>+关注</Text>
              </TouchableOpacity>
            </View>
          </View>
    )
  }
  _renderBottomItemView(source,text){
    return (
      <TouchableOpacity style={styles.bottomItemView}>
          <Image source = {source} style  = {styles.bottomItemView_icon} />
          <Text style   = {{fontSize:16, color:"#999999"}}>{text}</Text>
      </TouchableOpacity>
    )
  }
  _listFooterComponent() {
      return (
        <View style={{flex:1,height:70,justifyContent:'center',alignItems:'center'}}>
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
        <View style={{flex:1,height:10}}>
        </View>
      )
  }

  render() {
    return (
      <View style={styles.container}>
          <FlatList
              style                  = {{backgroundColor: 'rgb(242,242,242)', width: '100%'}}
              data                   = {this.state.listData}
              renderItem             = {this.renderItem.bind(this)}
              ItemSeparatorComponent = {this._itemSeparatorComponent}
              ListHeaderComponent    = {this._listHeaderComponent}
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
