/* import ~normalize.css; */
import DB from './assets/json.json';
import './styles/styles.scss';
import './assets/images/bg.jpg';

const body = document.querySelector('body');
body.style.backgroundImage = "url('./assets/images/bg.jpg')";

const divSelectors = document.querySelectorAll('h2');

divSelectors.forEach((e) => {
    e.innerHTML = DB.title;
});

const testDrive = (speed) => `You speed: ${speed}`;

// eslint-disable-next-line no-console
console.log(testDrive(230));
