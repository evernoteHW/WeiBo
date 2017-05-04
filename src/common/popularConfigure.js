
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
        console.log('dafadfad');
        this.state = {
          listData: [{'key':'Sort Key'}, 
                     {'key':'Custom Key'}, 
                     {'key':'Remove Key'}, 
                     {'key':'Theme'},
                     {'key':'About Author'},
                     {'key':'FeedBack'}],
          opacityValue:  new Animated.Value(0),
          scareValue:    new Animated.Value(0),
          transformView: new Animated.Value(0), 
          translate:     new Animated.ValueXY(0), 
        };
   }
   show(){
      this.startAnimation()
   }
   start(show){
     var commonConfig = {
        duration: 3000,
        easing: show ? Easing.out(Easing.back()) : Easing.inOut(Easing.quad),
      }

      var translateOrigin = new Point(113/2.0, -147/2.0)

      if (show) {
        this.state.translate.setValue(translateOrigin);
      }

      Animated.parallel([
        Animated.timing( this.state.opacityValue, { toValue: show ? 1 : 0, ...commonConfig} ),
        Animated.timing( this.state.scareValue, { toValue: show ? 1 : 0, ...commonConfig } ),
        Animated.timing( this.state.translate, {  toValue:  show ? new Point(0, 0) : translateOrigin, ...commonConfig }),
        Animated.timing( this.state.transformView,{ toValue: show ? 1 : 0, ...commonConfig }),
      ]).start() 
   }
   startAnimation() {
      this.start(true)
   }
   stopAnimation() {
      this.start(false)
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
    var {width, height} = e.nativeEvent.layout;
    console.log(`width == ${width} height ==${height}`);
  }
  render() {
    return (
      <Animated.View style = {[
        styles.container, 
        { opacity:   this.state.opacityValue },
        { transform: 
          [ 
            {translateX: this.state.translate.x},
            {translateY: this.state.translate.y},
            // {translateX:         -200/2},
            // {translateY:         -200/2},
            // {rotateX:            this.state.transformView.interpolate({inputRange:[0,1], outputRange:['0deg','180deg']})},
            // {translateY:         200/2},
            // {translateX:         200/2},
            {scale:           this.state.scareValue},// {scaleX: 1},// {scaleY: 1},
            // {transformOrigin: {x : -30, }}
            // 原始矩阵
            // {matrix : [1,0,0,0,
            //            0,1,0,0,
            //            0,0,1,0,
            //            0,0,0,1]},
          ],
          // matrix:
        },
        {
          // transformMatrix:
        },
        this.props.style,
        ]}
        onLayout = {this.measureContent}
        >
          <FlatList
              data                           = {this.state.listData}
              renderItem                     = {this.renderItem.bind(this)}
              scrollEnabled                  = {false}
              showsHorizontalScrollIndicator = {false}
              showsVerticalScrollIndicator   = {false}
          />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:        'absolute',
    right:           10,
    top:             20,
    flex:            1,
    borderRadius:    5,
    backgroundColor: '#333333',
  },
  item_text:{
    marginBottom: 2.5, 
    marginTop:    5,
    marginRight:  10,
    marginLeft:   10,
    color:        'white',
    textAlign:    'center'
  },
});

PopularConfigure.propTypes = {
    opacity:         React.PropTypes.number
}
PopularConfigure.defaultProps = {
    opacity:         0,
}