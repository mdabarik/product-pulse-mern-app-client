import AOS from 'aos';
import { useEffect } from 'react';

const AboutUs = () => {
    useEffect(() => {
        AOS.init()
    }, [])

    return (
        <div className="py-10 w-[90%] mx-auto" data-aos="zoom-in">
            <div className="flex items-center justify-center flex-col">
                <h1 className="text-2xl text-center font-extrabold uppercase">About   <span className="text-[#4d4dbe]">us</span></h1>
                <p className="text-center uppercase text-sm mt-4 text-gray-600">Crafting Digital Experiences, One Query at a Time</p>
            </div>
            <div className="flex flex-col items-center justify-start text-left space-y-5 my-6">
                <p>
                    Welcome to our digital hub, where innovation meets expertise! At [Your Company Name], we are passionate about creating seamless connections and providing effective solutions. Our journey is fueled by a commitment to understanding your needs and delivering solutions that make a difference.
                </p>
                <p>
                    As a team of dedicated professionals, we thrive on challenges and excel in turning ideas into reality. From troubleshooting technical intricacies to envisioning creative solutions, we are here to simplify complexities and enhance your digital experience.
                </p>
                <p>
                    At the heart of our mission is a belief in the power of collaboration. We value the relationships we build with our clients and partners, working together to achieve shared goals. Whether you're navigating the digital landscape or seeking tailored solutions, consider us your trusted ally.
                </p>
                <p>
                    In our relentless pursuit of excellence, innovation, and client satisfaction, we embark on a journey that transcends conventional limits. At [Your Company Name], we understand that the digital realm is ever-evolving, and our commitment to staying at the forefront of technological advancements is unwavering. Our team comprises not just experts but visionaries who anticipate trends and pioneer groundbreaking solutions.
                </p>
                <p>
                    Diving deep into the intricacies of digital landscapes, we embrace challenges with a dual approach – technical prowess and creative brilliance. This unique blend allows us not only to resolve complexities but also to redefine standards. We don't just provide solutions; we architect experiences that resonate with the dynamic needs of the digital era.
                </p>
                <p>
                    Beyond being a service provider, we see ourselves as partners in your success story. Our collaborative ethos extends beyond conventional client-vendor relationships. We're invested in your growth, working hand in hand to achieve milestones that go beyond expectations.
                </p>
                <p>
                    As we shape the future of digital solutions, your journey with us becomes a testament to our shared triumphs. Together, we are crafting a narrative that goes beyond the ordinary, building a digital world that inspires and empowers. Join us in this doubled commitment to excellence, and let's navigate the digital landscape hand in hand, unlocking endless possibilities together. Thank you for being an integral part of our ambitious and innovative venture!
                </p>
                <p>
                    Join us on this journey as we continue to push boundaries, innovate relentlessly, and shape the future of digital solutions. Thank you for being a part of our story – together, we're building a digital world that inspires and empowers.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;