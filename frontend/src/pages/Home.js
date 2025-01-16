import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ActivityRow from "../ActivityRow";
import './home.css';
import ApiService from "../Api";
import Loading from "../Loading";

function Home() {
  const inputRef = useRef(null);
  let [activities, setActivities] = useState([]);
  let [currentActivity, setCurrentActivity] = useState('');
  let [currentDuration, setCurrentDuration] = useState('');
  let [loading, setLoading] = useState(false);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const data = await ApiService.getCurrentData();
      const obj_keys = Object.keys(data);
      let temp = [];
      obj_keys.forEach(element => {
        temp.push({ 'activity': element, 'duration': data[element]['duration'] });
      });
      setActivities(temp);
    } catch (error) {
      console.error("Error fetching problems:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
    inputRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'https://journey-backend.vercel.app/update';
    
    try {
      const data = await ApiService.updateData(currentActivity, currentDuration);
      await fetchActivities();
      setCurrentActivity('');
      setCurrentDuration('');
      inputRef.current.focus();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div id='homepage-container'>
        <div id='clear-fix'>
          <div id='activities-container'>
            <div id='accomplishments-container'>
              <h1 id='accomplishments-header'>Today's <span style={{ color: '#48A3FF', textShadow: '0 0 7px #48A3FF' }}>Accomplishments</span></h1>
            </div>
            <div id='activity-duration-scroll'>
              <div id='activities-header'>
                <h2 id='activity-name'>Activity</h2>
                <h2 id='activity-duration'>Duration</h2>
              </div>
              <div id='activity-scroll-control'>
                {loading &&
                  <>
                    <Loading></Loading>
                  </>
                }
                {
                  activities.map((act, index) => (
                    <ActivityRow
                      key={index}
                      activity={act['activity']}
                      duration={act['duration']}
                      color={index}
                      fetchActivities={fetchActivities}
                      />
                  ))
                }
              </div>
            </div>
            
          </div>
        </div>
        <div id='form-container'>
          <form onSubmit={handleSubmit}>
            <h1 id='add-entry-text'>Add <span style={{ color: '#48A3FF', textShadow: '0 0 7px #48A3FF' }}>Entry</span></h1>
            <input type='text' placeholder='activity' value={currentActivity} onChange={(e) => setCurrentActivity(e.target.value)} ref={inputRef} />
            <input type='text' placeholder='duration' value={currentDuration} onChange={(e) => setCurrentDuration(e.target.value)} />
            <input type='submit' placeholder='submit' />
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;
