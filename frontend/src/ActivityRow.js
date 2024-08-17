import './activityrow.css';

function ActivityRow(props) {
  return (
    <>
      <div className='container'>
        <p id='activity'>{ props.activity }</p>
        <p id='duration'>{ props.duration }</p>
      </div>
    </>
  );
}

export default ActivityRow