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

//function to generate a modal
const createModal = () => {
    let modalContainer = document.createElement('div');
    modalContainer.setAttribute('class', 'modal-container');

    modalContainer.innerHTML = `
                                <div class="modal">
                                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                    <div class="modal-info-container">
                                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                                        <h3 id="name" class="modal-name cap">name</h3>
                                        <p class="modal-text">email</p>
                                        <p class="modal-text cap">city</p>
                                        <hr>
                                        <p class="modal-text">(555) 555-5555</p>
                                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                                        <p class="modal-text">Birthday: 10/21/2015</p>
                                    </div>
                                </div>

                                // IMPORTANT: Below is only for exceeds tasks 
                                <div class="modal-btn-container">
                                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                                </div>
                                `
    document.getElementsByTagName('BODY')[0].append(modalContainer);
}

createModal();

//gallery event listener to trigger modal
document.querySelector('#gallery').addEventListener('click', (e) => {
    if(e.target.className === 'card') {
        document.querySelector('.modal-container').style.display = "block"
    }
});

//modal event listener
document.querySelector('.modal-container').addEventListener('click', (e) => {
    if(e.target.className === "modal-container") {
        document.querySelector('.modal-container').style.display = "none";
    }
});

//model close button event listener
document.querySelector('#modal-close-btn').addEventListener('click', () => {
    document.querySelector('.modal-container').style.display = "none";
});

//Implemented the fetch API to retrieve random user data
fetch('https://randomuser.me/api/?results=12&nat=gb,us').then(
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


