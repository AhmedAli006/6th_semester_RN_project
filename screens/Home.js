import { View, Text, FlatList, Image,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation,route}) => {
    const [data,setdata]=useState([]);


    const checkUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (!userData) {
        navigation.navigate('signup');
        // console.log(userData)
      }
    };
 useEffect(() => {

    checkUserData();
  }, []);

const get =  () =>{
 axios.get("https://bbsultest.000webhostapp.com/data.php" ).then((res)=>{
const data = res.data
setdata(data)
    }).catch((err)=>{
        console.log(err)
    })
}


useEffect(()=>{
    get();
},[])


  return (
    <View>
      
      <FlatList
      data={data}
      renderItem={({item})=>{
        return (<>

        <View style={{alignItems: 'center',borderColor:"#101233",borderWidth: 1,margin:15,backgroundColor: "white",}}>
<View style={{alignItems:'flex-start'}}>
  
        <Image style={{width:250,height:250,objectFit:'contain',}} source={{uri: item.product_picture}}/>
            <Text style={{textAlign:"center", marginHorizontal:8,fontSize:20,fontWeight:'700'}}>{item.product_brand}</Text>
            <Text style={{textAlign:"center", margin:8 , color:"green",fontWeight:'600',fontSize:15}}>$ {item.price}</Text>
            <Text style={{textAlign:"center", marginHorizontal:8,marginBottom: 20,fontSize:15,color:"#101233"}}>{item.product_name}</Text>
            
            <View style={{flexDirection:"row", marginHorizontal: 20,}}>

            <TouchableOpacity style={{ elevation: 8,
    backgroundColor: "#101233",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    marginRight: 25,
    }}>
<Text style={{ fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",}}>Add to cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ elevation: 8,
    backgroundColor: "#101233",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 20
    }}>
<Text style={{ fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",}}>Add to cart</Text>
            </TouchableOpacity>
            </View>

</View>
        </View>
        
        </>
        )
      }}
      />
    </View>
  )
}

export default Home