import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import { Router, Scene, Tabs, Stack, Drawer, Actions } from 'react-native-router-flux';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import { colors,fonts } from './style';

// Onboarding Page
import FirstScreen from './components/Onboarding/FirstScreen';
import Login from './components/Onboarding/Login';
import Register from './components/Onboarding/Register';

// In Page
import Home from './components/Home';
import Profile from './components/Profile';

// Menu
import DrawerMenu from './components/DrawerMenu';

const { width } = Dimensions.get('window');


export default class componentName extends Component {

    render() {
      return ( 
      <Router
      navigationBarStyle={styles.navBar}
      titleStyle={styles.titleStyle}
      sceneStyle={{ backgroundColor: colors.background }}
      >
        <Stack
          key='Main'
          hideNavBar
          transitionConfig={(data)=>{
            screenInterpolator: StackViewStyleInterpolator.forHorizontal
          }}
          modal
        >
          <Scene key='onboarding' modal={false}>
              <Scene key="firstScreen" 
                hideNavBar
                component={FirstScreen}
                initial
              />
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
            contentComponent={DrawerMenu}
            drawerPosition="left"
            drawerWidth={width / 1.5}
          >
            <Scene key='home'
              title='ANASAYFA'
              component={Home}
              initial
            />
            <Scene key='profile'
              title='PROFİL'
              component={Profile}
            />
          </Drawer>
          
        </Stack>
      </Router>
        );
      }
    }

    const styles = {
      container: {
        flex: 1,
      },
      navBar: {
        backgroundColor: colors.background,
        
      },
      titleStyle: {
        color: colors.mainpink,
        fontFamily: fonts.text,
      },
    };