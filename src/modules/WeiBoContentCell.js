
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
  Animated,
} from 'react-native';

import TimerUIUtiles from '../UIUtils/TimerUIUtils'
import { screenWidth, screenHeight } from '../constants'
import HTMLView from 'react-native-htmlview';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

var timerUIUtiles  = new TimerUIUtiles()

export default class WeiBoContentCell extends Component {
      
     _renderHeaderViewItemView(item){
      let time = timerUIUtiles.formatDateTime1(item.created_at)
      return (
           <View style = {{backgroundColor:'white',flexDirection: 'row'}}>
              <Image source = {{url: item.user.avatar_hd}} style={styles.headerIcon} />
              <View style   = {{flexDirection: 'column', flex: 1, justifyContent: 'center'}}>
                  <Text style = {styles.headerTitle}>{item.user.screen_name}</Text>
                  <View style={{flexDirection: 'row',marginLeft : 10, marginTop: 5}}>
                    <Text>{time}来自</Text>
                     <HTMLView
                        stylesheet = {styles}
                        value      = {item.source}
                      />
                  </View>
             
              </View>
              <View style = {{justifyContent:'center', alignItems: 'center'}}>
                <TouchableOpacity style={styles.headerAttention}>
                  <Text style = {{fontSize:16, color:"orange"}}>+关注</Text>
                </TouchableOpacity>
              </View>
            </View>
      )
    }
    _rendContentView(item,isSub){
      var has_retweeted_status = false
      if ((item.retweeted_status && typeof(item.retweeted_status) !== 'undefined') ) {
        has_retweeted_status = true
      }else{
        has_retweeted_status = false
      }
      return (
        <View style={{backgroundColor:isSub ? 'rgb(242,242,242)': 'white'}}>
           <HTMLView 
            value      = {item.text}
            stylesheet = {styles}
            style={{marginLeft: 10, marginRight: 10, marginBottom: 10, marginTop: isSub?10: 0}}>
            <Text>123</Text>
           </HTMLView> 
           {this._renderImaegsView(item)} 
           {has_retweeted_status ?  this._rendContentView(item.retweeted_status, true): null}
         </View>
      )
    }
    _renderItem({item, index}) {
        return(   
         <Image
             key    = {item}
             style  = {{width: (screenWidth - 10 - 2)/3.0,height: (screenWidth - 10 - 2)/3.0,backgroundColor: 'orange',marginRight: 1,marginTop: 1}}
             source = {{url: item.key}}
          />
       )
    }
    _itemSeparatorComponent(){
      return (
          <View style = {{flex:1,height:1}}>
          </View>
        )
    }
    _renderImaegsView(item){
      const { pic_urls } = item
      if (pic_urls && pic_urls.length > 0) {
          return (
           <AnimatedFlatList
            style                            = {[{left : 5 ,flex: 1},{}]}
            data                             = {pic_urls}
            renderItem                       = {this._renderItem.bind(this)}
            ItemSeparatorComponent           = {this._itemSeparatorComponent}
            numColumns                       = {3}
            automaticallyAdjustContentInsets = {false}
          />
          
        )
      }else{ return null } 
    }
    _renderBottomItemView(source,text){
      return (
        <TouchableOpacity style={styles.bottomItemView}>
            <Image source = {source} style  = {styles.bottomItemView_icon} />
            <Text style   = {{fontSize:16, color:"#999999"}}>{text}</Text>
        </TouchableOpacity>
      )
    }
    render(){
      const { item } = this.props
      return(
            <View style = {{flex: 1, width: '100%'}}>
              {this._renderHeaderViewItemView(item)}
              {this._rendContentView(item,false)}
              <View style = {styles.bottom}>
                  {this._renderBottomItemView(require('../resources/image/discover/statusdetail_icon_retweet.png'),item.reposts_count)}
                  {this._renderBottomItemView(require('../resources/image/discover/timeline_icon_comment.png'),item.comments_count)}
                  {this._renderBottomItemView(require('../resources/image/discover/timeline_icon_unlike.png'),item.attitudes_count)}
              </View>
          </View>
      )
    }
}

WeiBoContentCell.propTypes = {
    item:   React.PropTypes.object,
}
WeiBoContentCell.defaultProps = {

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
  a: {
    fontWeight: '300',
    color: 'cornflowerblue', // make links coloured pink
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
