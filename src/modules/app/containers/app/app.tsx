import React from 'react';
import {useObserver} from 'mobx-react-lite';
import {FormattedMessage} from 'react-intl';
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import {useStyles} from "./app.styles";
import {Route, Switch} from "react-router-dom";
import {Configuration} from "../configuration/configuration";

export function App() {
    // const store = useQuestionStore();
    const classes = useStyles();

    return useObserver(() => (
        <>
            <AppBar position="static" className={classes.root} color={'primary'}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <FormattedMessage id='app.titles.main'/>
                    </Typography>
                </Toolbar>
            </AppBar>

            <Switch>
                <Route path='/' component={Configuration}/>
            </Switch>
        </>

        //         <select
        //             name='lang'
        //             id='lang'
        //             onChange={setLanguageHandler}
        //             defaultValue={Language.En}
        //         >
        //             {Object.values(Language).map((value) => (
        //                 <option key={value} value={value}>{value}</option>
        //             ))}
        //         </select>
        //
        //         <select
        //             name='tag'
        //             id='tag'
        //             onChange={setTagHandler}
        //             defaultValue={Tag.UI}
        //         >
        //             {Object.values(Tag).map((value) => (
        //                 <option key={value} value={value}>{value}</option>
        //             ))}
        //         </select>
        //
        //         <button onClick={load}>load</button>
        //         {JSON.stringify(store.list.map(item => item.toDto))}
    ));
}
