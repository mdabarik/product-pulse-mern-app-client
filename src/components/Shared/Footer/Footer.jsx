
const Footer = () => {
    return (
        <footer className="p-10 drop-shadow bg-base-100 flex flex-col w-full">
            <div className="flex justify-between w-[1280px] mx-auto">
                <div>
                    <p>Logo</p>
                    <p>Product Pulse</p>
                </div>
                <div className="flex flex-col">
                    <h2>Contact Us</h2>
                    <a className="link link-hover">Email: mdabarik@gmail.com</a>
                    <a className="link link-hover">Phone: +8801750837498</a>
                </div>
                <div className="flex flex-col">
                    <h2>Social Media</h2>
                    <a className="link link-hover">Facebook</a>
                    <a className="link link-hover">Instagram</a>
                    <a className="link link-hover">Instagram</a>
                    <a className="link link-hover">YouTube</a>
                </div>
            </div>
            <div className="text-center border-t-2 w-1/2 mx-auto mt-10">
                <p>All Right Reversed &copy; 2023-2029</p>
            </div>
        </footer>
    );
};

export default Footer;