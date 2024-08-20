import './activityrow.css';

function ActivityRow(props) {
  const col = props.color % 2 === 0 ? '#4284ff' : '#ffffff'
  console.log(props.color)
  return (
    <>
      <div className='row-container'>
        <p id='activity' style={{color:col}}>{ props.activity }</p>
        <p id='duration' style={{color:col}}>{ props.duration }</p>
      </div>
    </>
  );
}

export default ActivityRow