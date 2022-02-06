import {createAsyncThunk} from "@reduxjs/toolkit";
import {listUser} from "features/user/state/userSlice";
import {listPlayer} from "features/player/state/playerSlice";

// Alle Daten laden, dazu werden die einzelnen list-Methoden aufgerufen
export const loadData = createAsyncThunk(
    'loadData',
    async (_, thunkApi) => {
        thunkApi.dispatch(listUser())
        thunkApi.dispatch(listPlayer())
    }
)
