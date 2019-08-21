//Empty array to push fetched employees into
const employeeList = [];

/**************************** FETCH DATA *************************************/

//Implemented the fetch API to retrieve random user data
fetch('https://randomuser.me/api/?results=12&nat=gb,us').then(
    response => {
        //Console log an error message it site fails to fetch data
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
          //convert fetched string of data into json
          response.json().then(data => {
            //loop through the data
            for(let i = 0; i < 12; i++) {
                //push each data entry int the employee array
                employeeList.push(data.results[i])
                //call the createEmployeeCard function to build the employee list in the dom
                createEmployeeCard(data.results[i].picture.large,
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

/************************************************************************************/



/******************************* SEARCH BAR *****************************************/

//create a search bar and append it to the dom
const searchContainer = document.querySelector('.search-container')
const searchHtml = `<form action="#" method="get">
                        <input type="search" id="search-input" class="search-input" placeholder="Search...">
                        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
                    </form>`

searchContainer.innerHTML = searchHtml;

/*************************************************************************************/


/******************************** CREATE EMPLOYEE CARD HTML ****************************/
const galleryImageContainer = document.querySelector('#gallery');

const createEmployeeCard = (img, firstName, lastName, email, city, state, num) => {
    //Create the html element and set its attributes
    let empCard = document.createElement('div');
    empCard.setAttribute('class', 'card');
    empCard.setAttribute('data', num)

    //Generate the html
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

/****************************************************************************************/



/*********************************** CREATE THE MODAL ***********************************/
//function to generate a modal
const createModal = () => {
    //Create the modal div element
    let modalContainer = document.createElement('div');
    //Set the modal attributes
    modalContainer.setAttribute('class', 'modal-container');
    //Create the modal iner html
    modalContainer.innerHTML = `
                                    <div class="modal">
                                        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>

                                    </div>
                                    <div class="modal-btn-container">
                                        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                        <button type="button" id="modal-next" class="modal-next btn">Next</button>
                                    </div>
                                    `

    document.getElementsByTagName('BODY')[0].append(modalContainer);
}

createModal();

/*****************************************************************************************/


const populateModal = (img, firstName, lastName, email, city, street, state, postcode, phone, birthday, num) => {
    let modalCard = document.createElement('div');
    modalCard.setAttribute('data', num);
    modalCard.setAttribute('class', 'modal-info-container');
    modalCard.innerHTML = `
                            <img class="modal-img" src=${img} alt="profile picture">
                            <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
                            <p class="modal-text">${email}</p>
                            <p class="modal-text cap">${city}</p>
                            <hr>
                            <p class="modal-text">${phone}</p>
                            <p class="modal-text">${street}, ${city}, ${state}, OR ${postcode}</p>
                            <p class="modal-text">Birthday: ${birthday}</p>
                        `

    document.querySelector('.modal').appendChild(modalCard);
}

//gallery event listener to trigger modal
document.querySelector('#gallery').addEventListener('click', (e) => {
    if(document.querySelector('.modal-info-container')) {
        document.querySelector('.modal-info-container').remove();
    }
    
    if(e.target.className === 'card') {
        let empDetail = employeeList[e.target.getAttribute('data')];
        populateModal(empDetail.picture.large,
                    empDetail.name.first,
                    empDetail.name.last,
                    empDetail.email,
                    empDetail.location.city,
                    empDetail.location.street,
                    empDetail.location.state,
                    empDetail.location.postcode,
                    empDetail.cell,
                    empDetail.dob.date.slice(0, 10),
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
    let currentIndex = Number(document.querySelector('.modal-info-container').getAttribute('data'));
    let nextIndex = currentIndex - 1;
    if(nextIndex >= 0) {
        document.querySelector('.modal-info-container').remove();

        populateModal(employeeList[nextIndex].picture.large,
            employeeList[nextIndex].name.first,
            employeeList[nextIndex].name.last,
            employeeList[nextIndex].email,
            employeeList[nextIndex].location.city,
            employeeList[nextIndex].location.street,
            employeeList[nextIndex].location.state,
            employeeList[nextIndex].location.postcode,
            employeeList[nextIndex].cell,
            employeeList[nextIndex].dob.date.slice(0, 10),
            nextIndex
            );
    }
});

document.querySelector('#modal-next').addEventListener('click', () => {
    let currentIndex = Number(document.querySelector('.modal-info-container').getAttribute('data'));
    let nextIndex = currentIndex + 1;
    if(nextIndex < employeeList.length) {
        document.querySelector('.modal-info-container').remove();

        populateModal(employeeList[nextIndex].picture.large,
            employeeList[nextIndex].name.first,
            employeeList[nextIndex].name.last,
            employeeList[nextIndex].email,
            employeeList[nextIndex].location.city,
            employeeList[nextIndex].location.street,
            employeeList[nextIndex].location.state,
            employeeList[nextIndex].location.postcode,
            employeeList[nextIndex].cell,
            employeeList[nextIndex].dob.date.slice(0, 10),
            nextIndex
            );
    }
});



//Search event listener and functionality
document.querySelector('#search-input').addEventListener('input', (e) => {
    const nameList = document.querySelectorAll('#name');
    nameList.forEach(name => {
        //If the empoyee name doesn't contain a search term letter, don't display the employee card
        if(!name.innerHTML.includes(e.target.value.toLowerCase())) {
            name.parentElement.parentElement.style.display = "none";
        } else {
            //otherwise show the employee card
            name.parentElement.parentElement.style.display = "block";
         }
    });
});

//prevent page from reloading
document.querySelector('form').addEventListener('submit', (e) => {
    e.target.preventDefault();
});