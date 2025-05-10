import React, { createContext, useState } from 'react';
import getState from './flux';

export const Context = createContext(null);

const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) => 
                    setState({ store: { ...state.store, ...updatedStore }, actions: { ...state.actions } })
            })
        );

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };

    return StoreWrapper;
};

export default injectContext;

