// To change the title according to whether the date is due or has already passed
let localStorageDate = localStorage.getItem('DateTimer') !== null ? new Date(JSON.parse(localStorage.getItem('DateTimer')).prevDate) : null
let dateDiff;
document.addEventListener("DOMContentLoaded", () => { if (localStorageDate !== null) dateDiff = new Date() - localStorageDate; });

export default function Text(props) {
    
    const timeDirection = () => {
        if ([-1, 0, 1].includes(props.timeDirection)) return props.timeDirection;
        else if (localStorageDate !== null) return (-1 * Math.sign(dateDiff));
        else return 0;
    }

    return (
        <div className="text">
        {timeDirection() === 1 ?
            <h1>Coming soon</h1>
            :
            timeDirection() === -1 ?
                <h1>Have passed</h1>
                :
                <h1>Time is up</h1>
        }

        <p>
            A timer that you can use in everyday life for better time management
            <br />
            He can count days in both directions
        </p>
        </div>
    );
}
  