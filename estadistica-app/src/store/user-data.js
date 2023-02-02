import { createSlice } from "@reduxjs/toolkit"

const initialDataState = {data: []};
const dataSlice = createSlice({
    name:"Data",
    initialState: initialDataState,
    reducers:{
        addData(state,action){ // addData({nombre})
            state.data.push(action.payload);
            console.log(action.payload);
            state.data.sort((a,b)=>a-b);
        },
        deleteData(state,action){
            state.data = state.data.filter((data,index)=>index != action.payload);
            state.data.sort((a,b)=>a-b);
        }
    }
});
export const dataActions = dataSlice.actions;
export const dataReducer =  dataSlice.reducer;