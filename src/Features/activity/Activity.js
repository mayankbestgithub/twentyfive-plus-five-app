import { useDispatch, useSelector } from 'react-redux'
import { breakLength, sessionLength, increment, decrement } from './activitySlice'
import { currentStatus } from '../timer/timerSlice'
import './Activity.css';
const Activity = () => {
    const breakL = useSelector(breakLength);
    const sessionL = useSelector(sessionLength);
    const status = useSelector(currentStatus)
    const dispatch = useDispatch();
    return (<div>
        <span id="break-label">

            <strong>Break Length</strong>
            <div>
                <button id="break-decrement" onClick={() => ['stop', 'idle'].includes(status) && dispatch(decrement('break'))}>&#8595;</button>
                <span id="break-length">{breakL}</span>
                <button id="break-increment" onClick={() => ['stop', 'idle'].includes(status) && dispatch(increment('break'))}>&#8593;</button>
            </div>
        </span>
        <span id="session-label">

            <strong>Session Length</strong>
            <div>
                <button id="session-decrement" onClick={() => ['stop', 'idle'].includes(status) && dispatch(decrement('session'))}>&#8595;</button>
                <span id="session-length">{sessionL}</span>
                <button id="session-increment" onClick={() => ['stop', 'idle'].includes(status) && dispatch(increment('session'))}>&#8593;</button>
            </div>
        </span>
    </div>)
}
export default Activity;