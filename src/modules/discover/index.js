
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
} from 'react-native';

const onRegisterButtonPress = () => {
  Alert.alert('Button has been pressed!');
};
const onLoginButtonPress = () => {
  Alert.alert('Button has been pressed!');
};

const itemHeight = 200;

export default class Discover extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: this.getData(0),
            myindex: 1,
        };
    }
     getData(index) {
        var list = [];
        for (let i = 0; i < 20; i++) {
            let imgsource;
            if (i % 5 == 0) {
                imgsource = 'http://photo.l99.com/bigger/01/1417155508319_k38f29.jpg';
            } else if (i % 5 == 1) {
                imgsource = 'http://img.tupianzj.com/uploads/allimg/160411/9-1604110SI5.jpg';

            } else if (i % 5 == 2) {
                imgsource = 'http://img.tupianzj.com/uploads/allimg/160411/9-1604110SH4.jpg';

            } else if (i % 5 == 3) {
                imgsource = 'http://img.tupianzj.com/uploads/allimg/160411/9-1604110SH6.jpg';

            } else if (i % 5 == 4) {
                imgsource = 'http://img.tupianzj.com/uploads/allimg/160411/9-1604110SH7.jpg';

            }
            list.push({title: 'title' + (i + (index * 20)), key: 'key' + (i + (index * 20)), imgsource: imgsource});
        }
        return list;
    }


   static navigationOptions = {
      header: (navigation, defaultHeader) => ({
          ...defaultHeader,
          visible: true , // 覆盖预设中的此项
          style: { backgroundColor: 'white'},
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
  //ListView Setting

  renderItem({item, index}) {
    return(
        <View style={{flex: 1, width: '100%'}}>
          <View style={{backgroundColor:'white',flexDirection: 'row'}}>
            <Image 
              source = {require('../../resources/image/mine/page_cover_tv_background.jpg')}
              style  = {{
                marginLeft:   10, 
                width:        50, 
                height:       50, 
                marginBottom: 10, 
                marginTop:    10,
                borderRadius: 25,}} 
            />
            <View style={{flexDirection: 'column', flex: 1, justifyContent: 'center'}}>
                <Text style={{marginLeft: 10, color: '#333333'}}>新浪娱乐</Text>
                <Text style={{marginLeft: 10, marginTop: 5, color: '#999999'}}>6小时前 来自微博</Text>
            </View>
            <View style={{justifyContent:'center', alignItems: 'center'}}>
              <TouchableOpacity 
                style={{
                  justifyContent:  'center', 
                  alignItems:      'center',
                  marginRight:     7, 
                  marginLeft:      7, 
                  height:          30 ,
                  width:           80,
                  borderRadius:    3,
                  borderWidth:     1,
                  borderColor:     'rgb(225,225,225)',
                  backgroundColor: 'rgb(247,247,242)'}}
                 >
                <Text style={{fontSize:16, color:"orange"}}>+关注</Text>
              </TouchableOpacity>

            </View>
          </View>

          <View style={{backgroundColor:'white'}}>
            <View style={{marginLeft: 10, marginRight: 10, marginBottom: 10}}>
               <Text > Better ListView - FlatList
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
   
          </View>

          <View style={{
             backgroundColor: 'white', 
             width:           '100%',
             flexDirection:   'row',
             borderTopWidth:  1, 
             borderColor:     'rgb(225,225,225)'}}>
              {this._renderBottomItemView(require('../../resources/image/discover/statusdetail_icon_retweet.png'),'9988')}
              {this._renderBottomItemView(require('../../resources/image/discover/timeline_icon_comment.png'),'9988')}
              {this._renderBottomItemView(require('../../resources/image/discover/timeline_icon_unlike.png'),'2万')}
          </View>

        </View>
     )
  }
  _renderBottomItemView(source,text){
    return (
      <TouchableOpacity 
          style={{
            flexDirection:    'row',
            justifyContent:   'center', 
            alignItems:       'center',
            height:           30 ,
            flex:             3,
            marginTop:        10,
            marginBottom:     10,
            borderColor:      'rgb(225,225,225)',
            borderRightWidth: 1,}}
           >
            <Image 
              source = {source}
              style  = {{
                marginRight: 4,
                marginTop:   1, 
                width:       20, 
                height:      20, 
              }} 
            />
          <Text style={{fontSize:16, color:"#999999"}}>{text}</Text>
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
              data                   = {[{key: 'a'}, {key: 'b'}]}
              renderItem             = {this.renderItem.bind(this)}
              ItemSeparatorComponent = {this._itemSeparatorComponent}
          />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(247,247,242)',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
