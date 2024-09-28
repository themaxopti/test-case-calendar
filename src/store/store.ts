import { configureStore } from '@reduxjs/toolkit'
import { calendarReducer } from './calendar.reducer'

export const store = configureStore({
  reducer: {
    calendar: calendarReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch