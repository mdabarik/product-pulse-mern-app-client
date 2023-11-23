import { Outlet } from 'react-router-dom';
import Container from '../components/Shared/Container/Container';
import Navbar from '../components/Shared/Navbar/Navbar';
import Footer from '../components/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <Container>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </Container>
    );
};

export default MainLayout;