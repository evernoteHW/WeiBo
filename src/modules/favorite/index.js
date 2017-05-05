
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
} from 'react-native';

import { screenWidth, screenHeight } from '../../constants'



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
          listData: [{key: 'a'}, {key: 'b'},{key: 'c'},{key: 'd'},
          {key: 'e'}, {key: 'f'},{key: 'g'},{key: 'h'},
          {key: 'i'}, {key: 'j'},{key: 'k'},{key: 'm'},]
        };
    }
  
   static navigationOptions = {
      header: (navigation, defaultHeader) => ({
          ...defaultHeader,
          visible: true , // 覆盖预设中的此项
          style: { backgroundColor: 'rgb(0,185,80)'},
          title: (
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
          visible: {true},
          left: (
              <TouchableOpacity 
              style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
              onPress={onRegisterButtonPress}>
                  <Text style={{fontSize:16, color:"rgb(253,169,70)"}}>注册</Text>
              </TouchableOpacity>
            ),
          right: (
              <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
                onPress={onRegisterButtonPress}>
                  <Text style={{fontSize:16, color:"rgb(253,169,70)"}}>登录</Text>
              </TouchableOpacity>
          ),
     }),
    cardStack: {
       gesturesEnabled: false  // 是否可以右滑返回
    }
  };
    componentWillMount() {
     
    }
    onRegisterButtonPress(e){
        console.log("1111");
    };
    onLoginButtonPress(e){
        console.log("2222");
    };

    viewWillAppear(){
      console.log('home_viewWillAppear');
    }
    viewDidAppear(){
      console.log('home_viewDidAppear');
    }
    viewWillDisAppear(){
      console.log('discover_viewWillDisAppear');
    }
    viewDidDisAppear(){
      console.log('home_viewDidDisAppear');
    }
    componentDidMount() {
      console.log('discover_componentDidMount');
       this.props.navigation.setParams({
          viewWillAppear:       this.viewWillAppear,
          viewDidAppear:        this.viewDidAppear,
          viewWillDisAppear:    this.viewWillDisAppear,
          viewDidDisAppear:     this.viewDidDisAppear,
      });
    }

  renderItem({item, index}) {
    const seperaWidth = 2;
    return(
        <View style={{flex: 1, width: '100%'}}>
            {this._renderHeaderViewItemView()}
            {this._rendContentView()}
            {this._renderImaegsView()}
          <View style={styles.bottom}>
              {this._renderBottomItemView(require('../../resources/image/discover/statusdetail_icon_retweet.png'),'9988')}
              {this._renderBottomItemView(require('../../resources/image/discover/timeline_icon_comment.png'),'9988')}
              {this._renderBottomItemView(require('../../resources/image/discover/timeline_icon_unlike.png'),'2万')}
          </View>

        </View>
     )
  }

  _renderImaegsView(){
    return (
       <View style = {{backgroundColor: 'white'}}>
             <FlatList
                  style      = {styles.itemImageContetent}
                  data       = {[{key: 'a'}, {key: 'b'},{key: 'b'},{key: 'd'}]}
                  renderItem = {({item}) => 
                    <Image
                     style  = {{width: (screenWidth - 10 - 2)/3.0,height: (screenWidth - 10 - 2)/3.0,backgroundColor: 'orange',marginRight: 1,marginTop: 1}}
                     source = {require('../../resources/image/mine/page_cover_tv_background.jpg')}
                     >
                    </Image>}
                  numColumns = {3}
              />
          </View>
    )
  }
  _rendContentView(){
    return (
      <View style={{backgroundColor:'white'}}>
               <Text style={{marginLeft: 10, marginRight: 10, marginBottom: 10,}}>
                Better ListView - FlatList
               Summary: We really need a better lis
                <Text style={{color:'blue'}}> #话题.</Text>
               t view -...This means that instance stat
               e is not preserved when items scroll out of ...
                  <Text style={{color:'blue'}}> #话题.</Text>
                  Template:FlatlistFrom Wikipedia, the free encyclopediaJump to:
                   navigation, ... any changes to this template should 
                   first be tested in its /sandbox or ...
               </Text>
       </View>
    )
  }
  _renderHeaderViewItemView(){
    return (
         <View style={{backgroundColor:'white',flexDirection: 'row'}}>
            <Image source = {require('../../resources/image/mine/page_cover_tv_background.jpg')} style={styles.headerIcon} />
            <View style={{flexDirection: 'column', flex: 1, justifyContent: 'center'}}>
                <Text style={styles.headerTitle}>新浪娱乐</Text>
                <Text style={styles.headerSubTitle}>6小时前 来自微博</Text>
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
