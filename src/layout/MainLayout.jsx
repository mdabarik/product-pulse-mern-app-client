import { Outlet } from 'react-router-dom';
import Container from '../components/Shared/Container/Container';
import Footer from '../components/Shared/Footer/Footer';
import Navbar from '../components/Shared/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Container>
                <Outlet></Outlet>
                <Footer></Footer>
            </Container>
        </div>
    );
};

export default MainLayout;