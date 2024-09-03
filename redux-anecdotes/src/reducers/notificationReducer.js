import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setContent(state, action) {
      const notification = action.payload
      return notification
    },
    setEmpty(state, action) {
      return ""
    }
  }
})

export const { setContent, setEmpty } = notificationSlice.actions

export const setNotification = (text, time) => {
  return async dispatch => {
      setTimeout(() => {
        dispatch(setEmpty())
      }, time * 1000)
      dispatch(setContent(text))
  }
}

export default notificationSlice.reducer