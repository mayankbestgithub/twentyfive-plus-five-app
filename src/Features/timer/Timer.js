import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { breakLength, sessionLength, resettingActivity } from '../activity/activitySlice';
import './Timer.css';
import {
    play,
    pause,
    reset,
    replay,
    setExpired,
    setExpiring,
    currentStatus,
    length




} from './timerSlice';
import { useEffect } from 'react';
const Timer = () => {
    const breakL = useSelector(breakLength);
    const sessionL = useSelector(sessionLength);
    const status = useSelector(currentStatus);
    const timerLength = useSelector(length);
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


        }, 1000);

        return () => clearInterval(interval)

    }, [minute, second, color, activityType, status, breakL, sessionL, timerLength, dispatch]);
    useEffect(() => {
        if (activityType === 'session' && sessionL !== timerLength) {
            setMinute(sessionL)
            setSecond(59)
        }
        else if (activityType === 'break' && breakL !== timerLength) {
            setMinute(breakL)
            setSecond(59)
        }
    }, [activityType, timerLength, breakL, sessionL]);
    const timer = () => {

        dispatch(play());

    }
    const resetting = () => {
        dispatch(reset())
        dispatch(resettingActivity())
        setActivityType('session')
        setMinute(timerLength);
        setSecond(59)
    }
    return (<div><div id="timer-label">
        <span style={{ color }}>{activityType.toUpperCase()}</span>
        <div id="time-left" style={{ color }}>{minute}:{String(59 - second).length === 1 ? '0' + String(59 - second) : String(59 - second)}</div>
    </div>
        <div>
            <button id="start_stop" onClick={() => timer()}>&#9658;</button>
            <button onClick={() => dispatch(pause())}>&#x23E9;&#xFE0E;</button>
            <button id="reset" onClick={() => resetting()}>&#10561;</button>
        </div>
    </div>)
}
export default Timer;