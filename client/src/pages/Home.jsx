import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Home() {

    const navigate = useNavigate();

    useEffect( ( )=> {
        if(!sessionStorage.getItem('jwToken')){
            navigate('/')
        }
        

    } , []);


    const handlelogout = () => {

        sessionStorage.removeItem('jwToken');
        
    }

    return (
        <div className="flex flex-col min-h-screen ">

            <Header />

            <div className=" flex flex-col items-center flex-grow justify-center  rounded-lg bg-rose-200 lg:pb-0">

                <h1 className=" sm:text-3xl text-xl  text-center font-anta text-black pt-4  ">

                    User Authentication System 

                </h1>

                


            </div>

            <Footer />



        </div>


    )
}

export default Home;
