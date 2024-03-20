import { configureStore } from '@reduxjs/toolkit';
import timerReducer from '../Features/timer/timerSlice';
import activityReducer from '../Features/activity/activitySlice';

export default configureStore({
    reducer: {
        "timer": timerReducer,
        "activity": activityReducer
    }
})