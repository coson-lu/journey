import Highcharts from 'highcharts';
import { useEffect, useState } from 'react';
import axios from "axios";
import './analytics.css'
import HeatMap from '@uiw/react-heat-map';
import ApiService from "../Api";

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Formats date to MM-DD-YYYY
const mmddyyyy = (date) => {
  const month = date.getMonth() + 1;
  let day = date.getDate();
  const year = date.getFullYear();
  if (day.toString().length == 1) {
    day = '0' + day.toString()
  } 

  const fdate = `${month}-${day}-${year}`;

  return [fdate, month, parseInt(day), year]
}

const currentDate = new Date()
const formatedDate = mmddyyyy(currentDate)


// *TIME FRAMES
let time_frames = {
  week: (data, weeksBack) => {
    let lastMonday = new Date()
    lastMonday.setDate(currentDate.getDate() - (currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1))
    let wantedMonday = new Date()
    wantedMonday.setDate(lastMonday.getDate() - (weeksBack * 7))
    
    let wantedData = []
    let wantedDays = []
    let first = wantedMonday;
    let last = new Date();
    for (let i = 0; i < 7; i++) {
      let n = new Date(wantedMonday)
      n.setDate(wantedMonday.getDate() + i)
      if (i == 6) {
        last = n
      }

      let formatted = mmddyyyy(n)[0]

      wantedData.push(data[formatted])
      wantedDays.push(formatted)
    }

    let f = first.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    let l = last.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return {data: wantedData, days: wantedDays, message: `${f} to ${l}`, first: first, last: last}
  },
  month: (data, monthsBack) => {
    let beginning = new Date(formatedDate[3], formatedDate[1] - monthsBack - 1, 1);
    let nextMonth = new Date(formatedDate[3], formatedDate[1] - monthsBack, 1);
    let lastDayOfMonth = new Date(nextMonth - 1);
    let numDays = lastDayOfMonth.getDate();
    let wantedData = [];
    let wantedDays = [];
    let first = beginning;
    let last = new Date();
    for (let i = 0; i < numDays; i++) {
      let n = new Date(beginning.getFullYear(), beginning.getMonth(), beginning.getDate() + i)
      let formatted = mmddyyyy(n)[0]
      if (i == numDays - 1) {
        last = n
      }
      wantedData.push(data[formatted])
      wantedDays.push(formatted)
    }
    return {data: wantedData, days: wantedDays, message: `${months[beginning.getMonth()]} ${beginning.getFullYear()}`,first: first, last: last}
  },
  year: (data, monthsBack) => {
    let wantedDays = [];
    let wantedData = [];
    let date = new Date(formatedDate[3] - monthsBack, 0, 1); // Start from January 1st
    let last = date;
    while (date.getFullYear() === formatedDate[3] - monthsBack) {
      let x = new Date(date)
      wantedDays.push(mmddyyyy(x)[0]); // Add the current date to the array
      wantedData.push(data[mmddyyyy(x)[0]])
      
      last = date
      date.setDate(date.getDate() + 1); // Move to the next day
    }
    return {data: wantedData, days: wantedDays, message: `Year of ${date.getFullYear() - 1}`, first: new Date(formatedDate[3] - monthsBack, 0, 1), last: last};
  },
  all_time: []
}

let getPiChartData = (data) => {
  let act = {}
  let total = 0
  for (let i = 0; i < data.length; i++) {
    if (data[i] == null) {
      continue
    }
    for (const [key, value] of Object.entries(data[i])) {
      if (key in act) {
        act[key] += value['duration']
      } else {
        act[key] = value['duration']
      }
      total += value['duration']
    }
  }
  let pcData = []
  let other = 0
  for (const [key, value] of Object.entries(act)) {
    let percentage = (value / total)
    if (percentage < 0.02) {
      other += value
    } else {
      pcData.push({name: key, y: parseFloat((percentage * 100).toFixed(2))})
    }
  }
  if (other > 0) {
    pcData.push({name: 'other', y: parseFloat((other / total * 100).toFixed(2))})
  }
  return pcData
}

let displayPiChart = (d) => {
  Highcharts.chart('pi-chart', {
    chart: {
      type: 'pie',
      height: '75%',
      backgroundColor: 'rgb(18, 18, 18, 0)',
    },
    title: {
      text: 'Activities Pie Chart',
      style: {
        color: '#66b0fa',
        'textShadow': '0 0 7px #66b0fa',
        letterSpacing: '0.025em'
      }
    },
    credits: {
      enabled: false
    },
    tooltip: {
      valueSuffix: '%'
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: [{
          enabled: true,
          distance: 20,
          style: {
            backgroundColor: 'rgb(0, 0, 0, 0)',
            textOutline: 'none',
            color: 'white',
            fontFamily: 'Comfortaa'
          }
        }, {
          enabled: true,
          distance: -40,
          format: '{point.percentage:.1f}%',
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        }]
      }
    },
    series: [
      {
        name: 'Percentage',
        colorByPoint: true,
        data: d
      }
    ]
  });
}

// let getHeatMapData = (data, times) => {
//   for (let i = 0; i < data.length; i++) {
    
//   }
// }

function Analytics() {
  let [allData, setAllData] = useState({})
  let [timeFrame, setTimeFrame] = useState('week')
  let [timeBack, setTimeBack] = useState(0)
  let [activeButton, setActiveButton] = useState(1)
  // let [heatBack, setHeatBack] = useState(0)

  const fetchAllActivities = async () => {
    try {
      const data = await ApiService.getAllData();
      await setAllData(data)
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  }

  const handleButtonClick = (buttonIdx) => {
    setActiveButton(buttonIdx)
  }

  useEffect(() => {
    fetchAllActivities();
  }, []);

  // Pie Chart
  useEffect(() => {
    if (time_frames[timeFrame](allData, timeBack)['data'].some(x => x != null)) {
      let x = getPiChartData(time_frames[timeFrame](allData, timeBack)['data']);
      displayPiChart(x);
    }
  }, [allData, timeBack, timeFrame]);

  // // Heat Map
  // useEffect(() => {
    
  //   let x = getPiChartData(time_frames[timeFrame](allData, timeBack)['data']);
  //   displayHeatMap(x);
  // }, [allData, timeBack, timeFrame]);

  return (
    <>
    <section className='chart-section'>
      <div className='time-row'>
        <h3 className='backButton' title='Back' onClick={() => {
          setTimeBack(timeBack + 1)
        }}>🡸</h3>

        <h3>{time_frames[timeFrame](allData, timeBack)['message']}</h3>

        {timeBack == 0 ? (
          <div></div>
        ) : (
          <h3 className='backButton' title='Forward' onClick={() => {
            setTimeBack(timeBack - 1)
          }}>🡺</h3>
        )}
      </div>
      <div className='flex-container'>
        <div className='time-frames'>
          <button className={activeButton === 1 ? "selected" : "time-button"}
onClick={() => {
            setTimeFrame('week')
            setTimeBack(0)
            handleButtonClick(1)
          }}>Week</button>
          <button className={activeButton === 2 ? "selected" : "time-button"}
onClick={() => {
            setTimeFrame('month')
            setTimeBack(0)
            handleButtonClick(2)
          }}>Month</button>
          <button className={activeButton === 3 ? "selected" : "time-button"}
onClick={() => {
            setTimeFrame('year')
            setTimeBack(0)
            handleButtonClick(3)
          }}>Year</button>
        </div>
        <div className='charts'>
          {time_frames[timeFrame](allData, timeBack)['data'].some(x => x != null) ? (
            <div id='pi-chart-container'>
              <div id="pi-chart"></div>
            </div>
          ) : (
            <h3>No data for this {timeFrame}!</h3>
          )}
        </div>
        <div className='empty'></div>
      </div>
    </section>
    <section>
      <h1>test</h1>
    </section>
    {/* use <section> tag to create more sections */}
    </>
  );
}

export default Analytics