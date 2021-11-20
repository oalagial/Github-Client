import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {config} from '../../config';


//create actions
export const fetchUsersAction = createAsyncThunk('users/list', 
async ( {page, sortBy}, {rejectWithValue, getState, dispatch}) => {
    try {
        // make http call
         const {data} = await axios.get(`https://api.github.com/search/users?q=language:javascript+type:user&sort=${sortBy}&order
         =desc&page=${page}&per_page=10`, config);
         return data; //action payload
    } catch (error) {
        if(!error?.response){
            throw error
        }
        return rejectWithValue(error?.response);
    }
});

//add followee
export const fetchFolloweeAction = createAsyncThunk('followee/list', 
async ({followee, addFlag}, {rejectWithValue, getState, dispatch}) => {
    return {followee,addFlag};
});


// Slices
const githubClientSlices = createSlice({
    name: "githubClient",
    initialState: { followees: [] },
    extraReducers: builder => {
      //Users using javascript
      builder.addCase(fetchUsersAction.pending, (state, action) => {
        state.loading = true;
        state.users = undefined;
      });
      builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
        state.users = action?.payload;
        state.loading = false;
        state.error = undefined;
      });
      builder.addCase(fetchUsersAction.rejected, (state, action) => {
        state.loading = false;
        state.users = undefined;
        state.error = action.payload;
      });
      // Followees
      builder.addCase(fetchFolloweeAction.pending, (state, action) => {

      });
      builder.addCase(fetchFolloweeAction.fulfilled, (state, action) => {
        console.log(state.followees);
        if(action.payload.addFlag === true) {
          state.followees.push(action.payload.followee)
        } else {
          state.followees = state.followees.filter((item) => {
            return item.login !== action.payload.followee.login;
        })
        }
        state.error = undefined;
      });
      builder.addCase(fetchFolloweeAction.rejected, (state, action) => {
        state.error = action.payload;
      });
    },
  });
  
  // get the reducer
  export default githubClientSlices.reducer;