import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Section1 } from "./components/Section1";
import { Section2 } from "./components/Section2";
import { Section3 } from "./components/Section3";
import { Section4 } from "./components/Section4";
import { Section5 } from "./components/Section5";
import { Section6 } from "./components/Section6";
import { Section7 } from "./components/Section7";

export const Home = () => {


    return (
        <div className="text-black-400">
            <Header />
            <Section1/>
            <Section2/>
            <Section3/>
            <Section4/>
            <Section5/>
            <Section6/>
            <Section7/>
            <Footer/>
        </div>
    );
}