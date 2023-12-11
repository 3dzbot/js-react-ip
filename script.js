"use strict";
const namesList = ['Ivan', 'Ann', 'Petro', 'Andrey'];
const filterNames = namesList.filter(item => item.length < 5);
console.log(filterNames);

const answers = ['SoMe', 'teSt', 'vaLue'];
const mapResult = answers.map(item => item.toLowerCase());
console.log(mapResult);

const reduceArr = ['apple', 'pear', 'plum'];
const resultReduce = reduceArr.reduce((sum, current) => `${sum}, ${current}`);
console.log(resultReduce);
//
const personsObj = {
	ivan: 'person',
	andrey: 'person',
	ann: 'person',
	dog: 'animal',
	cat: 'animal'
}

const newArr = Object.entries(personsObj)
		.filter(item => item[1] === 'person')
		.map(item => item[0]);

console.log(newArr);