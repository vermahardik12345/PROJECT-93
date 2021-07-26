import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput ,Alert, ScrollView,KeyboardAvoidingView,Modal,Image,Dimensions,Button,Pressable} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/header';
import * as Font from 'expo-font';
export default class dashboard extends React.Component{
   
    
    constructor(){
        
        super();
        this.state={
        userId:firebase.auth().currentUser.email,
        userName:'',
        currentTime:new Date().getHours(),
        fontsLoaded:false,
        balance:null
        
        }
      
       
    }
    async loadFonts() {
        await Font.loadAsync({
          // Load a font `Montserrat` from a static resource
          Montserrat: require('../assets/fonts/Montserrat.ttf'),
    
          // Any string can be used as the fontFamily name. Here we use an object to provide more control
          'Montserrat-SemiBold': {
            uri: require('../assets/fonts/Montserrat-SemiBold.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
          'Sawarbi':{
            uri: require('../assets/fonts/SawarabiGothic-Regular.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
          'Dancing':{
            uri: require('../assets/fonts/DancingScript-Bold.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
          'ZenLoop':{
            uri: require('../assets/fonts/ZenLoop-Regular.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
          'montserratBold':{
            uri: require('../assets/fonts/Montserrat-Bold.ttf'),
            display: Font.FontDisplay.FALLBACK,
          }

        });
        this.setState({ fontsLoaded: true });
      }
    
    GreetUser=()=>{
        if(this.state.currentTime>17){
            return(
                <Text style={style.greetText}>Good Evening!{this.state.userName}</Text>
            )
        }
        else if(this.state.currentTime>12){
            return(
                <Text style={style.greetText}>Good AfterNoon!{this.state.userName}</Text>
            )
        }
        else{
            return(
                <Text style={style.greetText}>Good Morning!{this.state.userName}</Text>
            )
        }
        
       
    }
    displayIncomeCard=()=>{
     return(
         <View style={{backgroundColor:"#6552F5",width:250,height:150,marginLeft:20,justifyContent:"center",marginTop:40,borderRadius:5}}> 
             <Text style={{color:'white',fontFamily:'Montserrat',marginTop:-90,marginLeft:20,fontSize:12}}>Your Current Balance is  {this.state.balance} </Text>
         </View>
     )
    } 
    
    getUserDetails=async()=>{
      
      await db.collection('users').where("email_id",'==',this.state.userId)  
      .onSnapshot((snapshot)=>{
        
        snapshot.forEach((doc)=>{
            this.setState({
                userName:doc.data().first_name.toUpperCase(),
            
                balance:doc.data().balance
             
           })
        
        })
        
    
    })    
    }
    componentDidMount(){
 
        this.getUserDetails()
        console.log(this.state.currentTime)
        this.loadFonts();
    }
    render(){
        return(
            <View>
                <MyHeader title='' />
             {this.GreetUser()}
             <Text style={{marginLeft:33,color:'grey',fontSize:10,fontFamily:"Montserrat-SemiBold"}}>Hope you're doing well today</Text>
              {this.displayIncomeCard()}
            </View>
        )
    }
}

const style=StyleSheet.create({
    greetText:{
     fontSize:15,
     marginTop:20,
     marginLeft:30,
     
     fontFamily:"Sawarbi"
    }
})