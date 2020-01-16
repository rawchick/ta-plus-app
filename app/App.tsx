import React, { Component } from "react";
import Navigator from "../app/navigations/Navigator";
import configureStore from './redux/Store';
import { Provider } from "react-redux"; //test
const store = configureStore();

console.disableYellowBox = true;

export default class App extends React.PureComponent {
    render() {
        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        )
    }
}