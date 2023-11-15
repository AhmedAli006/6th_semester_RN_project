import { View, Text,FlatList,Image,TouchableOpacity } from 'react-native'
import React ,{useState,useEffect} from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Cart = ({navigation,route}) => {
     const [data, setdata] = useState([]);
    

  const [likedProducts, setLikedProducts] = useState([]);
    const {prod} = route.params;


    
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
    get();

    
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

 const removeProductFromCart = async (productId)=>{

  const filteredCart = prod.filter(e => !(e[0].product_id.includes(productId)) );

filteredCart.slice(filteredCart[0].product_id,1)
  
  await AsyncStorage.setItem('cartProd', JSON.stringify(filteredCart)); 


  // Set the cart back in async storage.
}

  return (
 /*
 id.map((e)=>{parseInt(e)}) data.filter(item=>item.product_id.includes(parseInt(e)))

data.filter(item=>item.product_id.includes(7))
  data={ data.filter(item=>item.product_id.includes(id.map((e)=>{parseInt(e)})))}
 */ 
 <View>
      <FlatList
        data={prod}
        // keyExtractor={item => item.product_id}
        renderItem={({item}) => {
          const isLiked = likedProducts.includes(item[0].product_id);
          // console.log(isLiked) // false false false false false false
          // console.log(item.product_brand)
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
                    source={{uri: item[0].product_picture}}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      marginHorizontal: 8,
                      fontSize: 20,
                      fontWeight: '700',
                    }}>
                    {item[0].product_brand}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      margin: 8,
                      color: 'green',
                      fontWeight: '600',
                      fontSize: 15,
                    }}>
                    $ {item[0].price}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginHorizontal: 8,
                      marginBottom: 20,
                      fontSize: 15,
                      color: '#101233',
                    }}>
                    {item[0].product_name}
                  </Text>

                  <View style={{flexDirection: 'row', marginHorizontal: 20}}>
                    <TouchableOpacity 
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
                        Buy
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{removeProductFromCart(item[0].product_id)}}
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
                       remove
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        // let like = !fav
                        // setFav(like)

                        handleLikeProduct(item[0].product_id);
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
  )
}

export default Cart