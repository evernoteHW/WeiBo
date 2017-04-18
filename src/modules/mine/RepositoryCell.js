
'use strict'
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

export default class RepositoryCell extends Component {
   constructor(props) {
        super(props);
        // this.state = {
        //     isFavorite: this.props.projectModel.isFavorite,
        //     favoriteIcon: this.props.projectModel.isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png'),
        // };
  }
  componentDidMount() {

  }
  render() {
    return (
      <TouchableHighlight 
      onPress={this.props.onSelect}>
        <View style={styles.container}>
            <View style={{backgroundColor:'yellow',flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 16, marginBottom: 2,color: '#212121',flex:1}}>
                  {this.props.projectModel.day}
                </Text>
            </View>
             <View style={{backgroundColor:'green',flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 14,marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 10,color: '#333333'}}>
                  {this.props.projectModel.key}
                </Text>
            </View>
             <View style={{backgroundColor:'white', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 14,marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 10,color: '#757575'}}>
                  {this.props.projectModel.day}
                </Text>
            </View>
             <View style={{backgroundColor: 'orange' ,flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>
                  {this.props.projectModel.day}
                </Text>
            </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008888',
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
