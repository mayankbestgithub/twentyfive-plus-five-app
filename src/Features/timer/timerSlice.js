import { createSlice } from '@reduxjs/toolkit';


const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        currentStatus: 'idle',
        status: ['idle', 'start', 'stop', 'expiring', 'expired'],
        alarm: 'off'
    },
    reducers: {
        play(state) {
            if (state.currentStatus === 'start') {
                state.currentStatus = state.status[2]
            } else {

                state.currentStatus = state.status[1]
            }
            state.alarm = 'off';
        },
        replay(state) {
            state.currentStatus = state.status[1];
            state.alarm = 'off';
        },
        setExpiring(state) {
            state.currentStatus = state.status[3];
        },
        setExpired(state) {
            state.currentStatus = state.status[4];
            state.alarm = 'on'
        },
        pause(state) {
            state.currentStatus = state.status[2];
        },
        reset(state) {
            state.currentStatus = 'idle';
            state.alarm = 'off';
        }
    }
})

export const { play, pause, reset, setExpired, setExpiring, replay } = timerSlice.actions;

export const currentStatus = state => state.timer.currentStatus;
export const alarmStatus = state => state.timer.alarm;
export default timerSlice.reducer;