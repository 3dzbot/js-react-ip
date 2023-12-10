//main example
const mainRequest = new Promise(function (resolve, reject) {
	if (false) {
		resolve()
	} else {
		reject();
	}
})
// mainRequest.then(()=>{console.log('this is resolve')}, ()=>{console.log('this is reject')})
//better way - use then and catch

const singlePromise = time => {
	return new Promise(resolve => {
		setTimeout(() => {
			//rules for activation resolve request
			if (true) {
				resolve();
			}
			console.log(time);
		}, time);
	})
}

let end;

//counter - how long we are waiting all promises
async function testFunc() {
	await Promise.all([singlePromise(2000), singlePromise(3000), singlePromise(500), singlePromise(500)]);
}

const start = new Date().getTime();
testFunc().then(res => end = new Date().getTime()).then(res => console.log(`We wait promise: ${end - start}ms`));
