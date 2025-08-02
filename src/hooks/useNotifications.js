import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './UseAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const useNotifications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: notifications = [], refetch } = useQuery({
    queryKey: ['notifications', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/notifications/${user.email}`);
      return res.data.sort((a, b) => new Date(b.time) - new Date(a.time));
    }
  });

  return { notifications, refetch };
};

export default useNotifications;
