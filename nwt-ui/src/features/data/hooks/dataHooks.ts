import {useAppDispatch} from "app/state/hooks";
import {useEffect} from "react";
import {loadData} from "features/data/state/dataSlice";


export const useLoadData = (deps: any[] = []) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadData())
    }, deps)
}