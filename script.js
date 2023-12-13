const films = [
	{
		name: 'Titanic',
		rating: 9
	},
	{
		name: 'Die hard 5',
		rating: 5
	},
	{
		name: 'Matrix',
		rating: 8
	},
	{
		name: 'Some bad film',
		rating: 4
	}
];

function showGoodFilms(arr) {
	return arr.filter(item => item.rating > 7)
}

function showListOfFilms(arr) {
	return arr.reduce((sum, item) => `${typeof(sum) === 'object' ? sum.name : sum}, ${item.name}`);
}
// console.log(typeof showListOfFilms(films));

function showListOfFilms1(arr) {
	return arr.reduce((sum, current) => `${sum}, ${current.name}`);
}
// console.log(showListOfFilms1(films));

function setFilmsIds(arr) {
	return arr.map((item, i) => {
		const obj = {};
		obj.name = item.name;
		obj.rating = item.rating;
		obj.id = i;
		return obj;
	})
}

const tranformedArray = setFilmsIds(films);

function checkFilms(arr) {
	return arr.every(item => item.hasOwnProperty('id'))
}

const funds = [
	{amount: -1400},
	{amount: 2400},
	{amount: -1000},
	{amount: 500},
	{amount: 10400},
	{amount: -11400}
];

const getPositiveIncomeAmount = (data) => {
	return data.map(item => item['amount']).filter(item => item > 0).reduce((sum, item) => sum+=item)
};

const getTotalIncomeAmount = (data) => {
	if (data.some(item => item.amount <=0)) {
		return data.map(item => item['amount']).reduce((sum, item) => sum+=item)
	}
	return getPositiveIncomeAmount(data);
};
