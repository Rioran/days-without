const MS_RENDER_DELAY = 1000 * 60 * 10; // every 10 minutes
const MS_IN_A_DAY = 1000 * 60 * 60 * 24;
const DISPLAY_ELEMENT_ID = 'display-div';
const DEFAULT_DAY_STRING = '2023-01-25';
const DEFAULT_TEXT = 'Рома продержался дней без колы:';

const urlParams = new URLSearchParams(window.location.search);

let display_div;
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

function set_font_size(text) {
	text_len_sqrt = Math.floor(Math.sqrt(text.length));
	font_size_limit = Math.floor(100 / (text_len_sqrt + 7));
	display_div.style.fontSize = font_size_limit + 'vmax';
}

function setUp() {
	const startParameter = getParameter('start', DEFAULT_DAY_STRING);
	startDay = new Date(startParameter).toISOString().split('T')[0];
	text = getParameter('text', DEFAULT_TEXT);
	set_font_size(text);
	renderDays();
}

function renderDays() {
	const today = new Date().toISOString().split('T')[0];
	if (today !== dateCache) {
		let dateDiff = (new Date(today)) - (new Date(startDay));
		let days_calculation = Math.floor(dateDiff / MS_IN_A_DAY).toString();
		display_div.innerHTML = text + '<br>' + days_calculation;
		dateCache = today;
	}
}

document.addEventListener('DOMContentLoaded', function () {
	display_div = document.getElementById(DISPLAY_ELEMENT_ID);
	setUp();
	setInterval(renderDays, MS_RENDER_DELAY);
});
