import {addZero} from "./lib";

const slider = ({container, nextNav, prevNav, slide, totalCounter, currentCounter, wrapper, filed}) => {
	//slider

	const slides = document.querySelectorAll(slide);
	const slider = document.querySelector(container);
	const slidesWrapper = document.querySelector(wrapper);
	const slidesField = document.querySelector(filed);
	const prevBtn = document.querySelector(prevNav);
	const nextBtn = document.querySelector(nextNav);
	const total = document.querySelector(totalCounter);
	const current = document.querySelector(currentCounter);
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

	function getNum(data) {
		return +data.replace(/\D/g, '');
	}

	nextBtn.addEventListener('click', () => {
		// if (offset == +width.slice(0, width.length - 2) * (slides.length - 1))
		if (offset == getNum(width) * (slides.length - 1)) {
			offset = 0;
			slideIndex = 1;
			current.textContent = addZero(slideIndex);
		} else {
			offset += getNum(width);
			slideIndex++;
			current.textContent = addZero(slideIndex);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;
		setActiveDot(slideIndex);
	})

	prevBtn.addEventListener('click', () => {
		if (offset == 0) {
			offset = getNum(width) * (slides.length - 1)
			slideIndex = slides.length;
			current.textContent = addZero(slideIndex);
		} else {
			offset -= getNum(width);
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

			offset = getNum(width) * (slideTo - 1);
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
}

export default slider;