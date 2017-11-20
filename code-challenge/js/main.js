// get data with request to specified url
function getData(url) {
	return new Promise ((resolve, reject) => {
		const req = new XMLHttpRequest();
		req.open('GET', url);
		req.onload = () => req.status === 200 ? resolve(req.response) : reject(Error(req.statusText));
		req.onerror = (err) => reject(Error(`Network error: ${err}`));
		req.send();
	});
}

function makeCard(photoUrl,firstName,lastName,street,city,state) {
	firstName = formatStr(firstName);
	lastName  = formatStr(lastName);
	street	  = formatStr(street);
	city 	  = formatStr(city);
	state 	  = formatStr(state);

	let cardHtml = `<div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="${photoUrl}" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">${firstName} ${lastName}</p>
        <p class="subtitle is-6">${street} <br/> ${city}, ${state}</p>
      </div>
    </div>
  </div>
</div>`;

	let card = document.createElement('div');
	card.innerHTML = cardHtml;
	return card;
}

function formatStr(str) {
	let result = str.split(' ').map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
	
    return result;
}

// call getData and handle the promise it returns
getData('https://randomuser.me/api/?results=100').then((data) => {
	let results = JSON.parse(data).results;
	let main = document.getElementById("main");

	for (var i = 0; i < results.length; i++) {
		// display results in card form
        let card = makeCard(
        	results[i]['picture']['thumbnail'],
            results[i]['name']['first'],
            results[i]['name']['last'],
            results[i]['location']['street'],
			results[i]['location']['city'],
			results[i]['location']['state']);
        main.appendChild(card);
    }
	// console.dir(results);
})
.catch((e)=>{
	console.log(e);
});