import './css/Dashboard.css';
import React, {useState, useEffect, Fragment} from 'react';
import { Icon } from '@iconify/react';
import { Dialog, Transition } from '@headlessui/react'
import ViewItems from './ViewItems';

function Dashboard() {
    const imgSrc = "https://source.unsplash.com/1920x1080/daily?";
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [hours, setHours] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [timeOfDay, setTimeOfDay] = useState("");
    const [ampm, setAmPm] = useState("");
    const [dayName, setDayName] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    let [isOpen, setIsOpen] = useState(false)

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

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

    const addTask = (task) => {
        setTasks([...tasks, task])
        setTask("");
        
    };

    const generateID = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

      
    const taskItems = tasks.map(item => {
        const taskId = item.id;
        
        return <ViewItems key={taskId} items={item} />
    });

    return(
        
        <div className="bg background-tint" style={{backgroundImage: `url(${imgSrc}${timeOfDay},mountain)`}}>
            <div className="h-full flex flex-col items-center justify-center">
                <h1 className="text-3xl text-white 2xl:text-8xl lg:text-7xl md:text-5xl">Good {timeOfDay}, Blessly!</h1>
            </div>
            <div className="flex flex-col float-left justify-center left-0 bottom-0 fixed">
                <h1 className="text-3xl 2xl:text-6xl lg:text-5xl md:text-5xl text-white px-4">{hours}:{minutes} {ampm}</h1>
                <h1 className="text-2xl 2xl:text-4xl text-white px-4 py-4">{days[dayName]}, {months[month]} {day}</h1>
            </div>
            <div className="flex flex-row float-right justify-center items-center right-0 bottom-0 fixed px-4 py-4">
                <button className="border-0 rounded-xl p-2" title="To-do List" onClick={openModal}>
                    <span>
                        <Icon className="text-white opacity-50 hover:drop-shadow-sm text-4xl" icon="fa-solid:clipboard-list" />
                    </span>
                </button>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}
                >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                    >
                    &#8203;
                    </span>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    >
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                        <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                        >
                        To-do List
                        </Dialog.Title>
                        <div className="mt-2">
                        <input 
                        className="w-full h-10 pl-3 pr-8 text-base text-gray-700 placeholder-gray-600 border rounded-md focus:outline-none" 
                        type="text" 
                        placeholder="Enter tasks here" 
                        value={task} 
                        onChange={(e) => setTask(e.target.value)} 
                        onKeyDown={(e) => e.key === 'Enter' ? addTask({id: generateID(), taskItem: task, completed: false}) : ''}
                        id="task"/>
                        </div>
                        <div className="mt-4 text-sm text-gray-500">
                            {taskItems}
                        </div>
                        
                    </div>
                    </Transition.Child>
                </div>
                </Dialog>
            </Transition>
        </div>

        
    );
}

export default Dashboard