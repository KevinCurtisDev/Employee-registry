const searchContainer = document.querySelector('.search-container')
const searchHtml = `<form action="#" method="get">
                        <input type="search" id="search-input" class="search-input" placeholder="Search...">
                        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
                    </form>`

searchContainer.innerHTML = searchHtml;


const galleryImageContainer = document.querySelector('#gallery');

const createEmployeeCard = (img, firstName, lastName, email, city, state) => {
    let empCard = document.createElement('div');
    empCard.setAttribute('class', 'card');

    empCard.innerHTML =  `
                    <div class="card-img-container">
                        <img class="card-img" src=${img} alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                        <p class="card-text">${email}</p>
                        <p class="card-text cap">${city}, ${state}</p>
                    </div>
                    `
    galleryImageContainer.appendChild(empCard)
}


//Implemented the fetch API to retrieve random user data
fetch('https://randomuser.me/api/?results=12').then(
    response => {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          response.json().then(data => {
            for(let i = 0; i < 12; i++) {
                console.log(data.results[i]);
                createEmployeeCard(data.results[i].picture.thumbnail,
                                   data.results[i].name.first,
                                   data.results[i].name.last,
                                   data.results[i].email,
                                   data.results[i].location.city,
                                   data.results[i].location.state)
            }
        });
    }
)