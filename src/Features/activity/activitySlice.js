import { createSlice } from '@reduxjs/toolkit';
const activitySlice = createSlice({
    name: 'activity',
    initialState: {
        lengthBreak: 5,
        lengthSession: 25
    },
    reducers: {
        increment(state, action) {
            if (action.payload == 'break') {

                state.lengthBreak++;
            }
            if (action.payload == 'session') {

                state.lengthSession++;
            }
        },
        decrement(state, action) {
            if (state.lengthBreak > 1 && action.payload == 'break') {

                state.lengthBreak--;
            }
            if (state.lengthSession > 1 && action.payload == 'session') {

                state.lengthSession--;
            }
        }
    }
})
export const breakLength = state => state.activity.lengthBreak;
export const sessionLength = state => state.activity.lengthSession;
export const { increment, decrement } = activitySlice.actions;
export default activitySlice.reducer;