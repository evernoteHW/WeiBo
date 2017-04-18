
/*
  'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
  Navigator,
  Image,
  Button,
} from 'react-native';

import { StackNavigator , TabNavigator} from 'react-navigation';

import Home from '../modules/home'
import Finance from '../modules/finance'
import Mine from '../modules/mine'

const HomeNavigator = StackNavigator({
    Mine:{
      screen: Mine,
    },
    Home:{
      screen: Home,
      navigationOptions: {
        title: "首页",
      }
    }
});
const FinanceNavigator = StackNavigator({
    Finance:{
      screen: Finance,
    }
});
const MineNavigator = StackNavigator({
    Mine:{
      screen: Mine,
    }
});

const TabBars = TabNavigator({
  Main: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBar: {
        label: '首页',
      },
    },
  },
  Setup: {
    screen: FinanceNavigator,
     navigationOptions: {
      tabBar: {
        label: '首页',
      },
    },
  },
  Mine: {
   screen: MineNavigator,
   navigationOptions: {
      tabBar: {
        label: '首页',
      },
    }
  },
});

export default class WeiBo extends Component {
  render() {
    return (
      <TabBars />
    );
  }
}
 */

/************************************************************************************************************************

/**
 'use strict'
import React, { Component } from 'react';
import {
StyleSheet,
Text,
View,
TabBarIOS,
NavigatorIOS,
Navigator,
Image,
Button
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import Home from '../modules/home'
import Finance from '../modules/finance'
import Mine from '../modules/mine'

const TabBarSettings = [
  {
    title:"首页",
    icon:require('../resources/image/tab/tabbar_home.png'),
    selectedIcon:require('../resources/image/tab/tabbar_home_highlighted.png')
  },
  {
    title:"消息",
    icon:require('../resources/image/tab/tabbar_message_center.png'),
    selectedIcon:require('../resources/image/tab/tabbar_message_center_selected.png')
  },
  {
    title:"",
    icon:require('../resources/image/tab/compose_color_yellow_select.png'),
    selectedIcon:require('../resources/image/tab/compose_color_yellow_select.png')
  },
  {
    title:"发现",
    icon:require('../resources/image/tab/tabbar_discover.png'),
    selectedIcon:require('../resources/image/tab/tabbar_discover_highlighted.png')
  },
  {
    title:"我",
    icon:require('../resources/image/tab/tabbar_profile.png'),
    selectedIcon:require('../resources/image/tab/tabbar_profile_highlighted.png')
  }
]
const HomeNavigator = StackNavigator({
    Home:{
      screen: Home,
      navigationOptions: {
        title: "首页",
        headerRight: <Button style={{backgroundColor: 'red'}} title="Info" />
      },
      // barTintColor: "orange"
    }
});
const FinanceNavigator = StackNavigator({
    Finance:{
      screen: Finance,
    }
});
const MineNavigator = StackNavigator({
    Mine:{
      screen: Mine,
    }
});
HomeNavigator.navigationOptions = {
  title: 'My Chats',
};
export default class WeiBo extends Component {

constructor(props) {
  super(props);
  this.state = { selectedTabItem: 0 };
}
 _renderTab(Component, selectedTab) {
      return (
           <TabBarIOS.Item
                icon={TabBarSettings[selectedTab].icon}
                selectedIcon={TabBarSettings[selectedTab].selectedIcon}
                title={TabBarSettings[selectedTab].title}
                renderAsOriginal={true}
                onPress={() => {this.setState({selectedTabItem:selectedTab})}}
                selected={this.state.selectedTabItem == selectedTab}
                // style={{backgroundColor:'orange'}}
                >
              <Component />
           </TabBarIOS.Item>
      )
}

render() {
  return (
    <View style={styles.container}>
          <TabBarIOS style={{width: '100%'}}
            tintColor='#333333'
            // barTintColor='white'
            >
            {this._renderTab(HomeNavigator, 0)}
            {this._renderTab(FinanceNavigator, 1)}
            {this._renderTab(MineNavigator, 2)}
            {this._renderTab(HomeNavigator, 3)}
            {this._renderTab(MineNavigator, 4)}
          </TabBarIOS>
    </View>
  );
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF',
},
welcome: {
  fontSize: 20,
 
},
instructions: {
  textAlign: 'center',
  color: '#333333',
  marginBottom: 5,
},
tabBarIcon: {
    width: 26, height: 26,
    resizeMode: 'contain',
},
tabBarSelectedIcon: {
    width: 26, height: 26,
    resizeMode: 'contain',
}
});

************************************************************************************************************************
 */


/*
'use strict'
import React, { Component } from 'react';
import {
StyleSheet,
Text,
View,
TabBarIOS,
NavigatorIOS,
Navigator,
Image,
Button
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import Home from '../modules/home'
import Finance from '../modules/finance'
import Mine from '../modules/mine'

const TabBarSettings = [
  {
    title:"首页",
    icon:require('../resources/image/tab/tabbar_home.png'),
    selectedIcon:require('../resources/image/tab/tabbar_home_highlighted.png')
  },
  {
    title:"消息",
    icon:require('../resources/image/tab/tabbar_message_center.png'),
    selectedIcon:require('../resources/image/tab/tabbar_message_center_selected.png')
  },
  {
    title:"",
    icon:require('../resources/image/tab/compose_color_yellow_select.png'),
    selectedIcon:require('../resources/image/tab/compose_color_yellow_select.png')
  },
  {
    title:"发现",
    icon:require('../resources/image/tab/tabbar_discover.png'),
    selectedIcon:require('../resources/image/tab/tabbar_discover_highlighted.png')
  },
  {
    title:"我",
    icon:require('../resources/image/tab/tabbar_profile.png'),
    selectedIcon:require('../resources/image/tab/tabbar_profile_highlighted.png')
  }
]
const HomeNavigator = StackNavigator({
    Home:{
      screen: Home,
      navigationOptions: {
        // title: "首页",
        headerRight: <Button style={{backgroundColor: 'red'}} title="Info" />,
        header:{
          title: <Button style={{backgroundColor: 'red'}} title="Info" />, 
          visible: {true},
          left: <Button style={{backgroundColor: 'red'}} title="登陆" />,
          right: <Button style={{backgroundColor: 'red'}} title="注册" />,
          tintColor: "#123123",
          titleStyle:"red",
          tintColor:"orange"
        },
        cardStack: {
            gesturesEnabled: true
        }
      }
    }
});
const FinanceNavigator = StackNavigator({
    Finance:{
      screen: Finance,
    }
});
const MineNavigator = StackNavigator({
    Mine:{
      screen: Mine,
    }
});

export default class WeiBo extends Component {

constructor(props) {
  super(props);
  this.state = { selectedTabItem: 0 };
}
 _renderTab(Component, selectedTab) {
      return (
           <TabBarIOS.Item
                icon={TabBarSettings[selectedTab].icon}
                selectedIcon={TabBarSettings[selectedTab].selectedIcon}
                title={TabBarSettings[selectedTab].title}
                renderAsOriginal={true}
                onPress={() => {this.setState({selectedTabItem:selectedTab})}}
                selected={this.state.selectedTabItem == selectedTab}
                // style={{backgroundColor:'orange'}}
                >
              <Component />
           </TabBarIOS.Item>
      )
}

render() {
  return (
    <View style={styles.container}>
          <TabBarIOS style={{width: '100%'}}
            tintColor='#333333'
            // barTintColor='white'
            >
            {this._renderTab(HomeNavigator, 0)}
            {this._renderTab(FinanceNavigator, 1)}
            {this._renderTab(MineNavigator, 2)}
            {this._renderTab(HomeNavigator, 3)}
            {this._renderTab(MineNavigator, 4)}
          </TabBarIOS>
    </View>
  );
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF',
},
welcome: {
  fontSize: 20,
 
},
instructions: {
  textAlign: 'center',
  color: '#333333',
  marginBottom: 5,
},
tabBarIcon: {
    width: 26, height: 26,
    resizeMode: 'contain',
},
tabBarSelectedIcon: {
    width: 26, height: 26,
    resizeMode: 'contain',
}
});


 */


/*

'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
  Navigator,
  Image,
  Button,
} from 'react-native';

import { StackNavigator , TabNavigator} from 'react-navigation';

import Home from '../modules/home'
import Finance from '../modules/finance'
import Mine from '../modules/mine'

const HomeNavigator = StackNavigator({
    Home:{
      screen: Home,
      navigationOptions: {
        title: "首页",
      }
    }
});
const FinanceNavigator = StackNavigator({
    Finance:{
      screen: Finance,
    }
});
const MineNavigator = StackNavigator({
    Mine:{
      screen: Mine,
    }
});

const TabBars = TabNavigator({
    Main: {
      screen: HomeNavigator,
      navigationOptions: {
        tintColor: "red" ,
        tabBar: {
          label: '首页',
          icon: ({tintColor}) => (<Image source={require('../resources/image/tab/tabbar_home.png')}/>),
          titleStyle: {
             color: 'green'
          }
        },
      },
    },
    Finance: {
      screen: FinanceNavigator,
       navigationOptions: {
        tabBar: {
          icon: ({tintColor}) => (<Image source={require('../resources/image/tab/tabbar_message_center.png')}/>),
          label: '首页',
        },
      },
    },
    Add: {
     screen: MineNavigator,
     navigationOptions: {
        tabBar: {
          icon: ({tintColor}) => (<Image source={require('../resources/image/tab/compose_color_yellow_select.png')}/>),
          label: '',
        },
      }
    },
    DisCover: {
     screen: MineNavigator,
     navigationOptions: {
        tabBar: {
          icon: ({tintColor}) => (<Image source={require('../resources/image/tab/tabbar_discover.png')}/>),
          label: '发现',
        },
      }
    },
    Mine: {
     screen: MineNavigator,
     navigationOptions: {
        tabBar: {
          icon: ({tintColor}) => (<Image source={require('../resources/image/tab/tabbar_profile.png')}/>),
          label: '我',
        },
      }
    }
  },{
    animationEnabled: false, // 切换页面时是否有动画效果
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 是否可以左右滑动切换tab
    tabBarOptions: {
      activeTintColor : '#ff8500',// 文字和图片选中颜色
      inactiveTintColor: '#333333', // 文字和图片未选中颜色
      showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
      indicatorStyle: {
              height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
      }, 
      style: {
         backgroundColor: '#fff', // TabBar 背景色
      },
      labelStyle: {
         // fontSize: 15, // 文字大小
      },
    }
  }
);

export default class WeiBo extends Component {
  render() {
    return (
      <TabBars />
    );
  }
}
 

 */