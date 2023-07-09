import React, { useState } from "react";
import Text from "./components/Text";
import Timer from "./components/Timer";
import Form from "./components/Form";
import ErrorMessage from "./components/ErrorMessage";

export default function App() {
  const [isDateError, setIsDateError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [timerDate, setTimerDate] = useState('')
  const [timeDirection, setTimeDirection] = useState('0')

  const startTimer = date => {
    if (date === undefined) {
      setErrorText('You havn\'t selected a date or this date is already being tracked.')
      setIsDateError(true)
      return false
    }

    let now = Date.now()
    now = new Date(now)
    date = new Date(date)
    const nowDate = now.toISOString().slice(0, now.toISOString().indexOf('T'))
    const dateDate = date.toISOString().slice(0, date.toISOString().indexOf('T'))

    if (nowDate === dateDate) {
      setErrorText('Enter a date that is different from today!')
      setIsDateError(true)
      return false
    }

    setTimerDate(dateDate)
    const diffDate = (now - date)
    if (diffDate < 0) setTimeDirection(1)
    if (diffDate > 0) setTimeDirection(-1)

  }

  const closeErrorMessage = () => {
    setIsDateError(false)
    document.removeEventListener('click', e => {
      if (e.target !== errorBox) closeErrorMessage()
    })
  }

  let errorBox;
  let localStorageDate = localStorage.getItem('DateTimer') !== null ? new Date(JSON.parse(localStorage.getItem('DateTimer')).prevDate) : null

  return (
    <div className="App">
      <Text timeDirection={ timeDirection } />

      <Timer date={ timerDate || localStorageDate } />

      <Form onStart={ startTimer } />

      {isDateError && 
      <div ref={el => errorBox = el}>
        <ErrorMessage error={ errorText } onClose={ closeErrorMessage } />
      </div>
      }
    </div>
  );  
}