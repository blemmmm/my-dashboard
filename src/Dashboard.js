import './css/Dashboard.css';
import React, {useState, useEffect} from 'react';

function Dashboard() {

    const imgSrc = "https://source.unsplash.com/weekly?beach/1920x1080";
    const [hours, setHours] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [timeOfDay, setTimeOfDay] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            const nextHours = date.getHours();
            setHours(nextHours);
            const nextMin = date.getMinutes();
            setMinutes(nextMin);

            if (nextHours < 12) {
                setTimeOfDay("Morning");
            } else if (nextHours >= 12 && nextHours < 17) {
                setTimeOfDay("Afternoon");
            } else {
                setTimeOfDay("Evening");
            }

            if (nextMin < 10) {
                setMinutes(nextMin.toString().padStart(2, '0'))
            }     

        }, 500);
        return () => {
          clearInterval(interval);
        };
      }, [hours]);

   
    return(
        <div className="bg background-tint" style={{backgroundImage: `url(${imgSrc})`}}>
            <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-9xl text-white p-10">{hours}:{minutes}</h1>
            <h1 className="text-2xl text-white 2xl:text-8xl lg:text-7xl md:text-5xl">Good {timeOfDay}, Blessly!</h1>
            </div>
        </div>
    );
}

export default Dashboard