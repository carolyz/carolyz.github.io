// var url = "https://randomuser.me/api/?results=100";
function getData(url) {
	return new Promise ((resolve, reject) => {
		const req = new XMLHttpRequest();
		req.open('GET', url);
		req.onload = () => req.status === 200 ? resolve(req.response) : reject(Error(req.statusText));
		req.onerror = (err) => reject(Error(`Network error: ${err}`));
		req.send();
	});
}

// call getData and handle the promis it returns
getData('https://randomuser.me/api/?results=100').then((data) => {
	
	var dump = document.createElement('pre');
	dump.innerHTML = data;
	document.body.appendChild(dump);
})
.catch((e)=>{
	console.log(e);
})