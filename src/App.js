import './App.css';

function App() {
  const playAudio = (milliseconds) => {

    let timer = setTimeout(() => {
      document.getElementById("beep").style.visibility = 'visible';
      document.getElementById("beep").play();
    }, milliseconds)
    setTimeout(() => {
      document.getElementById("beep").style.visibility = 'hidden';
      clearTimeout(timer);
    }, 10000)
  }
  return (
    <div className="App">
      <h1>25+5 Clock</h1>

      <div>
        <span id="break-label">

          <strong>Break Length</strong>
          <div>
            <button id="break-decrement">&#8595;</button><span id="break-length">5</span><button id="break-increment">&#8593;</button>
          </div>
        </span>
        <span id="session-label">

          <strong>Session Length</strong>
          <div>
            <button id="session-decrement">&#8595;</button><span id="session-length">25</span><button id="session-increment">&#8593;</button>
          </div>
        </span>
        <div id="timer-label">
          <span>Session</span>
          <div id="time-left">25:00</div>
          <div><button id="start_stop" onClick={() => playAudio(3000)}>&#9658;</button><button>&#x23E9;&#xFE0E;</button><button id="reset">&#10561;</button></div>
        </div>
      </div>
    </div >
  );
}

export default App;
