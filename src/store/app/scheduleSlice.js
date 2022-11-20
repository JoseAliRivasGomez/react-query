import { createSlice } from '@reduxjs/toolkit';

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        isLoadingSchedules: true,
        schedules: [],
        activeSchedule: null
    },
    reducers: {
        onSetActiveSchedule: (state, {payload} ) => {
            state.activeSchedule = payload;
        },
        onAddNewSchedule: (state, {payload} ) => {
            state.schedules.push(payload);
            state.activeSchedule = null;
        },
        onUpdateSchedule: (state, {payload} ) => {
            state.schedules = state.schedules.map( schedule => {

                if(schedule.id === payload.id){
                    return payload;
                }

                return schedule;
            });
        },
        onDeleteSchedule: (state) => {
            if (state.activeSchedule){
                state.schedules = state.schedules.filter(schedule => schedule.id !== state.activeSchedule.id);
                state.activeSchedule = null;
            }
        },
        onLoadSchedules: (state, {payload = []} ) => {
            state.isLoadingSchedules = false;
            state.schedules = payload;
            // payload.forEach(schedule => {
            //     const exists = state.schedules.some(dbSchedule => dbSchedule.id === schedule.id);
            //     if (!exists){
            //         state.schedules.push(schedule);
            //     }
            // })
        },
        onLogoutSchedules: (state) => {
            state.isLoadingSchedules = true;
            state.schedules = [];
            state.activeSchedule = null;
        },
    }
});

export const { onSetActiveSchedule, onLoadSchedules, onLogoutSchedules, onAddNewSchedule, onUpdateSchedule, onDeleteSchedule } = scheduleSlice.actions;