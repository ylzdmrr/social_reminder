import React, { Component } from 'react';
import { Router, Scene, Tabs, Stack, Drawer, Actions } from 'react-native-router-flux';
import Home from './components/Home';

export default class componentName extends Component {

    render() {
      return ( 
      <Router
      navigationBarStyle={styles.navBar}
      titleStyle={styles.titleStyle}
      sceneStyle={{ backgroundColor: 'white' }}
      >
       <Scene
          key='Main'
          hideNavBar
          modal
        >
              <Scene key="home"
                title="Anasayfa"
                component={Home}
                initial
                />
        
        </Scene>
      </Router>
        );
      }
    }

    const styles = {
      container: {
        flex: 1,
      },
      tabBar: {
        borderTopColor: 'darkgrey',
        borderTopWidth: 0.3,
        backgroundColor: 'ghostwhite',
      },
      navigationBarStyle: {
        backgroundColor: 'red',
      },
      navigationBarTitleStyle: {
        color: 'white',
      },
    };