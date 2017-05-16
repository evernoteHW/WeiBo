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
const refreshHeadHeight = 60;
const refreshFootHeight = 44;

function Size(width, height) {
  this.width = width;
  this.height = height;
}


export default class HWRefresh extends Component {
    constructor(props) {
        super(props);
        this.state = {
          headTitle:     '下拉刷新',
          footTitle:     '上拉刷新',
          rotateZ:       new Animated.Value(0),
          isDownLoading: false,
          isUpLoading:   false,
          footTop:       100,
          contentSize:   {},
          frame:         {},
          topInset:      0,
          bottomInset:   0,
        }
    }
    _onScroll = (e)=>{
      let target = e.nativeEvent;
      let y      = target.contentOffset.y;

      if (y <= -refreshHeadHeight) {
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
      let layoutMeasurement = target.layoutMeasurement;
      if (contentSize.height - layoutMeasurement.height - y < 0.0) {
          // if (contentSize.height - layoutMeasurement.height - y < -refreshFootHeight) {
          //     if (!this.state.isUpLoading) {
          //       this.setState({tootTitle: '释放更新',isUpLoading: true})
          //     }
              
          // }else{
          //   // console.log('2222');
          //     if (this.state.isUpLoading) {
          //       this.setState({tootTitle: '上拉更新',isUpLoading: false})
          //     }
          // }
      }else{

      }
    }
    _changeHeadStyle(){
      //如果正在下拉刷新
    }
    _changeFootStyle(){

    }
    _beginRefresh = ()=>{
      console.log(12312312);
    }
    endHeaderRefresh = ()=>{
       this.scrollView.scrollTo({x:0,y:0,animated:true})
       //还原之后 跳转文字和箭头
       setTimeout(() =>{
          this.setState({headTitle: '下拉刷新',isDownLoading: false, refreshHeadHeight: 0,topInset: 0})
       }, 300);
    }
    endFooterRefresh(){
      this.scrollView.scrollTo({x:0,y:this.state.contentSize.height - this.state.frame.height,animated:true});
      setTimeout(() =>{
          this.setState({headTitle: '上拉刷新',isDownLoading: false}) 
      }, 300);
    }
    // beginHeaderRefresh(){

    // }
    _onScrollEndDrag = (e) =>{

        let target = e.nativeEvent;
        let y      = target.contentOffset.y;
        let contentSize       = target.contentSize;
        let layoutMeasurement = target.layoutMeasurement;

        if (y < 0) {
            if (this.state.isDownLoading) {
              this.scrollView.scrollTo({x:0,y:-refreshHeadHeight,animated:true});
              this.setState({topInset: refreshHeadHeight});
              if (this.props.headerRefresh) {
                this.props.headerRefresh(this)
              }
            }
        }else{
          // if (this.state.isUpLoading) {
          //     this.scrollView.scrollTo({x:0,y:contentSize.height - layoutMeasurement.height + refreshFootHeight,animated:true});
          //     // this.endFooterRefresh() 
          // }
        }
       
    }
    _onLayout = (e)=>{
      const {width, height, x, y } = e.nativeEvent.layout;
      this.setState({ frame: {x, y, width,height}})
    }
    _onContentSizeChange = (width,height)=>{
      console.log(`height = ${height}`);
      this.setState({ footTop: height - 0.5, contentSize:{width,height}})
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
         return <Animated.View style={[styles.foot,{top: this.state.footTop}]}>
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
                <Text style = {styles.tootTitle}> {this.state.tootTitle}</Text> 
             </Animated.View>
    }
    render() {
        return React.cloneElement(
                <ScrollView 
                  {...this.props}
                  ref                 = {(scrollView) => this.scrollView = scrollView}
                  contentInset        = {{top: 0,bottom: this.state.bottomInset}}
                  onScroll            = {this._onScroll}
                  scrollEventThrottle = {16}
                  onScrollEndDrag     = {this._onScrollEndDrag}
                  onLayout            = {this._onLayout}
                  onContentSizeChange = {this._onContentSizeChange}
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

HWRefresh.propTypes = {
    headerRefresh:    React.PropTypes.func,
    // endHeaderRefresh: React.PropTypes.func,
    // endFooterRefresh: React.PropTypes.func,
}
HWRefresh.defaultProps = {
    headerRefresh: ()    => {},
    // endHeaderRefresh: () => {}, //空函数
    // endFooterRefresh: () => {},
}

const styles = StyleSheet.create({
    head:{
      position:'absolute',
      top:-refreshHeadHeight + 0.5,
      left:0,
      flexDirection: 'row',
      backfaceVisibility: 'hidden',
      right:0,
      height:refreshHeadHeight,
      backgroundColor:'orange',
      alignItems:'center',
      justifyContent:'center'
    },
    head_text:{
      color: '#333333',
      fontSize: 14,
    },
    foot:{
      position:'absolute',
      height:refreshFootHeight,
      flexDirection: 'row',
      backgroundColor:'aqua',
      alignItems:'center',
      justifyContent:'center',
      backfaceVisibility: 'hidden',
      left: 0,
      right: 0,
      top: refreshFootHeight - 0.5,
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

