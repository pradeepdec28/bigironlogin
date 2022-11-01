import React, {useContext, useEffect} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';

const HomeScreen = () => {
  const {userInfo, isLoading, Logout, getWatchList, list} =
    useContext(AuthContext);

  const fetchWatchlist = async () => {
    const res = await getWatchList();
    console.log('home', res);
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  console.log('lisssst', list);

  const Item = ({title, url}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({item}) => <Item title={item.title} url={item.image} />;

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Text style={styles.welcome}>Welcome {userInfo.userName} </Text>
      <Button title="Logout" color="red" onPress={Logout} />
      <ScrollView>
        <FlatList
          data={list}
          number={10}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28,
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'orange',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
  },
  tinyLogo: {
    width: 30,
    height: 30,
  },
  img: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
});

export default HomeScreen;
