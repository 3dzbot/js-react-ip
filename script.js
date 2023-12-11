let end;
const start = new Date().getTime();
const testUrl = 'https://jsonplaceholder.typicode.com/posts';
const serverUrl = './server.php';

//dont have error if url are wrong
fetch(testUrl, {
	method: "POST",
	headers: {
		'Content-type': 'application/json'
	},
	body: JSON.stringify({name: 'Vasil', age: 35}),
})
		.then(response => response.json())
		.then(data => console.log(data))
		.then(() => end = new Date().getTime())
		.then(res => console.log(`We wait promise: ${end - start}ms`))
		.catch(() => console.warn('Something went wrong'))
