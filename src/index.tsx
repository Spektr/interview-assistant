import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './modules/app/containers/app/app';
import * as serviceWorker from './serviceWorker';
import {rootStoreInstance, RootStoreContext} from './store/root.store';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Welcome} from './modules/app/containers/welcome/welcome';
import {IntlProviderWrapper} from './modules/intl';

ReactDOM.render(
    <BrowserRouter>
        <RootStoreContext.Provider value={rootStoreInstance}>
            <IntlProviderWrapper>
                <Switch>
                    <Route path='/welcome' component={Welcome}/>
                    <Route path='/' component={App}/>
                </Switch>
            </IntlProviderWrapper>
        </RootStoreContext.Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
