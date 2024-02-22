import {addZero} from "./lib";

const timer = (selector, deadline) => {

	function getTimeRemaining(endTime) {
		let days = 0, hours = 0, minutes = 0, seconds = 0;
		const t = Date.parse(endTime) - Date.parse(new Date());

		if( t > 0) {
			days = Math.floor(t / (1000 * 60 * 60 * 24));
			hours = Math.floor(t / (1000 * 60 * 60) % 24);
			minutes = Math.floor((t / 1000 / 60 ) % 60);
			seconds = Math.floor((t / 1000 ) % 60);
		}

		return {
			total: t,
			days,
			hours,
			minutes,
			seconds
		}
	}

	function setClock(selector, endTime) {
		const timer = document.querySelector(`.${selector}`);
		const days = timer.querySelector('#days');
		const hours = timer.querySelector('#hours');
		const minutes = timer.querySelector('#minutes');
		const seconds = timer.querySelector('#seconds');

		const timeInterval = setInterval(updateClock, 1000);

		updateClock();
		function updateClock() {
			const t = getTimeRemaining(endTime);

			days.textContent = addZero(t.days);
			hours.textContent = addZero(t.hours);
			minutes.textContent = addZero(t.minutes);
			seconds.textContent = addZero(t.seconds);

			if(t.total <=0) clearInterval(timeInterval);
		}
	}

	setClock(selector, deadline);
}

export default timer;