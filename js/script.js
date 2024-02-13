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

	const deadline = '2024-03-01';

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

	//Modal

	// const modalTimerId = setTimeout(showModal, 1200);

	const modalTrigger = document.querySelectorAll('[data-modal]'),
			modal = document.querySelector('.modal'),
			modalCloseBtn = document.querySelector('[data-close]');

	modal.addEventListener('click', (e) => {
		if(e.target === modal) hideModal();
	})

	modalTrigger.forEach(btn =>
		btn.addEventListener('click', showModal));

	modalCloseBtn.addEventListener('click', hideModal);
	document.addEventListener('keydown', (e) => {
		if(e.code === 'Escape' && modal.classList.contains('show')) hideModal();
	})

	function showModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		// clearInterval(modalTimerId);
	}

	function hideModal() {
		modal.classList.remove('show');
		modal.classList.add('hide');
		document.body.style.overflow = '';
	}

	function showModalByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			showModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

	//class

	class MenuCard {
		constructor(src, alt, title, desc, price, parentSelector) {
			this.parent = document.querySelector(parentSelector);
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.desc = desc;
			this.price = price;
			this.transfer = 27;

			this.changeToUAH();
		}

		changeToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const elem = document.createElement('div');
			elem.classList.add('menu__item');
			elem.innerHTML = `
				<img src="${this.src}" alt="${this.alt}">
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.desc}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`;
			this.parent.append(elem);
		}
	}
	//
	// new MenuCard(
	// 		'img/tabs/vegy.jpg',
	// 		'vegy',
	// 		'Меню "Фитнес"',
	// 		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и' +
	// 		' здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
	// 		9,
	// 		'.menu .container'
	// ).render();

	const dbBasePath = 'db/db.json';
	const dbLocalPath = 'http://localhost:3000/menu';
	const dbLocalRequest = 'http://localhost:3000/requests';


	getResource(dbLocalPath)
			.then(data => {
				data.forEach(({img, altimg, title, descr, price}) => {
					new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
				});
			});

	// Forms

	const forms = document.querySelectorAll('form');
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	forms.forEach(item => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		let res = await fetch(url, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: data
		});

		return await res.json();
	};

	async function getResource(url) {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData(dbLocalRequest, json)
					.then(data => {
						console.log(data);
						showThanksModal(message.success);
						statusMessage.remove();
					}).catch(() => {
				showThanksModal(message.failure);
			}).finally(() => {
				form.reset();
			});
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		showModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			hideModal();
		}, 4000);
	}

});