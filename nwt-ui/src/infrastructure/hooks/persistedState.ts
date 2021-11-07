import {useState, useEffect} from 'react'

type PersistedState = Array<any>

export const usePersistedState = (key: string, defaultValue: string): PersistedState => {
    const itemOrNull = localStorage.getItem(key)
    let value = null
    if (itemOrNull != null) {
        value = JSON.parse(itemOrNull)
    }

    const [state, setState] = useState(value || defaultValue);
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
}