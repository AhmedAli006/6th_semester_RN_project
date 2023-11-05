import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

export const Cart = ({navigation, route}) => {
  const [likedProducts, setLikedProducts] = useState([]);
  const {id, name, price, pic, brand} = route.params;
  const data = route.params;

  // console.log(route.params)
  const handleLikeProduct = productId => {
    const isLiked = likedProducts.includes(productId); // false/true

    setLikedProducts(prevData => {
      if (isLiked) {
        return prevData.filter(id => id !== productId);
      } else {
        return [...prevData, productId];
      }
    });
  };
  return (
    <View>
      <FlatList
        data={data}
        likedProducts={likedProducts}
        renderItem={({item}) => {
          const isLiked = likedProducts.includes(item.id);

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
                    {item.brand}
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
                    {item.name}
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

                    <TouchableOpacity
                      onPress={() => {
                        // let like = !fav
                        // setFav(like)
                        handleLikeProduct(item.id);
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

      {/* <Text>{brand}</Text> */}
    </View>
  );
};
