import axios from "axios";
import { useEffect } from "react";

function Home() {
  const [activites, ]
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/current");
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    }
    fetchActivities();
    const interval = setInterval(fetchActivities, 5000);
    return () => clearInterval(interval);
  }, [])
  return (
    <>
      <h1>Home</h1>
    </>
  );
}

export default Home