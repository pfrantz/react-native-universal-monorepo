import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from "@my-app/app";
import {Animated, View} from "react-native";
import Text = Animated.Text;

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <View><Text>Hello</Text></View>
    </React.StrictMode>
);
