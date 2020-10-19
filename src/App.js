import React, {Fragment} from 'react';
import {withRouter} from 'react-router';
import {BrowserRouter, Route, Switch, Router} from 'react-router-dom';
import Login from './universal/pages/login'

import Header from "./universal/components/Header/Header";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <Header/>
                    <div className="container">
                        <Switch>
                            <Route path="/" render={() => <Login/>}/>
                        </Switch>
                    </div>
                </Fragment>
            </BrowserRouter>

        );
    }
}

export default App
