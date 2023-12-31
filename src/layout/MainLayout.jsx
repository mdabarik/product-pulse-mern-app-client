import { Outlet } from 'react-router-dom';
import Container from '../components/Shared/Container/Container';
import Footer from '../components/Shared/Footer/Footer';
import Navbar from '../components/Shared/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='bg-[#f8f8ff]'>
                <Container>
                    <Outlet></Outlet>
                </Container>
            </div>
            <div className='w-[100vw] overflow-hidden'>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;