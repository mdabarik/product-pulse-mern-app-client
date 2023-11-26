import Logo from "./../../../assets/brand-logo-filled.png"

const Footer = () => {
    return (
        <footer className="p-6 drop-shadow bg-base-100 relative -z-10">
            <div className="flex flex-col items-center justify-between  mx-auto gap-y-10">
                <div className="flex flex-col items-center justify-center gap-y-6">
                    <div>
                        <img src={Logo} alt="image" />
                    </div>
                    <p className="font-bold text-2xl">Product <span className="text-[blue]">Pulse</span></p>
                    <div>
                        <address className="text-center">
                            <p>Location: 123 Main Street, Cityville, State 12345</p>
                            <p>USA, United State of America</p>
                        </address>
                    </div>
                </div>
                <div className="flex flex-col text-center">
                    <h2 className="font-bold text-2xl mb-3">Contact Us</h2>
                    <div className="flex flex-col gap-y-2">
                        <a className="link link-hover">Email: mdabarik19@gmail.com</a>
                        <a className="link link-hover">Phone: +8801750837498</a>
                    </div>
                </div>
                <div className="flex flex-col text-center">
                    <h2 className="font-bold text-2xl mb-3">Social Media</h2>
                    <div className="flex flex-col gap-y-2">
                        <a className="link link-hover">Facebook</a>
                        <a className="link link-hover">Instagram</a>
                        <a className="link link-hover">Instagram</a>
                        <a className="link link-hover">YouTube</a>
                    </div>
                </div>
            </div>
            <div className="text-center border-t-2 w-1/2 mx-auto mt-6">
                <p className="mt-6">All Right Reversed &copy; 2023-2029</p>
            </div>
        </footer>
    );
};

export default Footer;