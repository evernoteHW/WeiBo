
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
} from 'react-native';

import { screenWidth, screenHeight } from '../constants'

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
        };
   }
   show(){
      this.startAnimation()
   }
   startAnimation() {
      Animated.parallel([
        Animated.timing( this.state.opacityValue, { toValue: 1, duration: 300 } ),
        Animated.timing( this.state.scareValue, { toValue:   1, duration: 300 } ),
        Animated.timing( this.state.transformView,{ toValue:1, duration: 1000 }),
      ]).start() 
   }
   stopAnimation() {
     Animated.parallel([
        Animated.timing( this.state.opacityValue, { toValue: 0, duration: 300} ),
        Animated.timing( this.state.scareValue, { toValue:   0, duration: 300} ),
        Animated.timing( this.state.transformView,{ toValue: 0, duration: 1000 }),
      ]).start() 
   }
  renderItem({item, index}) {
      return(
        <TouchableOpacity 
        onPress = {this.stopAnimation.bind(this)}>
          <Text style = {styles.item_text}> {item.key} </Text>
        </TouchableOpacity>
     )
  }
  render() {
    return (
      <Animated.View style = {[
        styles.container, 
        { opacity:   this.state.opacityValue },
        { transform: 
          [ 
            {translateX:         -200/2},
            {translateY:         -200/2},
            {rotateX:            this.state.transformView.interpolate({inputRange:[0,1], outputRange:['0deg','180deg']})},
            {translateY:         200/2},
            {translateX:         200/2},
            // {scale:           this.state.scareValue},// {scaleX: 1},// {scaleY: 1},
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
        ]}>
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