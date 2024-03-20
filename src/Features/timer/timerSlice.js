import { createSlice } from '@reduxjs/toolkit';


const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        currentStatus: 'idle',
        status: ['idle', 'start', 'stop', 'expiring', 'expired'],
        alarm: 'off',
        length: 25
    },
    reducers: {
        play(state) {
            if (state.currentStatus === 'start' || state.currentStatus === 'expiring') {
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
            if (state.currentStatus === 'start' || state.currentStatus === 'expiring') {
                state.currentStatus = state.status[2]
            } else {

                state.currentStatus = state.status[1]
            }
        },
        reset(state) {
            console.log('reset state')
            state.currentStatus = 'idle';
            state.alarm = 'off';
            state.length = 25;
        }
    }
})

export const { play, pause, reset, setExpired, setExpiring, replay } = timerSlice.actions;

export const currentStatus = state => state.timer.currentStatus;
export const alarmStatus = state => state.timer.alarm;
export const length = state => state.timer.length;
export default timerSlice.reducer;