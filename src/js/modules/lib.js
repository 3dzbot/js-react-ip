export 	function addZero(num) {
	return num < 10 ? `0${num}` : num;
}

export const dataServer = {
	dbBasePath: 'db/db.json',
	dbLocalPath: 'http://localhost:3000/menu',
	dbLocalRequest: 'http://localhost:3000/requests',
};
