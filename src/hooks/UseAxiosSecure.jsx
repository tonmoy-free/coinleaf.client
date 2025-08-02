import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';
import { AuthContext } from '../provider/AuthProvider';

const axiosInstance = axios.create({
    baseURL: `https://coinleaf-server.vercel.app`
});

// const useAxiosSecure = () => {

const useAxiosSecure = () => {
  const { user, logOut : handleSignOutUser  , loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && user?.accessToken) {
      // Add request interceptor
      const requestInterceptor = axiosInstance.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          return config;
        }
      );

      // Add response interceptor
      const responseInterceptor = axiosInstance.interceptors.response.use(
        (res) => res,
        (err) => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            handleSignOutUser()
              .then(() => {
                console.log("Logged out due to token issue.");
              })
              .catch(console.error);
          }
          return Promise.reject(err);
        }
      );

      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, loading]);

  return axiosInstance;
};

export default useAxiosSecure;


























//     const { user, logOut } = useAuth();
//     const navigate = useNavigate();
//     console.log(user)
//     axiosSecure.interceptors.request.use(config => {
//         config.headers.Authorization = `Bearer ${user?.accessToken}`
//         return config
//     }, error => {
//         return Promise.reject(error);
//     })


//     axiosSecure.interceptors.response.use(res => {
//         return res;
//     }, error => {
//         console.log('inside res interceptor', error.status);
//         const status = error.status;
//         if (status === 403) {
//             navigate('/forbidden');
//         }
//         else if (status === 401 || status === 400) {
//             logOut()
//                 .then(() => {
//                     navigate('/login')
//                 })
//                 .catch(() => {

//                 })
//         }
//         return Promise.reject(error);
//     })

//     return axiosSecure;
// };

// export default useAxiosSecure;