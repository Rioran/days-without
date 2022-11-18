const MS_RENDER_DELAY = 1000 * 60 * 10; // every 10 minutes
const MS_IN_A_DAY = 1000 * 60 * 60 * 24;
const HEADER_ELEMENT_SELECTOR = '#text-header-p';
const DAYS_ELEMENT_SELECTOR = '#days-without-p';
const DEFAULT_DAY_STRING = '2022-11-15';
const DEFAULT_TEXT = 'Рома продержался дней без колы:';

const urlParams = new URLSearchParams(window.location.search);

let headerElement;
let daysElement;

let dateCache = 'current date goes here';
let startDay;
let text;

function getParameter(name, defaultValue) {
	const value = urlParams.get(name);
	if (value == null) {
		return defaultValue;
	}
	return value;
}

function setUp() {
	const startParameter = getParameter('start', DEFAULT_DAY_STRING);
	startDay = new Date(startParameter).toISOString().split('T')[0];
	text = getParameter('text', DEFAULT_TEXT);
	headerElement.innerHTML = text;
	renderDays();
}

function renderDays() {
	const today = new Date().toISOString().split('T')[0];
	if (today !== dateCache) {
		const dateDiff = (new Date(today)) - (new Date(startDay));
		daysElement.innerText = Math.floor(dateDiff / MS_IN_A_DAY).toString();
		dateCache = today;
	}
}

document.addEventListener('DOMContentLoaded', function () {
	headerElement = document.querySelector(HEADER_ELEMENT_SELECTOR);
	daysElement = document.querySelector(DAYS_ELEMENT_SELECTOR);

	setUp();
	setInterval(renderDays, MS_RENDER_DELAY);
});
