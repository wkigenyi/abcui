const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
  isAuthenticated:false,
  isLoading:true
}

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    setAuth: state =>{
      state.isAuthenticated = true
    },
    logout: state =>{
      state.isAuthenticated = false
    },
    finishInitialLoading: state =>{
      state.isLoading = false
    }
  }
})

export const {finishInitialLoading,logout,setAuth} = authSlice.actions
export default authSlice.reducer