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

// getResource(dbLocalPath)
// 		.then(data => {
// 			data.forEach(({img, altimg, title, descr, price}) => {
// 				new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
// 			});
// 		});

export {postData};