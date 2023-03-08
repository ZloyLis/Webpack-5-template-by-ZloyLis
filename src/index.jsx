import React from "react";
import {render} from "react-dom";
import DB from './assets/json.json';
import './styles/styles.scss';
import './assets/images/bg.jpg';
import './scripts/js/babel';
import './scripts/ts/typeScripts.ts'


const body = document.querySelector('body');
body.style.backgroundImage = "url('./assets/images/bg.jpg')";

const App = () => (
    <div>
        <div className="card"><h2 className='h2-1'></h2></div>
        <div className="card"><h2></h2></div>
        <div className="testDiv card"><h3>aasdasdasdasd</h3></div>
    </div>
);
render(<App/>, document.getElementById('app'))
const divSelectors = document.querySelectorAll('h2');

divSelectors.forEach((e) => {
    e.innerHTML = DB.title;
});
const testDrive = (speed) => `You speed: ${speed}`;

// eslint-disable-next-line no-console
console.log(testDrive(230));
