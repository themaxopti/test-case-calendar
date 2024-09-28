import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import moment from 'moment'
import { v4 as uuidv4 } from "uuid";

interface Event {
    id?: string
    title: string,
    start: string,
    end: string
    date: any
    notes:string
}

interface CalendarState {
    events: Event[]
}

const initialState: CalendarState = {
    events: [
        {
            id: uuidv4(),
            title: "Sample Event",
            start: new Date() as any,
            end: new Date(moment().add(1, "hours") as any) as any,
            date: new Date(),
            notes:'some notes'
        },
    ]
}

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<Event>) => {
            state.events?.push(action.payload)
        },
        editEvent: (state, action: PayloadAction<Event>) => {
            const {date,end,id,notes,start,title} = action.payload
            const event = state.events.find(el => el.id === id)
            
            if(!event){
                return
            }
            event.end = end
            event.notes = notes
            event.start = start
            event.title = title
            event.date = date
        },
    },
})

export const {
    addEvent,
    editEvent
} = calendarSlice.actions


export const eventsSelector = (state: RootState) => state.calendar.events

export const calendarReducer = calendarSlice.reducer