import { Outlet } from 'react-router';
import Loading from '../../components/Loading/Loading';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import Navbar from '../../components/Home/Navbar';


const LoginLayouts = () => {
    const { loading } = useContext(AuthContext);
    if (loading) {
        return <Loading></Loading>
    }
    return (

        <div className='dark:bg-black'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>


    );
};

export default LoginLayouts;