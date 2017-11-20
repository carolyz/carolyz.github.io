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

// create cards in html using args from api
function makeCards(userData) {
    let main = document.getElementById('main');
    let container = document.createElement('div');
    container.id = 'card-container';
    main.appendChild(container);

    for (var i = 0; i < userData.length; i++) {
    	let photoUrl = userData[i]['picture']['thumbnail'];
		let firstName = userData[i]['name']['first'];
		let lastName = userData[i]['name']['last'];
		let street = userData[i]['location']['street'];
		let city = userData[i]['location']['city'];
		let state = userData[i]['location']['state'];

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
        // append a card to the main card container
        container.innerHTML += cardHtml;
    }
	return container;
}

// capitalize 1st letter of name, street, city, etc.
function formatStr(str) {
	let result = str.split(' ').map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
    return result;
}

// call getData and handle the promise it returns
let userData;
getData('https://randomuser.me/api/?results=100').then((data) => {
	userData = JSON.parse(data).results;
	makeCards(userData);
    document.getElementById('result-count').innerText = userData.length + ' results';
    return userData;
})
.catch((e)=>{
	console.log(e);
});

let input = document.getElementById('filter_users');
function filterData(event) {
	// use the native filter() to filter through the data
	let filtered = userData.filter(
		// check if both first and last name contains
		// user-inputted search param
		user =>
			user.name.first.includes(input.value.toLowerCase()) ||
			user.name.last.includes(input.value.toLowerCase())
    );
	// check if there are results fitting the filters
	if (typeof filtered !== 'undefined' && filtered.length > 0) {
        let main = document.getElementById('main');
        let container = document.getElementById('card-container');
        // if there's already a list of cards from a previous filter, remove it
        if (container) {
            main.removeChild(container);
		}
        makeCards(filtered);
        document.getElementById('result-count').innerText = filtered.length + ' results';
        return filtered;
	}
	else {
		return userData;
	}
}
input.addEventListener('keyup', filterData);