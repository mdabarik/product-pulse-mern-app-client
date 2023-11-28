import Menus from "./Menus";
import brandLogo from "../../../assets/brand-logo-filled.png";
import { Link } from "react-router-dom";


const Navbar = () => {

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col bg-white drop-shadow w-full">
                {/* Navbar */}
                <div className="navbar px-[0px] max-w-[1280px] mx-auto">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 flex items-center justify-start">
                        <Link to="/"><img className="w-[32px] mr-4" src={brandLogo} alt="Logo"/></Link>
                        <Link to="/"><h2 className="text-2xl font-bold">Product <span className="text-[#3498db] font-extrabold">Pulse</span></h2></Link>
                    </div>
                    <div className="flex-none hidden mx-0 px-0 lg:block">
                        <ul className="menu menu-horizontal text-lg">
                            {/* Navbar menu content here */}
                            <Menus></Menus>
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
            </div>
            <div className="drawer-side  z-50">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200">
                    {/* Sidebar content here */}
                    <Menus></Menus>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;