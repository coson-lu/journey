import './activityrow.css';
import ApiService from './Api';

function ActivityRow(props) {
  const col = props.color % 2 === 0 ? '#48A3FF' : '#ffffff';

  return (
    <>
      <div className='row-container'>
        <p id='activity' style={{ color: col }}>
          <span
            id='trash'
            onClick={async () => {
              try {
                await ApiService.deleteData(props.activity);
                props.fetchActivities(); // Call fetchActivities after deleting
              } catch (error) {
                console.error('Error deleting activity:', error);
              }
            }}
          >
            🗑️
          </span>{' '}
          {props.activity}
        </p>
        <p id='duration' style={{ color: col }}>{props.duration}</p>
      </div>
    </>
  );
}

export default ActivityRow;
