import './css/Dashboard.css';
import React, {useState, useEffect} from 'react';

function Dashboard() {

    const imgSrc = "https://source.unsplash.com/1920x1080/daily?beach";
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [hours, setHours] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [timeOfDay, setTimeOfDay] = useState("");
    const [ampm, setAmPm] = useState("");
    const [dayName, setDayName] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            const nextHours = date.getHours();
            setHours(nextHours);
            const nextMin = date.getMinutes();
            setMinutes(nextMin);
            const nextDay = date.getDay();
            setDayName(nextDay);
            const nextDate = date.getDate();
            setDay(nextDate);
            const nextMonth = date.getMonth();
            setMonth(nextMonth);

            if (nextHours < 12) {
                if (nextHours === 0) {
                    setHours(nextHours+12);
                }
                setTimeOfDay("Morning");
                setAmPm("AM");
            } else if (nextHours >= 12 && nextHours < 17) {
                if (nextHours !== 12) {
                    setHours(nextHours-12);
                }
                setTimeOfDay("Afternoon");
                setAmPm("PM");
            } else {
                setHours(nextHours-12);
                setTimeOfDay("Evening");
                setAmPm("PM");
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
                <h1 className="text-2xl text-white 2xl:text-8xl lg:text-7xl md:text-5xl">Good {timeOfDay}, Blessly!</h1>
            </div>
            <div className="flex flex-col float-left justify-center left-0 bottom-0 fixed">
                <h1 className="text-6xl text-white px-10 py-2">{hours}:{minutes} {ampm}</h1>
                <h1 className="text-4xl text-white px-10 py-4">{days[dayName]}, {months[month]} {day}</h1>
            </div>
        </div>
    );
}

export default Dashboard