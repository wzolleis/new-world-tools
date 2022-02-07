import {createAsyncThunk} from "@reduxjs/toolkit";
import {listUser} from "features/user/state/userSlice";
import {listPlayer} from "features/player/state/playerSlice";
import {listCity} from "features/cities/state/citiesSlice";
import {listStorage} from "features/storage/state/storageSlice";

// Alle Daten laden, dazu werden die einzelnen list-Methoden aufgerufen
export const loadData = createAsyncThunk(
    'loadData',
    async (_, thunkApi) => {
        thunkApi.dispatch(listUser())
        thunkApi.dispatch(listPlayer())
        thunkApi.dispatch(listCity())
        thunkApi.dispatch(listStorage())
    }
)
