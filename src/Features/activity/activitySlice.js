import { createSlice } from '@reduxjs/toolkit';
const activitySlice = createSlice({
    name: 'activity',
    initialState: {
        lengthBreak: 5,
        lengthSession: 25
    },
    reducers: {
        increment(state, action) {
            if (action.payload === 'break') {

                state.lengthBreak++;
            }
            if (action.payload === 'session') {

                state.lengthSession++;
            }
        },
        decrement(state, action) {
            if (state.lengthBreak > 1 && action.payload === 'break') {

                state.lengthBreak--;
            }
            if (state.lengthSession > 1 && action.payload === 'session') {

                state.lengthSession--;
            }
        },
        resettingActivity(state) {
            state.lengthBreak = 5;
            state.lengthSession = 25;
        }
    }
})
export const breakLength = state => state.activity.lengthBreak;
export const sessionLength = state => state.activity.lengthSession;
export const { increment, decrement, resettingActivity } = activitySlice.actions;
export default activitySlice.reducer;