import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,SafeAreaView} from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import Welcome from './screens/welcome';
import LogIn from './screens/logIn';
import dashboard from './screens/dashboard';


export default class App extends React.Component{
 render(){
    return (
    <View>
      <SafeAreaView>
<AppContainer/>
</SafeAreaView>
    </View>
    
   );
    }
 
}
const Navigator = createSwitchNavigator({

 Welcome:{screen:Welcome},
 Login:{screen:LogIn},
 dashboard:{screen:dashboard},


  
  

 })

const AppContainer =  createAppContainer(Navigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

