'use strict';

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  TouchableWithoutFeedback,
  View,
  Easing
} from 'react-native';

var noop = () => {};

var {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
var DEFAULT_ARROW_SIZE = new Size(10, 5);

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

var Popover = React.createClass({
  propTypes: {
    isVisible: PropTypes.bool,
    onClose: PropTypes.func,
  },
  getInitialState() {
    return {
      contentSize: {},
      anchorPoint: {},
      popoverOrigin: {},
      placement: 'auto',
      isTransitioning: false,
      defaultAnimatedValues: {
        scale: new Animated.Value(0),
        translate: new Animated.ValueXY(),
        fade: new Animated.Value(0),
      },
    };
  },
  measureContent(x) {
    this._startAnimation({show: true});
  },

  componentWillReceiveProps(nextProps:any) {
    const { isVisible: willBeVisible } = nextProps;
    const { isVisible } = this.props;
  
    if (willBeVisible !== isVisible) {
      if (willBeVisible) {
        // We want to start the show animation only when contentSize is known
        // so that we can have some logic depending on the geometr
        // this.setState({isAwaitingShow: true});
      } else {
        this._startAnimation({show: false});
      }
    }
  },
  _startAnimation({show}) {
    this._startDefaultAnimation({show, doneCallback: () => this.setState({isTransitioning: false})});
    this.setState({isTransitioning: true});
  },
  _startDefaultAnimation({show, doneCallback}) {
    var animDuration = 3000;
    var values = this.state.defaultAnimatedValues;
    var translateOrigin = new Point(100, -20.5)

    if (show) {
      values.translate.setValue(translateOrigin);
    }
    var commonConfig = {
      duration: animDuration,
      easing: show ? Easing.out(Easing.back()) : Easing.inOut(Easing.quad),
    }
    Animated.parallel([
      Animated.timing(values.translate, {
        toValue: show ? new Point(0, 0) : translateOrigin,
        ...commonConfig,
      }),
      Animated.timing(values.scale, {
        toValue: show ? 1 : 0,
        ...commonConfig,
      })
    ]).start(doneCallback);
  },

  render() {
    if (!this.props.isVisible && !this.state.isTransitioning) {
        return null;
    }
    return (
      <TouchableWithoutFeedback onPress={this.props.onClose}>
        <View style={[styles.container, styles.containerVisible ]}>
          <Animated.View style={[styles.popover, {
            top: 66,
            left: 42,
            }]}>
            <Animated.View ref='content' onLayout={this.measureContent} 
            style={[styles.content, 
                  {
                    transform: [
                      {translateX: this.state.defaultAnimatedValues.translate.x},
                      {translateY: this.state.defaultAnimatedValues.translate.y},
                      {scale: this.state.defaultAnimatedValues.scale},
                    ],
                  }]}>
              {this.props.children}
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
});


var styles = StyleSheet.create({
  container: {
    opacity: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  containerVisible: {
    opacity: 1,
  },
  popover: {
    backgroundColor: 'black',
    position: 'absolute',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.8,
  },
  content: {
    borderRadius: 3,
    padding: 6,
    backgroundColor: '#fff',
  },
});

Popover.defaultProps = {
    isVisible: false,
    displayArea: new Rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT),
    arrowSize: DEFAULT_ARROW_SIZE,
    placement: 'auto',
    onClose: noop,
}
module.exports = Popover;
