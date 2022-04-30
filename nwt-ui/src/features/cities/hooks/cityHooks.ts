import {useAppDispatch} from "app/state/hooks";
import {useEffect} from "react";
import {listCity} from "features/cities/state/citiesSlice";

export const useLoadCities = (deps: any[] = []) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(listCity())
    }, deps)
}
