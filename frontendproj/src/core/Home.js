import React from 'react';
import "../styles.css";
import {API} from "../backend";
import Base from './Base';


export default function Home() {
    console.log("API IS", API)
    return (
        <Base title="Home Page" description="Welcome to the Home page">
            <h1>Hello World</h1>
            <h4>Api at {API}</h4>
        </Base>
    );
}
