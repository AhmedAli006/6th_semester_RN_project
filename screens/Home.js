import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesomeNum from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = ({navigation,route}) => {
  const [data, setdata] = useState([]);

  const [likedProducts, setLikedProducts] = useState([]);
  const [addToCart, setAddToCart] = useState([]);
 

// likedProducts [4,6,8,4,2,7]
// console.log(store,"  store")

// const setprod = async ()=>{
//     try {
//     const jsonValue = JSON.stringify(likedProducts);
//     await AsyncStorage.setItem('liked', jsonValue);
//   } catch (e) {
//     // saving error
//   }
// }
const setCartData = async (dt)=>{
    try {
    const jsonValue = JSON.stringify(dt);
    await AsyncStorage.setItem('cartProd', jsonValue);
  } catch (e) {
    console.log("set cart error " , e)
  }
}
const getCartData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('cartProd');
    const val = JSON.parse(jsonValue);
    
    setAddToCart(val)
  } catch (e) {
    console.log("get cart error " , e)
  }
};


  const checkUserData = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (!userData) {
      navigation.navigate('signup');
    }
  };

  const get = () => {
    axios
      .get('https://bbsultest.000webhostapp.com/data.php')
      .then(res => {
        const data = res.data;
        setdata(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    checkUserData();
    get();
    getCartData();
  }, []);

  const handleLikeProduct = (productId) => {
    const isLiked = likedProducts.includes(productId);// false/true

    setLikedProducts(prevData => {
      if (isLiked) {
        return prevData.filter(id => id !== productId);
      } else {
        return [...prevData, productId];
      }
    });
    
  };




const toCart = (...add) =>{

const cartData = [add,...addToCart];

setAddToCart(cartData)
    setCartData(cartData)

console.log(cartData)

}

  return (
    <View>
      <View style={{padding: 15,backgroundColor: 'lightgray',}}>
        
        
      <TouchableOpacity style={{marginLeft: 290}} onPress={()=>{
        navigation.navigate('cart',{prod:addToCart})
      }}>

 <FontAwesome
                          name={'shopping-cart'}
                          size={45}
                          solid
                          color={'#101233'}
                        />
 <FontAwesomeNum    style={{position: "absolute",left:10,top:8,}}
                          name={`numeric-${addToCart==null?0:addToCart.length}-box`}
                          size={20}
                          solid
                          color={'#ff4d15'}
                        />
      </TouchableOpacity>
      
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.product_id}
        renderItem={({item}) => {
          const isLiked = likedProducts.includes(item.product_id);
          // console.log(isLiked) // false false false false false false
          return (
            <>
              <View
                style={{
                  alignItems: 'center',
                  borderColor: '#101233',
                  borderWidth: 1,
                  margin: 15,
                  backgroundColor: 'white',
                }}>
                <View style={{alignItems: 'flex-start'}}>
                  <Image
                    style={{width: 250, height: 250, objectFit: 'contain'}}
                    source={{uri: item.product_picture}}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      marginHorizontal: 8,
                      fontSize: 20,
                      fontWeight: '700',
                    }}>
                    {item.product_brand}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      margin: 8,
                      color: 'green',
                      fontWeight: '600',
                      fontSize: 15,
                    }}>
                    $ {item.price}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginHorizontal: 8,
                      marginBottom: 20,
                      fontSize: 15,
                      color: '#101233',
                    }}>
                    {item.product_name}
                  </Text>

                  <View style={{flexDirection: 'row', marginHorizontal: 20}}>
                    <TouchableOpacity onPress={()=>{
                          toCart({product_id:item.product_id,product_name:item.product_name,price:item.price,product_brand:item.product_brand,product_picture:item.product_picture})
                    }}
                      style={{
                        elevation: 8,
                        backgroundColor: '#101233',
                        borderRadius: 10,
                        paddingVertical: 10,
                        paddingHorizontal: 12,
                        marginBottom: 20,
                        marginRight: 25,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#fff',
                          fontWeight: 'bold',
                          alignSelf: 'center',
                        }}>
                        Add to cart
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        // let like = !fav
                        // setFav(like)

                        handleLikeProduct(item.product_id);
                      }}
                      style={{
                        elevation: 8,
                        backgroundColor: '#101233',
                        borderRadius: 10,
                        paddingVertical: 10,
                        paddingHorizontal: 12,
                        marginBottom: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#fff',
                          fontWeight: 'bold',
                          alignSelf: 'center',
                        }}>
                        <FontAwesome
                          name={isLiked ? 'heart' : 'heart-o'}
                          size={25}
                          solid
                          color={'#fff'}
                        />
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          );
        }}
      />
    </View>
  );
};

export default Home;
