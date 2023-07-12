import { useState } from "react";
import CalcTimer from "./CalcTimer";

export default function Timer(props) {
    const [timerDays, setTimerDays] = useState(0);
    const [timerHours, setTimerHours] = useState(0);
    const [timerMinutes, setTimerMinutes] = useState(0);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [timer, setTimer] = useState('');
    const [tempDate, setTempDate] = useState('');

    let myTimer;
    let localStorageDate = localStorage.getItem('DateTimer') !== null ? new Date(JSON.parse(localStorage.getItem('DateTimer')).prevDate) : null;

    // Func for changing time
    const tick = () => {
        if (String(timerDays) === '0' && String(timerHours) === '00' && String(timerMinutes) === '00' && String(timerSeconds) === '00') {
            localStorage.removeItem('DateTimer');
            props.onStop();
            return;
        }
    
        setTimer(() => {
            CalcTimer(props.date);
            return JSON.parse(localStorage.getItem('DateTimer'));
        })
        setTimerDays(timer.days);
        setTimerHours(timer.hours);
        setTimerMinutes(timer.minutes);
        setTimerSeconds(timer.seconds);

        props.onSetTextDate(timer.prevDate)
    }

    // Creating a setTimout for constant updating
    myTimer = setTimeout(() => {
        tick(localStorageDate);
        myTimer = setTimeout(tick);
    });

    // If data from the form has updated
    if (props.date !== null) {    
        if (props.date !== tempDate) {
            clearTimeout(myTimer);

            setTempDate(props.date);
            
            myTimer = setTimeout(() => {
                tick();
                myTimer = setTimeout(tick);
            })
        }    
        
    } else {
        clearTimeout(myTimer);
    }

    return (
      <div className="timer">
        <div>
            <h3>{ timerDays }</h3>
            <p>days</p>
        </div>

        <div>
            <h3>{ timerHours }</h3>
            <p>hours</p>
        </div>

        <div>
            <h3>{ timerMinutes }</h3>
            <p>minutes</p>
        </div>

        <div>
            <h3>{ timerSeconds }</h3>
            <p>seconds</p>
        </div>
      </div>
    );
}  