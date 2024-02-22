import modals from "./modules/modals";
import {showModal} from "./modules/modals";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import timer from "./modules/timer";
import cardGenerator from "./modules/cardGenerator";
import calculator from "./modules/calculator";
import forms from "./modules/forms";

window.addEventListener('DOMContentLoaded', () => {

	const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), 30000);
	const deadline = '2024-03-01';

	modals('[data-modal]', '.modal', modalTimerId);
	tabs('.tabheader__item', '.tabcontent', '.tabheader__items');
	slider({
		container: '.offer__slider',
		nextNav: '.offer__slider-next',
		prevNav: '.offer__slider-prev',
		slide: '.offer__slide',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		filed: '.offer__slider-inner'
	});
	timer('timer', deadline);
	cardGenerator();
	forms(modalTimerId);
	calculator();
});