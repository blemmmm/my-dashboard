import { createApi } from 'unsplash-js';
import { useEffect, useState } from 'react';
import './css/Dashboard.css';

function Dashboard() {
    const unsplash_api_access_key = "i4VCS7ioXpXFZJ__Gcuo2rJ3S-Ls4xybcF2YQKzNJy4";
    const api = createApi({
      accessKey: unsplash_api_access_key,
    });
    const [images, setImages] = useState(null);
  
  
    
    useEffect(() => {
      api.search
        .getPhotos({query: "background", orientation: 'landscape'})
        .then(data => setImages(data.response.results))
        .catch((e) => console.error(e)) 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    //console.log(images)
    
    const index = Math.floor(Math.random() * images.length);
    const imgSrc = images[index].urls.regular;
    const userName = images[index].user.first_name;
    const userLink = images[index].user.links.html;
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
            <div className="credits">
                Photo Credits: <a href={userLink}>{userName}</a>
            </div>
        </div>
    );
}

export default Dashboard