import React from 'react'
import {render} from "@testing-library/react";
import {AppContent} from "./AppContent";
import {initStore} from "../state/store";
import {StateMachineProvider} from "little-state-machine";
import {createMemoryHistory} from "history";
import {MemoryRouter, Router} from 'react-router-dom'

describe('renderings', () => {
    beforeAll(() => {
        initStore()
    })

    it('should render without crash', () => {

        render(
            <StateMachineProvider>
                <AppContent/>
            </StateMachineProvider>
            , {wrapper: MemoryRouter}
        )
    });
})