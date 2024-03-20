import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { breakLength, sessionLength } from '../activity/activitySlice';
import './Timer.css';
import {
    play,
    pause,
    reset,
    replay,
    setExpired,
    setExpiring,
    currentStatus,




} from './timerSlice';
import { useEffect } from 'react';
const Timer = () => {
    const breakL = useSelector(breakLength);
    const sessionL = useSelector(sessionLength);
    const status = useSelector(currentStatus)
    const [activityType, setActivityType] = useState('session');
    const [minute, setMinute] = useState(sessionL)
    const [second, setSecond] = useState(59);
    const [color, setColor] = useState('black')
    console.log(minute)

    const dispatch = useDispatch();

    useEffect(() => {

        let interval = setInterval(() => {

            if (status === 'start') {
                // console.log("second", second < 59, "minute", minute, "current status", status)
                if (minute > 0 && second < 59) {

                    setSecond(prevSecond => prevSecond + 1)
                }

                else if (minute > 0 && second === 59) {
                    setMinute(prevMinute => prevMinute - 1);

                    setSecond(0);

                }
                else if (minute === 0) {
                    setColor('red');
                    setSecond(prevSecond => prevSecond + 1);
                    dispatch(setExpiring())

                }
            } else if (status === 'expiring') {

                if (second === 59) {
                    dispatch(setExpired())
                } else {

                    setSecond(prevSecond => prevSecond + 1);
                }

            } else if (status === 'expired') {
                if (activityType === 'session') {
                    setActivityType('break');
                    setMinute(breakL);

                } else {
                    setActivityType('session');
                    setMinute(sessionL);

                }
                setSecond(59);
                setColor('black')
                dispatch(replay())
            }
            else if (activityType === 'session' && sessionL !== minute) {
                setMinute(sessionL)
            }
            else if (activityType === 'break' && breakL !== minute) {
                setMinute(breakL)
            }

        }, 1000);

        return () => clearInterval(interval)

    }, [minute, second, color, activityType, status, breakL, sessionL, dispatch]);
    const timer = () => {

        dispatch(play());

    }

    return (<div id="timer-label">
        <span>{activityType.toUpperCase()}</span>
        <div id="time-left" style={{ color }}>{minute}:{String(59 - second).length === 1 ? '0' + String(59 - second) : String(59 - second)}</div>
        <div>
            <button id="start_stop" onClick={() => timer()}>&#9658;</button>
            <button onClick={() => dispatch(pause())}>&#x23E9;&#xFE0E;</button>
            <button id="reset" onClick={() => dispatch(reset())}>&#10561;</button>
        </div>
    </div>)
}
export default Timer;