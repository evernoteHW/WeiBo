import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    AsyncStorage,
    ScrollView,
    Animated,
    Easing,
} from 'react-native';

const commonConfig = {
  duration: 300,
  easing: Easing.inOut(Easing.quad)
}
export default class HWRefresh extends Component {
    constructor(props) {
        super(props);
        this.state = {
          headTitle:     '下拉刷新',
          rotateZ:       new Animated.Value(0),
          isDownLoading: false,
          isUpLoading:   false,
        }
        this._renderHeaderRefresh.bind(this);
    }
    _onScroll = (e)=>{
      let target = e.nativeEvent;
      let y      = target.contentOffset.y;

      if (y <= -70) {

        if (!this.state.isDownLoading) {
          this.setState({headTitle: '释放更新',isDownLoading: true})
          Animated.timing(this.state.rotateZ, {
            toValue: 1,
            ...commonConfig
          }).start();
        }
      }else{
        if (this.state.isDownLoading) {
          this.setState({headTitle: '下拉更新',isDownLoading: false})
           Animated.timing(this.state.rotateZ, {
            toValue: 0,
            ...commonConfig
          }).start();
        }
          
      }
      let contentSize       = target.contentSize;
      //当前屏幕 宽度和高度
      let layoutMeasurement = target.layoutMeasurement;
      
      if (contentSize.height - layoutMeasurement.height - y < 0) {
        console.log(`//下拉刷新 contentOffset.y == ${contentSize.height - layoutMeasurement.height - y}`)     
      }
      
    }
    _onScrollEndDrag = (e) =>{
        if (this.state.isDownLoading) {
          this.scrollView.scrollTo({x:0,y:-70,animated:true});

          setTimeout(() =>{
            this.scrollView.scrollTo({x:0,y:0,animated:true})
          }, 1000);
          // this.setState({headTitle: '下拉刷新',isDownLoading: false})
        }
    }
    _renderHeaderRefresh(){
        return <Animated.View style={styles.head}>
                  <Animated.Image 
                    source = {require('../resources/image/refresh/messages_audio_downloading_icon.png')}
                    style  = {[
                                styles.head_image,
                                {
                                  transform:
                                  [
                                    {
                                      rotateZ:this.state.rotateZ.interpolate({inputRange: [0, 1],outputRange: ['0deg', '180deg']})
                                    }
                                  ]
                                },
                              ]}
                  />
                  <Text style = {styles.head_text}> {this.state.headTitle}</Text> 
               </Animated.View>
    }
    _renderFooterRefresh(){
         return <Animated.View style={styles.foot}>
              <Animated.Image 
                source = {require('../resources/image/refresh/messages_audio_downloading_icon.png')}
                style  = {[
                            styles.head_image,
                            {
                              transform:
                              [
                                {
                                  rotateZ:this.state.rotateZ.interpolate({inputRange: [0, 1],outputRange: ['0deg', '180deg']})
                                }
                              ]
                            },
                          ]}
              />
              <Text style = {styles.head_text}> {this.state.headTitle}</Text> 
           </Animated.View>
    }
    _onLayout = (e)=>{
      console.log(`00000  ${e.nativeEvent.layout}`);
    }
    render() {
        return React.cloneElement(
                <ScrollView 
                  {...this.props}
                  onScroll            = {this._onScroll}
                  scrollEventThrottle = {16}
                  onScrollEndDrag     = {this._onScrollEndDrag}
                  onLayout            = {this._onLayout}
                >
                  {this._renderHeaderRefresh()}
                  {this.props.children}
                  {this._renderFooterRefresh()}
                  
              </ScrollView>,{
              ref: component => {
                this.scrollView = component;
              }
          })
    }
  
}
const styles = StyleSheet.create({
    head:{
      position:'absolute',
      top:-69,
      left:0,
      flexDirection: 'row',
      backfaceVisibility: 'hidden',
      right:0,
      height:70,
      backgroundColor:'orange',
      alignItems:'center',
      justifyContent:'center'
    },
    head_text:{
      color: '#333333',
      fontSize: 14,
    },
    foot:{
      // position:'absolute',
      height:44.0,
      flexDirection: 'row',
      backgroundColor:'aqua',
      // alignItems:'center',
      justifyContent:'center',
      backfaceVisibility: 'visible',
      left: 0,
      right: 0,
      // bottom: -35,
      // alignSelf: 'flex-end'
    },
    head_image:{
      width : 26,
      height: 26,
    },
    loadMore: {
      height:35,
      backgroundColor:'#fafafa',
      alignItems:'center',
      justifyContent:'center'
    },
    text: {
      height:70,
      backgroundColor:'#fafafa',
    },
    prText:{
      marginBottom:4,
      color:'#000',
      fontSize:12,
    },

    prState:{
      marginBottom:4,
      fontSize:12,
    },
    lmState:{
      fontSize:12,
    },
    indicatorContent:{
        flexDirection:'row',
        marginBottom:5
    },

});

