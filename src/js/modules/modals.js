const modals = function (triggerSelector, modalSelector, modalTimerId) {

	const modalTrigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			modalCloseBtn = document.querySelector('[data-close]');

	modal.addEventListener('click', (e) => {
		if(e.target === modal) hideModal(modalSelector);
	})

	modalTrigger.forEach(btn =>
			btn.addEventListener('click', () => showModal(modalSelector, modalTimerId)));

	modalCloseBtn.addEventListener('click', () => hideModal(modalSelector));
	document.addEventListener('keydown', (e) => {
		if(e.code === 'Escape' && modal.classList.contains('show')) hideModal(modalSelector);
	})

	function showModalByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			showModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);
}

function showModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';
	modalTimerId && clearInterval(modalTimerId);
}

function hideModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.remove('show');
	modal.classList.add('hide');
	document.body.style.overflow = '';
}

export default modals;
export {showModal, hideModal};