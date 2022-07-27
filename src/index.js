import React from 'react';
import './index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import reportWebVitals from './reportWebVitals';
import 'react-vertical-timeline-component/style.min.css';
import App from './App';
import "./translation/i18n";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';


import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
