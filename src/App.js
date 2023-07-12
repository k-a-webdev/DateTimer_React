import React, { useState } from "react";
import Text from "./components/Text";
import Timer from "./components/Timer";
import Form from "./components/Form";
import ErrorMessage from "./components/ErrorMessage";

export default function App() {
  const [isDateError, setIsDateError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [timerDate, setTimerDate] = useState(null);
  const [timeDirection, setTimeDirection] = useState('0');
  const [textDate, setTextDate] = useState(null)

  // Func for start timer
  const startTimer = date => {
    // If empty input of date
    if (date === undefined) {
      setErrorText('You havn\'t selected a date or this date is already being tracked.');
      setIsDateError(true);
      return;
    }

    let now = new Date();
    date = new Date(date);
    const nowDate = now.toISOString().slice(0, now.toISOString().indexOf('T'));
    const dateDate = date.toISOString().slice(0, date.toISOString().indexOf('T'));

    // If selected date is today
    if (nowDate === dateDate) {
      setErrorText('Enter a date that is different from today!');
      setIsDateError(true);
      return;
    }

    setTimerDate(dateDate); // Date for timer

    // Choosing a variation of the title
    const diffDate = (now - date);
    if (diffDate < 0) setTimeDirection(1);
    else if (diffDate > 0) setTimeDirection(-1);

  }

  // Func on the close button in the error push message
  const closeErrorMessage = () => {
    setIsDateError(false);
    document.removeEventListener('click', e => { if (e.target !== errorBox) closeErrorMessage(); });
  }

  // When the timer runs out
  const stopTimer = () => setTimeDirection(0);

  let errorBox; // For ref link Error block

  // If we have a date in localstorage
  let localStorageDate = localStorage.getItem('DateTimer') !== null ? new Date(JSON.parse(localStorage.getItem('DateTimer')).prevDate) : null;

  // The function with the help of which the date with which the timer works will be displayed
  const forTextDate = date => setTextDate(() => {
    try {
      if (date.indexOf('T') !== -1) return date.slice(0, date.indexOf('T'));
      else return date;
    } catch {}
  })

  return (
    <div className="App">
      <Text timeDirection={ timeDirection } date={ textDate } />

      <Timer date={ timerDate || localStorageDate } onStop={ stopTimer }  onSetTextDate={ forTextDate }/>

      <Form onStart={ startTimer } />

      {isDateError && 
      <div ref={el => errorBox = el}>
        <ErrorMessage error={ errorText } onClose={ closeErrorMessage } />
      </div>
      }
    </div>
  );  
}