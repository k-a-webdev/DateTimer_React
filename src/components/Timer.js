import { useEffect, useState } from "react";
import CalcTimer from "./CalcTimer";

export default function Timer(props) {
    const [timerDays, setTimerDays] = useState(0);
    const [timerHours, setTimerHours] = useState(0);
    const [timerMinutes, setTimerMinutes] = useState(0);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [timer, setTimer] = useState('')
    const [tempDate, setTempDate] = useState('')

    let myTimer;
    let localStorageDate = localStorage.getItem('DateTimer') !== null ? new Date(JSON.parse(localStorage.getItem('DateTimer')).prevDate) : null

    function tick() {
        if (timerDays === '00' && timerHours === '00' && timerMinutes === '00' && timerSeconds === '00') {
            return
        }
    
        setTimer(() => {
            CalcTimer(props.date)
            return JSON.parse(localStorage.getItem('DateTimer'))
        })
        setTimerDays(timer.days)
        setTimerHours(timer.hours)
        setTimerMinutes(timer.minutes)
        setTimerSeconds(timer.seconds)
    }
    myTimer = setTimeout(() => {
        tick(localStorageDate)
        myTimer = setTimeout(tick)
    })

    if (props.date !== '') {    
        if (props.date !== tempDate) {
            clearTimeout(myTimer)

            setTempDate(props.date)
            
            myTimer = setTimeout(() => {
                tick()
                myTimer = setTimeout(tick)
            })
        }    
        
    } else {
        clearTimeout(myTimer)
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