import { Link } from "react-router-dom";

export const GetStartedButton = () => <Link to='/register'>
    <button className="bg-primary darker-grotesque-700 text-black w-full lg:w-[300px] flex items-center justify-center py-3 rounded text-[20px] font-semibold hover:bg-primary/90 transition-all duration-300">Get Started</button>
</Link>