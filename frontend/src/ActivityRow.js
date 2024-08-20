import './activityrow.css';

function ActivityRow(props) {
  const col = props.color % 1 === 0 ? '#036ffc' : '#000000'
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