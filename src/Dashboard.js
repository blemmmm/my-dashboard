import './css/Dashboard.css';

function Dashboard() {

    const imgSrc = "https://source.unsplash.com/weekly?beach/1920x1080    ";
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    let timeOfDay = "";

    if (hours < 12) {
        timeOfDay = "Morning"
    } else if (hours >= 12 && hours < 17) {
        timeOfDay = "Afternoon"
    } else {
        timeOfDay = "Evening"
    }
  
   
    return(
        <div className="bg background-tint" style={{backgroundImage: `url(${imgSrc})`}}>
            <div className="greeting-container">
            <h1 className="time">{hours}:{minutes}</h1>
            <h1 className="greeting">Good {timeOfDay}, Blessly!</h1>
            </div>
        </div>
    );
}

export default Dashboard