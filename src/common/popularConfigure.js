
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
  Easing,
} from 'react-native';

import { screenWidth, screenHeight } from '../constants'

var DEFAULT_ARROW_SIZE = new Size(15, 15);

export const ANCHOR_TOP_LEFT      = 'ANCHOR_TOP_LEFT'
export const ANCHOR_TOP_CENTER    = 'ANCHOR_TOP_CENTER'
export const ANCHOR_TOP_RIGHT     = 'ANCHOR_TOP_RIGHT'
export const ANCHOR_LEFT_CENTER   = 'ANCHOR_LEFT_CENTER'
export const ANCHOR_BOTTOM_LEFT   = 'ANCHOR_BOTTOM_LEFT'
export const ANCHOR_BOTTOM_CENTER = 'ANCHOR_BOTTOM_CENTER'
export const ANCHOR_BOTTOM_RIGHT  = 'ANCHOR_BOTTOM_RIGHT'
export const ANCHOR_RIGHT_CENTER  = 'ANCHOR_RIGHT_CENTER'
export const ANCHOR_RIGHT_CUSTOM  = 'ANCHOR_RIGHT_CUSTOM'
export const ANCHOR_RIGHT_DEFAULT = 'ANCHOR_RIGHT_DEFAULT'

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Size(width, height) {
  this.width = width;
  this.height = height;
}

function Rect(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

export default class PopularConfigure extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          contentSize: {},
          opacityValue:    new Animated.Value(0),
          scare:           new Animated.Value(0),
          translate:       new Animated.ValueXY(0),
          frame:           new Rect(0,0,0,0),
          isTransitioning: false
        };
   }
   show(){
      this.startAnimation()
   }
   anchorPointLocation(placement){
    const { width, height } = this.state.contentSize;

      switch (placement) {
        case ANCHOR_TOP_LEFT:
          return new Point(-width/2.0, -height/2.0)
        case ANCHOR_TOP_CENTER:
          return new Point(0, -height/2.0)
        case ANCHOR_TOP_RIGHT:
          return new Point(width/2.0, -height/2.0)
        case ANCHOR_LEFT_CENTER:
          return new Point(-width/2.0, 0)
        case ANCHOR_BOTTOM_LEFT:
          return new Point(-width/2.0, height/2.0)
        case ANCHOR_BOTTOM_CENTER:
          return new Point(0, height/2.0)
        case ANCHOR_BOTTOM_RIGHT:
          return new Point(width/2.0, height/2.0)
        case ANCHOR_RIGHT_CENTER:
          return new Point(width/2.0, 0)
       case ANCHOR_RIGHT_CUSTOM:
          return new Point(width/2.0, 0)
        case ANCHOR_RIGHT_DEFAULT:
            return new Point(0, 0)
        default:
          return new Point(0, 0)
    }
   }
   start(show,doneCallback){

     var commonConfig = {
        duration: 300,
        easing:   show ? Easing.out(Easing.quad) : Easing.inOut(Easing.quad),
      }
      const {placement} = this.props
      var translateOrigin = this.anchorPointLocation(placement)
      if (show) { this.state.translate.setValue(translateOrigin) }

      Animated.parallel([
        Animated.timing(
         this.state.opacityValue, 
         { toValue: show ? 1 : 0, ...commonConfig} 
        ),
        Animated.timing( 
          this.state.scare, 
          { toValue: show ? 1 : 0, ...commonConfig} 
        ),
        Animated.timing( 
          this.state.translate, 
          {  toValue:  show ? new Point(0, 0) : translateOrigin, ...commonConfig }
        ),
      ]).start(doneCallback) 
   }
   startAnimation() {
      this.setState({isTransitioning: true});
   }
   stopAnimation() {
      this.start(false,() =>{this.setState({isTransitioning: false})})
   }
  renderItem({item, index}) {
      return(
        <TouchableOpacity 
        onPress = {this.stopAnimation.bind(this)}>
          <Text style = {styles.item_text}> {item.key} </Text>
        </TouchableOpacity>
     )
  }
  measureContent(e){
    const {width, height, x, y } = e.nativeEvent.layout;
    var contentSize = {width, height};
     this.setState(Object.assign({},
      {contentSize}), () => {
        this.start(true)
    });
  }
  render() {
    if (!this.state.isTransitioning) {
        return null;
    }
    const {listData} = this.props

    return (
      <View style = {styles.container}>
        <Animated.View style = {[
            styles.animation,
            { opacity:   this.state.opacityValue },
            { transform: 
              [ 
                {translateX: this.state.translate.x},
                {translateY: this.state.translate.y},
                {scale:      this.state.scare},
              ],
            }
          ]}
          onLayout = {this.measureContent.bind(this)}
          >
            <View style = {styles.arrow} /> 
            <FlatList
                style                          = {styles.flatList}
                data                           = {listData}
                renderItem                     = {this.renderItem.bind(this)}
                scrollEnabled                  = {false}
                showsHorizontalScrollIndicator = {false}
                showsVerticalScrollIndicator   = {false}
            />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:        'absolute',
    right:           10,
    top:             0,
    flex:            1,
    borderRadius:    5,
    backgroundColor: 'transparent',
  },
  animation:{
  
  },
  flatList:{
    backgroundColor: '#333333',
    borderRadius:    5,
    // marginTop:    20,
  },
  item_text:{
    marginBottom: 2.5, 
    marginTop:    5,
    marginRight:  10,
    marginLeft:   10,
    color:        'white',
    textAlign:    'center'
  },
  arrow: {
    left:              80,
    width:             DEFAULT_ARROW_SIZE.width,
    height:            DEFAULT_ARROW_SIZE.height,
    borderTopColor:    'transparent',
    borderRightColor:  'transparent',
    borderBottomColor: '#333333',
    borderLeftColor:   'transparent',
    borderTopWidth:    DEFAULT_ARROW_SIZE.width / 2,
    borderRightWidth:  DEFAULT_ARROW_SIZE.width / 2,
    borderBottomWidth: DEFAULT_ARROW_SIZE.height / 2,
    borderLeftWidth:   DEFAULT_ARROW_SIZE.height / 2,
  },
});

PopularConfigure.propTypes = {
    opacity:   React.PropTypes.number,
    listData:  React.PropTypes.array,
    placement: React.PropTypes.string,
}
PopularConfigure.defaultProps = {
    opacity:   0,
    placement: ANCHOR_RIGHT_DEFAULT,
}