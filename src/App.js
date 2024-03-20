import { useEffect } from 'react';
import './App.css';
import Activity from './Features/activity/Activity';
import Timer from './Features/timer/Timer';
import { alarmStatus } from './Features/timer/timerSlice'
import { useSelector } from 'react-redux';
function App() {
  const alarm = useSelector(alarmStatus)
  const playAudio = (milliseconds) => {

    let timer = setTimeout(() => {
      document.getElementById("beep").style.visibility = 'visible';
      document.getElementById("beep").play();
    }, milliseconds)
    setTimeout(() => {
      document.getElementById("beep").style.visibility = 'hidden';
      clearTimeout(timer);
    }, 5000)
  }
  useEffect(() => {
    if (alarm === 'on') {
      console.log('play audio')
      playAudio(3000);
    }

  }, [alarm])
  return (
    <div className="App">
      <h1>25+5 Clock</h1>
      <Activity></Activity>
      <Timer></Timer>
    </div >
  );
}

export default App;
