import axios from "axios";
import {dataServer} from './lib'

const cardGenerator = () => {
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

	//axios

	axios.get(dataServer.dbLocalPath)
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
}

export default cardGenerator;