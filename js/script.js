window.addEventListener('DOMContentLoaded', () => {

	//Tabs

	const classListObj = {
		tabHeaderItem: 'tabheader__item',
		tabActive: 'tabheader__item_active',
		hide: 'hide',
		show: 'show',
		fade: 'fade'
	}

	const tabs = document.querySelectorAll('.tabheader__item');
	const tabsContent = document.querySelectorAll('.tabcontent');
	const tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add(classListObj.hide);
			item.classList.remove(classListObj.show, classListObj.fade);
		})

		tabs.forEach(tab => {
			tab.classList.remove(classListObj.tabActive);
		})
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add(classListObj.show, classListObj.fade);
		tabsContent[i].classList.remove(classListObj.hide);
		tabs[i].classList.add(`${classListObj.tabActive}`);
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', e => {
		const target = e.target;

		if(target && target.classList.contains(`${classListObj.tabHeaderItem}`)) {
			tabs.forEach((tab, i) => {
				if(target === tab) {
					hideTabContent();
					showTabContent(i);
				}
			})
		}
	})

	//Timer

	const deadline = '2024-02-11';

	function getTimeRemaining(endTime) {
		const t = Date.parse(endTime) - Date.parse(new Date());
		const days = Math.floor(t / (1000 * 60 * 60 * 24));
		const hours = Math.floor(t / (1000 * 60 * 60) % 24);
		const minutes = Math.floor((t / 1000 / 60 ) % 60);
		const seconds = Math.floor((t / 1000 ) % 60);

		return {
			total: t,
			days,
			hours,
			minutes,
			seconds
		}
	}

	function addZero(num) {
		return num < 10 ? `0${num}` : num;
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

	setClock('timer', deadline);

});