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


	// getResource(dbLocalPath)
	// 		.then(data => {
	// 			data.forEach(({img, altimg, title, descr, price}) => {
	// 				new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
	// 			});
	// 		});

	//axios

	axios.get(dbLocalPath)
			.then(response => {
				// handle success
				response.data.forEach(({img, altimg, title, descr, price}) => {
					new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
				});
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.finally(function () {
				// always executed
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

	//slider

	const slides = document.querySelectorAll('.offer__slide');
	const slider = document.querySelector('.offer__slider');
	const slidesWrapper = document.querySelector('.offer__slider-wrapper');
	const slidesField = document.querySelector('.offer__slider-inner');
	const prevBtn = document.querySelector('.offer__slider-prev');
	const nextBtn = document.querySelector('.offer__slider-next');
	const total = document.getElementById('total');
	const current = document.getElementById('current');
	const width = window.getComputedStyle(slidesWrapper).width;
	let slideIndex = 1;
	let offset = 0;

	total.textContent = addZero(slides.length);
	current.textContent = addZero(slideIndex);
	slidesWrapper.style.overflow = 'hidden';
	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slides.forEach(slide => {
		slide.style.width = width;
	})

	slider.style.position = 'relative';

	const indicators = document.createElement('ol');
	const dots = [];
	indicators.classList.add('carousel-indicators');
	slider.append(indicators);

	for(let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.classList.add('dot');
		dot.setAttribute('data-slide-to', i + 1);
		if(i==0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	function setActiveDot(index = 0) {
		if (!dots.length) return;

		dots.forEach(dot => dot.style.opacity = '0.5')
		dots[index-1].style.opacity = '1';
	}

	nextBtn.addEventListener('click', () => {
		if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
			offset = 0;
			slideIndex = 1;
			current.textContent = addZero(slideIndex);
		} else {
			offset += +width.slice(0, width.length - 2);
			slideIndex++;
			current.textContent = addZero(slideIndex);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;
		setActiveDot(slideIndex);
	})

	prevBtn.addEventListener('click', () => {
		if (offset == 0) {
			offset = +width.slice(0, width.length - 2) * (slides.length - 1)
			slideIndex = slides.length;
			current.textContent = addZero(slideIndex);
		} else {
			offset -= +width.slice(0, width.length - 2);
			slideIndex--;
			current.textContent = addZero(slideIndex);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;
		setActiveDot(slideIndex);
	})

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');
			slideIndex = slideTo;

			offset = +width.slice(0, width.length - 2) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;

			setActiveDot(slideIndex);
			current.textContent = addZero(slideIndex);
		})
	})

	// showSlides(slideIndex);
	//
	// function showSlides(n) {
	// 	if( n > slides.length) slideIndex = 1
	// 	if (n < 1) slideIndex = slides.length;
	//
	// 	slides.forEach(item => {
	// 		item.style.display = 'none';
	// 	})
	//
	// 	slides[slideIndex -1].style.display = '';
	// 	current.textContent = addZero(slideIndex);
	// }
	//
	// function plusSlides(n) {
	// 	showSlides(slideIndex += 1);
	// }
	//
	// prevBtn.addEventListener('click', () => {
	// 	plusSlides(-1);
	// })
	//
	// nextBtn.addEventListener('click', () => {
	// 	plusSlides(1);
	// })

	//Calc

	const calcResult = document.querySelector('.calculating__result span');
	let sex = 'female', height, weight, age, ratio = 1.375;

	function calcTotal() {
		console.log(sex, height, weight, age, ratio)
		if (!sex || !height || !weight || !age || !ratio) {
			calcResult.textContent = '____';
			return;
		}

		if (sex === 'female') {
			calcResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			calcResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	calcTotal();

	function getStaticInformation(parentSelector, activeClass) {
		const elements = document.querySelectorAll(`${parentSelector} div`);

		elements.forEach(elem => {
			elem.addEventListener('click', e => {
					const target = e.target;

					if (target.getAttribute('data-ratio')) {
						ratio = +target.getAttribute('data-ratio');
					} else {
						sex = target.getAttribute('id');
					}

					elements.forEach(elem => {
						elem.classList.remove(activeClass)
					})
					target.classList.add(activeClass);

					calcTotal();
				})
		})
	}

	getStaticInformation('#gender', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {
			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value; break;
				case 'weight':
					weight = +input.value; break;
				case 'age':
					age = +input.value; break;
			}

			calcTotal();
		})
	}

	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');
});