import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from "@my-app/app";

// need to include this so that the the root index css file gets bundled - do not remove.
import "../index.css";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
