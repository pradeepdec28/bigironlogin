import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const baseToken = btoa(userInfo.token);
  const [list, setList] = useState([]);

  const Login = (userName, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/authentication/signin`, {userName, password})
      .then(res => {
        let userInfo = res.data;
        console.log('uuu', userInfo);
        setUserInfo(userInfo);
        setIsLoading(false);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      })
      .catch(e => {
        console.log(` login error ${e}`);
        setIsLoading(false);
      });
  };

  const Logout = () => {
    setIsLoading(true);
    try {
      AsyncStorage.removeItem('userInfo');
      setUserInfo({});
      setIsLoading(false);
    } catch (e) {
      console.log(`logout error ${e}`);
      setIsLoading(false);
    }
  };

  const userIsLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }
      setSplashLoading(false);
    } catch (e) {
      console.log(`logged in error ${e}`);
      setSplashLoading(false);
    }
  };

  const getWatchList = () => {
    axios
      .get(`${BASE_URL}/myaccount/watches`, {
        headers: {
          Authorization: `Basic ${baseToken}`,
        },
      })
      .then(res => {
        const list = res.data;
        console.log('list', res.data.response.lots);
        setList(res.data.response.lots);
      })
      .catch(e => {
        console.log(`watchlist error ${e}`);
      });
  };

  useEffect(() => {
    userIsLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        isLoading,
        splashLoading,
        Login,
        Logout,
        getWatchList,
        list,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
