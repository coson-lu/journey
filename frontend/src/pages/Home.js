import axios from "axios";
import { useEffect, useState } from "react";
import ActivityRow from "../ActivityRow";

function Home() {
  let [activities, setActivities] = useState([])
  const fetchActivities = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/current");
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
  
  function handleSubmit(e) {
    e.preventDefault();
    const activity = e.target.elements[0].value;
    const duration = e.target.elements[1].value;
    const url = 'http://127.0.0.1:5000/update';
    const formData = new FormData();
    formData.append('activity', activity);
    formData.append('duration', duration);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
    };
    axios.post(url, formData, config)
    fetchActivities();
  };

  return (
    <>
      {
        activities.map((act, index) => (
          <ActivityRow key={index} activity={act['activity']} duration={act['duration']}/>
        ))
      }
      <form onSubmit={handleSubmit}>
        <input></input>
        <input></input>
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}

export default Home