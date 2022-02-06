// const restApi = axios.create({
//     baseURL: 'http://localhost:5000/api',
//     timeout: 1000
// });
//
// interface SelectionState {
//     selection: AppSelection
// }
//
// interface FetchSelectionResponse {
//     user: string | undefined
//     player: string | undefined
// }
//
// // First, create the thunk
// export const loadSelection = createAsyncThunk<FetchSelectionResponse>(
//     'selection/loadSelection',
//     async (_, thunkAPI) => {
//         const response = await restApi.get<FetchSelectionResponse>('/selection')
//         const responseData: FetchSelectionResponse = response.data
//         return {
//             ...responseData
//         }
//     }
// )
//
// // First, create the thunk
// export const saveSelection = createAsyncThunk(
//     'selection/saveSelection',
//     async (selection: AppSelection, thunkAPI) => {
//         await restApi.post('/selection', {
//             user: selection.user,
//             player: selection.player
//         })
//         return selection
//     }
// )
//
// const initialState: SelectionState = {
//     selection: {
//         user: undefined,
//         player: undefined
//     }
// }
//
//
// // Then, handle actions in your reducers:
// const selectionSlice = createSlice({
//     name: 'selection',
//     initialState,
//     reducers: {
//         updateSelection: (state: SelectionState, action: PayloadAction<AppSelection>) => {
//             state.selection = action.payload
//         }
//         // standard reducer logic, with auto-generated action types per reducer
//     },
//     extraReducers: (builder) => {
//         // Add reducers for additional action types here, and handle loading state as needed
//         builder.addCase(loadSelection.fulfilled, (state, action) => {
//             state.selection = {
//                 ...action.payload
//             }
//         })
//         builder.addCase(saveSelection.fulfilled, (state, action) => {
//             state.selection = {
//                 ...action.payload
//             }
//         })
//     },
// })
//
// // Other code such as selectors can use the imported `RootState` type
// export const selectSelection = (state: RootState) => state.selectionState
//
// const {actions, reducer} = selectionSlice
//
// export const {updateSelection} = actions
//
// export default reducer

const dummy = 0
export default dummy