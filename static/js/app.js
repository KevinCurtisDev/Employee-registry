const employeeList = [];

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
                employeeList.push(data.results[i])
                createEmployeeCard(data.results[i].picture.thumbnail,
                                   data.results[i].name.first,
                                   data.results[i].name.last,
                                   data.results[i].email,
                                   data.results[i].location.city,
                                   data.results[i].location.state,
                                   i)
            }
        });
    }
)

const searchContainer = document.querySelector('.search-container')
const searchHtml = `<form action="#" method="get">
                        <input type="search" id="search-input" class="search-input" placeholder="Search...">
                        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
                    </form>`

searchContainer.innerHTML = searchHtml;


const galleryImageContainer = document.querySelector('#gallery');

const createEmployeeCard = (img, firstName, lastName, email, city, state, num) => {
    let empCard = document.createElement('div');
    empCard.setAttribute('class', 'card');
    empCard.setAttribute('data', num)

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

    document.getElementsByTagName('BODY')[0].append(modalContainer);
}

createModal();

const populateModal = (img, firstName, lastName, email, city, street, state, phone, birthday, num) => {
    document.querySelector('.modal-container').innerHTML = `
                                    <div class="modal">
                                        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                        <div class="modal-info-container" data=${num}>
                                            <img class="modal-img" src=${img} alt="profile picture">
                                            <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
                                            <p class="modal-text">${email}</p>
                                            <p class="modal-text cap">${city}</p>
                                            <hr>
                                            <p class="modal-text">${phone}</p>
                                            <p class="modal-text">${street}, ${city}, ${state}, OR 12213213</p>
                                            <p class="modal-text">Birthday: ${birthday}</p>
                                        </div>
                                    </div>
    
                                    <div class="modal-btn-container">
                                        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                        <button type="button" id="modal-next" class="modal-next btn">Next</button>
                                    </div>
                                    `
}

//gallery event listener to trigger modal
document.querySelector('#gallery').addEventListener('click', (e) => {
    if(e.target.className === 'card') {
        let empDetail = employeeList[e.target.getAttribute('data')];
        populateModal(empDetail.picture.large,
                    empDetail.name.first,
                    empDetail.name.last,
                    empDetail.email,
                    empDetail.location.city,
                    empDetail.location.street,
                    empDetail.location.state,
                    empDetail.cell,
                    empDetail.dob.date,
                    e.target.getAttribute('data')
                    );
        document.querySelector('.modal-container').style.display = "block";
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

document.querySelector('#modal-prev').addEventListener('click', () => {

});

document.querySelector('#modal-next').addEventListener('click', () => {
    
});