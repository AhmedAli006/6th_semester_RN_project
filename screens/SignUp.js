import axios from 'axios';
import React, {useState,useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SignUp = ({navigation}) => {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const data = {
    name: userName,
    email: email,
    password: password,
  };


   

const signUp = () => {

  axios
    .post('https://bbsultest.000webhostapp.com/appReg.php', data)
    .then(res => {

 AsyncStorage.setItem('user', {name:userName} );
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
 navigation.navigate('home');
};
  return (
    <>
      <View style={s.container}>
        <Image style={s.bgImg} source={require('../assets/bgLight.png')} />
      </View>
      <View style={s.container}>
        <Image style={s.bgImg2} source={require('../assets/bgLight.png')} />
      </View>
      <View style={s.bottomBox}>
        <View style={s.row}>
          <View
            style={{
              borderRadius: 60,
              backgroundColor: '#f0f0f0',
              height: 45,
              width: 45,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/google.png')}
              style={{
                width: 40,
                height: 35,
              }}
            />
          </View>
          <View
            style={{
              borderRadius: 60,
              backgroundColor: '#f0f0f0',
              height: 45,
              width: 45,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 20,
            }}>
            <Image
              source={require('../assets/facebook.png')}
              style={{
                width: 25,
                height: 35,
              }}
            />
          </View>
          <View
            style={{
              borderRadius: 60,
              backgroundColor: '#f0f0f0',
              height: 45,
              width: 45,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/apple.png')}
              style={{
                width: 35,
                height: 35,
              }}
            />
          </View>
          <View style={s.txtBox}>
            <Text style={s.signuptxt}>
              Already have an account? <Text style={s.span}>Log In Here</Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={s.topBg}>
        <View style={s.inBox}>
          <Text style={s.inBoxTxt}>Create account</Text>
          <Text style={s.inBoxSub}>
            Let's us know your name, email and your password
          </Text>
        </View>
        <TextInput
          style={s.SgInp}
          onChangeText={(nTxt)=>{setUsername(nTxt)}}
          placeholder="User Name"
        />
        <TextInput
          style={s.SgInp}
          onChangeText={(eTxt)=>{setEmail(eTxt)}}
          placeholder="Email"
        />
        <TextInput
          style={s.SgInp}
          onChangeText={(pTxt)=>{setPassword(pTxt)}}
          placeholder="Password"
        />

        <TouchableOpacity onPress={signUp} style={s.lgBtn}>
          <Text style={s.lgbtxt}>Sin Up</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const colors = {
  dark: '#101233',
  primary: '#ff4d15',
  gray: '#bdbdbd',
  white: ' #f0f0f0',
};

const s = StyleSheet.create({
  txtBox: {
    top: 90,
    right: 200,
  },
  span: {
    color: colors.primary,
  },
  signuptxt: {
    color: '#f0f0f0',
    fontWeight: '300',
  },

  row: {
    justifyContent: 'center',

    flexDirection: 'row',
    position: 'absolute',
    top: 130,
    left: 110,
  },

  topBg: {
    // flex: 1,
    backgroundColor: '#f0f0f0' || colors.white,
    position: 'relative',
    width: '100%',

    borderTopRightRadius: 90,
    borderBottomRightRadius: 90,
    borderBottomLeftRadius: 90,
  },
  bottomBox: {
    width: '100%',
    height: 300,
    backgroundColor: colors.dark,
    position: 'absolute',
    top: 490,
    flex: 1,
  },

  lgbtxt: {
    color: colors.dark,
    fontSize: 20,
    fontWeight: 'bold',
  },
  lgBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    marginHorizontal: 55,
    marginVertical: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  SgInp: {
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderWidth: 1.5,
    borderRadius: 30,
    borderColor: colors.gray,
    marginVertical: 10,
    marginHorizontal: 35,
  },
  inBoxTxt: {
    color: colors.dark,
    fontSize: 30,
    marginTop: 30,
    fontWeight: '700',
  },
  inBoxSub: {
    fontWeight: '400',
    paddingHorizontal: 80,
    marginVertical: 20,
    textAlign: 'center',
  },

  bgImg: {
    width: '100%',
    height: 120,
    borderBottomLeftRadius: 90,
    overflow: 'hidden',
  },
  bgImg2: {
    width: '100%',
    height: 182,
    overflow: 'hidden',
    ...StyleSheet.absoluteFillObject,
  },

  container: {
    backgroundColor: '#f0f0f0' || colors.white,

    // flex: 1,
  },
});
export default SignUp;
