import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { initializeIcons } from '@uifabric/icons';
import { Fabric } from 'office-ui-fabric-react';
import { DataSourceProvider } from './contexts/data-source.context';
import DataSourceType from './models/data-source-type.model';

initializeIcons();

// initialize data type context
console.log(window.location.hostname);
let dataSourcetype: string = DataSourceType.localStorage;
if (window.location.hostname.includes('github.io')) {
    dataSourcetype = DataSourceType.localStorage;
}

ReactDOM.render(
    <DataSourceProvider value={dataSourcetype}>
        <Fabric>
            <App />
        </Fabric>
    </DataSourceProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
