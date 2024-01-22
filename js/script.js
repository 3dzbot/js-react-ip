window.addEventListener('DOMContentLoaded', () => {

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

});