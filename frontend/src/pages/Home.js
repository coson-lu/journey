import axios from "axios";
import { useEffect, useState } from "react";
import ActivityRow from "../ActivityRow";
import './home.css';

function Home() {
  let [activities, setActivities] = useState([])

  const fetchActivities = async () => {
    try {
      const response = await axios.get("https://journey-backend.vercel.app/current");
      setActivities(response.data)
      const obj_keys = Object.keys(response.data)
      let temp = []
      obj_keys.forEach(element => {
        temp.push({'activity': element, 'duration': response.data[element]['duration']})
      });
      setActivities(temp)
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  }

  useEffect(() => {
    
    fetchActivities();
    // const interval = setInterval(fetchActivities, 5000);
    // return () => clearInterval(interval);
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const activity = e.target.elements[0].value;
    const duration = e.target.elements[1].value;
    const url = 'https://journey-backend.vercel.app/update';
    const formData = new FormData();
    formData.append('activity', activity);
    formData.append('duration', duration);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    
    try {
        await axios.post(url, formData, config);
        // Wait for the post request to finish before fetching activities
        await fetchActivities();
    } catch (error) {
        console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <h1>Home Page</h1>
      <div id='homepage-container'>
        <div id='activities-container'>
          {
            activities.map((act, index) => (
              <ActivityRow key={index} activity={act['activity']} duration={act['duration']} color={index}/>
            ))
          }
        </div>
        <div id='form-container'>
          <form onSubmit={handleSubmit}>
            <h1>Activity</h1>
            <input></input>
            <h1>Duration</h1>
            <input></input>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Home