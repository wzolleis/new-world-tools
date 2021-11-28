import {GlobalState} from "little-state-machine";

import actionCreatorFactory from 'typescript-fsa';
import {AppError, City} from "common/types/commonTypes";

const actionCreator = actionCreatorFactory();
// specify parameters and result shapes as generic type arguments
const saveCityAction =
    actionCreator.async<{ city: City },   // parameter type
        { city: City },   // success type
        { appError: AppError }   // error type
        >('SAVE_CITY_ACTION');

const saveCity = (state: GlobalState, city: City) => {
    saveCityAction.started({city})

    saveCityAction.done({result: {city}, params: {city}})
}