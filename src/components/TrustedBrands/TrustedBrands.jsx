import GoogleLogo from "./../../assets/brands/goole-logo.png";
import MicrosoftLogo from "./../../assets/brands/microsoft-logo.png";
import AppleLogo from "./../../assets/brands/apple-logo.png";
import AirBnbLogo from "./../../assets/brands/airbnb-logo.png";
import AmazonLogo from "./../../assets/brands/amazon-logo.png";
import UberLogo from "./../../assets/brands/uber-logo.png";
import PaypalLogo from "./../../assets/brands/paypal-logo.png";

const TrustedBrands = () => {
    return (
        <div className="my-14">
            <div className="flex items-center justify-center flex-col">
                <h1 className="text-2xl text-center font-extrabold uppercase">Our Trusted   <span className="text-[#4d4dbe]">Partners</span></h1>
                <p className="text-center uppercase text-sm mt-4 text-gray-600">Our companion working with us for a long period of time.</p>
            </div>
            <div className="my-4 flex items-center justify-center flex-wrap gap-6">
                <div className="w-[150px] object-cover bg-[#4caf5030] h-fit rounded-lg p-3">
                    <img src={GoogleLogo} alt="brand logo" />
                    <span className="text-center block">Google</span>
                </div>
                <div className="w-[150px] object-cover bg-[#4caf5030] h-fit rounded-lg p-3">
                    <img src={MicrosoftLogo} alt="brand logo" />
                    <span className="text-center block">MicroSoft</span>
                </div>
                <div className="w-[150px] object-cover bg-[#4caf5030] h-fit rounded-lg p-3">
                    <img src={AppleLogo} alt="brand logo" />
                    <span className="text-center block">Apple</span>

                </div>
                <div className="w-[150px] object-cover bg-[#4caf5030] h-fit rounded-lg p-3">
                    <img src={AirBnbLogo} alt="brand logo" />
                    <span className="text-center block">AirBNB</span>

                </div>
                <div className="w-[150px] object-cover bg-[#4caf5030] h-fit rounded-lg p-3">
                    <img src={AmazonLogo} alt="brand logo" />
                    <span className="text-center block">Amazon</span>

                </div>
                <div className="w-[150px] object-cover bg-[#4caf5030] h-fit rounded-lg p-3">
                    <img src={UberLogo} alt="brand logo" />
                    <span className="text-center block">Uber</span>

                </div>
                <div className="w-[150px] object-cover bg-[#4caf5030] h-fit rounded-lg p-3">
                    <img src={PaypalLogo} alt="brand logo" />
                    <span className="text-center block">Paypal</span>
                </div>
            </div>
        </div>
    );
};

export default TrustedBrands;