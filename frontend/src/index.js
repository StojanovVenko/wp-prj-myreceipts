import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.css';
// import 'jquery/dist/jquery';
// import 'bootstrap/dist/js/bootstrap.min';
 // import 'startbootstrap-sb-admin-2/'

import 'startbootstrap-sb-admin-2/vendor/fontawesome-free/css/all.min.css';
import 'startbootstrap-sb-admin-2/css/sb-admin-2.min.css';
import 'startbootstrap-sb-admin-2/vendor/jquery/jquery.min';
import 'startbootstrap-sb-admin-2/vendor/bootstrap/js/bootstrap.bundle.min';
import 'startbootstrap-sb-admin-2/vendor/jquery-easing/jquery.easing.min';

import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
