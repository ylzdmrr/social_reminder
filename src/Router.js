import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import { Router, Scene, Tabs, Stack, Drawer, Actions } from 'react-native-router-flux';
import Home from './components/Home';
// Onboarding Page
import Login from './components/Onboarding/Login';
import Register from './components/Onboarding/Register';

const { width } = Dimensions.get('window');

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
          <Scene key='onboarding'>
              <Scene key="login"
                hideNavBar
                component={Login}
              />
              <Scene key="register"
                hideNavBar
                component={Register}

              />
          </Scene>
          <Drawer
            key="main"
            hideNavBar
            drawerPosition="left"
            drawerWidth={width / 1.3}
          >
            <Tabs key="tabpage" tabBarStyle={styles.tabBar} showLabel={false}>

              <Scene key="home"
                title="Anasayfa"
                component={Home}
                initial
              />
             
            </Tabs>
          </Drawer>
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