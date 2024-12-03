//Filtrage Form Tactics Formations 
document.getElementById('add-player').addEventListener('click', () =>{
    document.getElementById('formations').classList.remove('active')
    document.getElementById('players').classList.remove('active')
    showpage('add-player','page-add-player')} );
document.getElementById('formations').addEventListener('click', () => {
    document.getElementById('add-player').classList.remove('active')
    document.getElementById('players').classList.remove('active')
    showpage('formations','page-formations')});
document.getElementById('players').addEventListener('click', () => {
    document.getElementById('add-player').classList.remove('active')
    document.getElementById('formations').classList.remove('active')
    showpage('players','page-players')});
//icons for tablte and phone
document.getElementById('add-playericon').addEventListener('click', () =>{
    document.getElementById('formationsicon').classList.remove('active')
    document.getElementById('playersicon').classList.remove('active')
    showpage('add-playericon','page-add-player')} );
document.getElementById('formationsicon').addEventListener('click', () => {
    document.getElementById('add-playericon').classList.remove('active')
    document.getElementById('playersicon').classList.remove('active')
    showpage('formationsicon','page-formations')});
document.getElementById('players').addEventListener('click', () => {
    document.getElementById('add-playericon').classList.remove('active')
    document.getElementById('formationsicon').classList.remove('active')
    showpage('playersicon','page-players')});
function showpage(hideId,pageId) {
    document.querySelectorAll('.filtbtn').forEach(button => {
        button.classList.remove('active');
    });
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });
  document.getElementById(hideId).classList.add('active')
  document.getElementById(pageId).style.display = 'block';
}


showpage('add-playericon','page-add-player');
showpage('add-player','page-add-player');


let player;
let dataplayers = JSON.parse(localStorage.getItem('succer')) || [];
////Ajioute players
let addplayer = document.getElementById('clickadd');
let nameplayert = document.getElementById('player-name')
let posplayert = document.getElementById('player-position')
let photoplayert = document.getElementById('photo-link')
let ratingplt = document.getElementById('rating')
let paceplt = document.getElementById('Pace')
let shootingplt = document.getElementById('Shooting')
let passingplt = document.getElementById('Passing')
let dribblingplt = document.getElementById('Dribbling')
let physiqplt = document.getElementById('Physical')
let defendingIt = document.getElementById('Defending')

//for display statistic 
posplayert.addEventListener("change", function () {
    if (posplayert.value === 'GK') {
        console.log(posplayert.value); 
        displayGKForm();
    } else {
        displayPlayerForm();
    }
})
displayGKForm();
//ajout player

addPlayer(document.querySelector('#clickadd'), document.querySelector('#clickadd').parentElement)

function addPlayer(button, element) {
    button.addEventListener('click',(e)=>{
        
        e.preventDefault();

        let inputs = element.querySelectorAll('input');

        //  validation inputs values
        let nameRegex = /^[a-zA-Z\s]{1,15}$/; 
        let ratingRegex = /^[1-99]{1,2}$/;
        let positionRegex = /^[a-zA-Z\s]+$/; 
        if (!nameRegex.test(nameplayert.value)) {
            createToast('warning', 'fa-solid fa-triangle-exclamation', 'Warning', 'Invalid player name! Please enter only letters and spaces.');

            return;
        }
        if (!ratingRegex.test(inputs[0].value)) {
            createToast('warning', 'fa-solid fa-triangle-exclamation', 'Warning', 'Invalid rating! Please enter a number between 1 and 100.');

            return;
        }
        if (!positionRegex.test(posplayert.value)) {
            createToast('warning', 'fa-solid fa-triangle-exclamation', 'Warning', 'Invalid position! Please enter a number between 1 and 100.');

            return;
        }
        let playerStats = [inputs[1], inputs[2], inputs[3], inputs[4], inputs[5], inputs[6]];
        playerStats.forEach((stat, index) => {
            console.log(index);
            if (!ratingRegex.test(stat.value)) {
                createToast('warning', 'fa-solid fa-triangle-exclamation', 'Warning', `Invalid ${stat.name}! Please enter a number between 1 and 100.`);
                return;
            }
        });

        let file = photoplayert.files[0];
        if (!file) {
            createToast('warning', 'fa-solid fa-triangle-exclamation', 'Warning', 'Please add a photo of the player.');
            return;
        }
        
        
    if (file) {
        let reader = new FileReader();
    
        reader.onload = function (event) {
            let newplayer;
            if (posplayert.value != "GK") {
                newplayer = {
                    name: nameplayert.value,  
                    photo: event.target.result,  
                    position: posplayert.value,  
                    nationality: "Argentina", 
                    flag: "https://cdn.sofifa.net/flags/ar.png",  
                    club: "Inter Miami",
                    logo: "https://cdn.sofifa.net/meta/team/239235/120.png",  
                    rating: parseInt(inputs[0].value),  
                    pace: parseInt(inputs[1].value),  
                    shooting: parseInt(inputs[2].value),  
                    passing: parseInt(inputs[3].value),  
                    dribbling: parseInt(inputs[4].value),  
                    defending:parseInt(inputs[5].value),  
                    physical: parseInt(inputs[6].value),  
                };
            } else {
                newplayer = {
                    name: nameplayert.value,  
                    photo: event.target.result,  
                    position: posplayert.value,  
                    nationality: "Argentina", 
                    flag: "https://cdn.sofifa.net/flags/ar.png",  
                    club: "Inter Miami",
                    logo: "https://cdn.sofifa.net/meta/team/239235/120.png",  
                    rating: parseInt(inputs[0].value),  
                    diving: parseInt(inputs[1].value),  
                    handling: parseInt(inputs[2].value),  
                    kicking: parseInt(inputs[3].value),  
                    reflexes: parseInt(inputs[4].value),  
                    speed:parseInt(inputs[5].value),  
                    positioning: parseInt(inputs[6].value),  
                };
            }
            

            dataplayers.push(newplayer);
            console.log("array"+dataplayers);

            localStorage.setItem('succer', JSON.stringify(dataplayers));

            console.log("local"+localStorage.getItem("succer"));

            createToast('Success', 'fa-solid fa-circle-exclamation', 'success', 'Player added successfully!');
            showplayers();

            nameplayert.value = "";
            posplayert.value = "";
            inputs[0].value = "";
            photoplayert.value = "";
            inputs[1].value = "";
            inputs[2].value = "";
            inputs[3].value = "";
            inputs[4].value = "";
            inputs[5].value = "";
            inputs[6].value = "";
            
        };

        reader.readAsDataURL(file); 
    
    } else {
        createToast('warning', 'fa-solid fa-triangle-exclamation', 'Warning', 'please add photo the player');

    }
    })
}

//function display form
function displayGKForm() {
    let element = document.getElementById('informationskills');
    element.innerHTML = `
        <div class="form-row">
            <label for="rating">Rating</label>
            <input type="number" id="rating">
        </div>
        <div class="form-row">
            <label for="Diving">Diving</label>
            <input type="number" id="Diving">
        </div>
        <div class="form-row">
            <label for="Handling">Handling</label>
            <input type="number" id="Handling">
        </div>
        <div class="form-row">
            <label for="Kicking">Kicking</label>
            <input type="number" id="Kicking">
        </div>
        <div class="form-row">
            <label for="Reflexes">Reflexes</label>
            <input type="number" id="Reflexes">
        </div>
        <div class="form-row">
            <label for="Speed">Speed</label>
            <input type="number" id="Speed">
        </div>
        <div class="form-row">
            <label for="Positioning">Positioning</label>
            <input type="number" id="Positioning">
        </div>
        <button type="submit" id="clickadd"><span>+</span> <h3>Add</h3></button>`;
        addPlayer(element.querySelector('button'), element);
    }

function displayPlayerForm() {
    let element = document.getElementById('informationskills');
    element.innerHTML = `
                <div class="form-row">
                    <label for="rating">Rating</label>
                    <input type="number" id="rating">
                </div>
                <div class="form-row">
                    <label for="Pace">Pace</label>
                    <input type="number" id="Pace">
                </div>
                <div class="form-row">
                    <label for="Shooting">Shooting</label>
                    <input type="number" id="Shooting">
                </div>
                <div class="form-row">
                    <label for="Passing">Passing</label>
                    <input type="number" id="Passing">
                </div>
                <div class="form-row">
                    <label for="Dribbling">Dribbling</label>
                    <input type="number" id="Dribbling">
                </div>
                <div class="form-row">
                    <label for="Defending">Defending</label>
                    <input type="number" id="Defending">
                </div>
                <div class="form-row">
                    <label for="Physical">Physical</label>
                    <input type="number" id="Physical">
                </div>
                <button type="submit" id="clickadd"><span>+</span> <h3>Add</h3></button>
              `;
              addPlayer(element.querySelector('button'), element);
}

let attr = '';
fetch("sources/api/players.json")
.then(res => res.json())
.then(res => {
    player = res.players;   
    localStorage.setItem('succer', JSON.stringify(player));
    console.log('Données sauvegardées dans localStorage');
    showplayers();
    showselected() ;
    let positions = document.querySelectorAll('#containr .positions');
    positions.forEach(function (item) {
        item.innerHTML = "<button class='plus-btn'>+</button>";
        item.addEventListener('click', () => {
            showpage('players','page-players')
            attr = item.id;
            let positions = document.querySelectorAll('.gridcards .prancipal');
            for (let i = 0; i < positions.length; i++) {
                if (positions[i].querySelector('.position span').textContent == attr) {
                    positions[i].style.display = "flex"
                } else {
                    positions[i].style.display = "none"
                }
            }
        });
    })
})

let container = document.getElementById('contentPlayers')
let staduim = document.querySelector('.container')
function showplayers() {
      container.innerHTML = ""
    dataplayers.forEach((data,index) => {
        if(data.position === 'GK'){
            let content =`<div class = "prancipal">
             <div class="positions" id="${data.name}" onclick='ChangerPlayer(${JSON.stringify(data)})'>
            <div class="head-card">
              <div class="position">
                  <p>${data.rating}</p>
                  <span>${data.position}</span>
              </div>
              <div class="image-player">
                  <img width="100" src="${data.photo}" alt="">
              </div>
          </div>
          <div class="body-card">
              <h3>${data.name}</h3>
              <div class="rate-player">
                  <div>
                      <p>PIV</p>
                      <span>${data.diving}</span>
                  </div>

                  <div>
                      <p>HAN</p>
                      <span>${data.handling}</span>
                  </div>
                  <div>
                      <p>KIC</p>
                      <span>${data.kicking}</span>
                  </div>
                  <div>
                      <p>REF</p>
                      <span>${data.reflexes}</span>
                  </div>
                  <div>
                      <p>SPE</p>
                      <span>${data.speed}</span>
                  </div>
                  <div>
                      <p>POS</p>
                      <span>${data.positioning}</span>
                  </div>
              </div>
          </div>
         
          </div>
           <div class="edit-delet" onclick = "delet(${index}, ${data.position})">
              <button class="delete-btn">
                 <i class="fa-solid fa-xmark"></i>
              </button>
              
               <button class="edit-btn" onclick="editPlayer(${index}, ${data.position})">
              <i class="fa-solid fa-pen-to-square"></i>
               </button>
                 </div>
          </div>`;
          container.innerHTML += content;  
        }else{
            content =` <div class = "prancipal">
            <div class="positions" id="${data.name}" onclick='ChangerPlayer(${JSON.stringify(data)})'">
                <div class="head-card">
                  <div class="position">
                      <p>${data.rating}</p>
                      <span>${data.position}</span>
                  </div>
                  <div class="image-player">
                      <img width="100" src="${data.photo}" alt="">
                  </div>
              </div>
              <div class="body-card">
                  <h3>${data.name}</h3>
                  <div class="rate-player">
                      <div>
                          <p>PAC</p>
                          <span>${data.pace}</span>
                      </div>
                      <div>
                          <p>SHO</p>
                          <span>${data.shooting}</span>
                      </div>
                      <div>
                          <p>PAS</p>
                          <span>${data.passing}</span>
                      </div>
                      <div>
                          <p>DRI</p>
                          <span>${data.dribbling}</span>
                      </div>
                      <div>
                          <p>DEF</p>
                          <span>${data.defending}</span>
                      </div>
                      <div>
                          <p>PHY</p>
                          <span>${data.physical}</span>
                      </div>
                  </div>
              </div>
              </div>
              <div class="edit-delet">
              <button class="delete-btn"  onclick = "delet(${index}, ${data.position})">
                 <i class="fa-solid fa-xmark"></i>
              </button>
               <button class="edit-btn" onclick="editPlayer(${index}, ${data.position})">
              <i class="fa-solid fa-pen-to-square"></i>              </button>
                 </div>
              </div>`;
              container.innerHTML += content;  
 } })
}
    



function selectplayer() {
    let selected = {
        GK: [],
        CBL: [],
        CBR: [],
        LB: [],
        RB: [],
        CML: [],
        CMM: [],
        CMR: [],
        LF: [],
        RF: [],
        ST: []
    };

    for (let key in selected) {
        selected[key] = dataplayers.filter(player => player.position === key).slice(0, 1);
    }

    return selected;
}

function ChangerPlayer(data) {
console.log(data.position);

       
    let selectedDiv = document.getElementById(data.position);
      
    if (selectedDiv) {
        data.position.innerHTML = ""
        if(data.position === 'GK'){
            let content =` <div class="positions" id="${data.name}" onclick='ChangerPlayer(${JSON.stringify(data)})'>
            <div class="head-card">
              <div class="position">
                  <p>${data.rating}</p>
                  <span>${data.position}</span>
              </div>
              <div class="image-player">
                  <img width="100" src="${data.photo}" alt="">
              </div>
          </div>
          <div class="body-card">
              <h3>${data.name}</h3>
              <div class="rate-player">
                  <div>
                      <p>PIV</p>
                      <span>${data.diving}</span>
                  </div>
                  <div>
                      <p>HAN</p>
                      <span>${data.handling}</span>
                  </div>
                  <div>
                      <p>KIC</p>
                      <span>${data.kicking}</span>
                  </div>
                  <div>
                      <p>REF</p>
                      <span>${data.reflexes}</span>
                  </div>
                  <div>
                      <p>SPE</p>
                      <span>${data.speed}</span>
                  </div>
                  <div>
                      <p>POS</p>
                      <span>${data.positioning}</span>
                  </div>
              </div>
          </div>
          </div>`;
          selectedDiv.innerHTML = content;
        }else{
 content =` <div class="positions" id="${data.name}" onclick='ChangerPlayer(${JSON.stringify(data)})'">
                <div class="head-card">
                  <div class="position">
                      <p>${data.rating}</p>
                      <span>${data.position}</span>
                  </div>
                  <div class="image-player">
                      <img width="100" src="${data.photo}" alt="">
                  </div>
              </div>
              <div class="body-card">
                  <h3>${data.name}</h3>
                  <div class="rate-player">
                      <div>
                          <p>PAC</p>
                          <span>${data.pace}</span>
                      </div>
                      <div>
                          <p>SHO</p>
                          <span>${data.shooting}</span>
                      </div>
                      <div>
                          <p>PAS</p>
                          <span>${data.passing}</span>
                      </div>
                      <div>
                          <p>DRI</p>
                          <span>${data.dribbling}</span>
                      </div>
                      <div>
                          <p>DEF</p>
                          <span>${data.defending}</span>
                      </div>
                      <div>
                          <p>PHY</p>
                          <span>${data.physical}</span>
                      </div>
                  </div>
              </div>
              </div>`;
        // Remplacer le contenu de la div liée à la position
        selectedDiv.innerHTML = content;
        }
        console.log(`Le joueur ${data.name} a remplacé dans ${data.position}`);
    } else {
        console.log("Aucune div trouvée pour cette position.");
    }
}

let staduims = document.getElementById('containr')
console.log(selectplayer());
function showselected(){
    staduims.textContent = ""
    let team = selectplayer()
    for(let pos in team){
        team[pos].forEach(player=>{
         if(player.position === 'GK'){
            let content = `<div class="positions ${pos}" id="${player.position}">
            <div class="head-card">
              <div class="position">
                  <p>${player.rating}</p>
                  <span>${player.position}</span>
              </div>
              <div class="image-player">
                  <img width="100" src="${player.photo}" alt="">
              </div>
          </div>
          <div class="body-card">
              <h3>${player.name}</h3>
              <div class="rate-player">
                  <div>
                      <p>PIV</p>
                      <span>${player.diving}</span>
                  </div>
                  <div>
                      <p>HAN</p>
                      <span>${player.handling}</span>
                  </div>
                  <div>
                      <p>KIC</p>
                      <span>${player.kicking}</span>
                  </div>
                  <div>
                      <p>REF</p>
                      <span>${player.reflexes}</span>
                  </div>
                  <div>
                      <p>SPE</p>
                      <span>${player.speed}</span>
                  </div>
                  <div>
                      <p>POS</p>
                      <span>${player.positioning}</span>
                  </div>
              </div>
          </div>
          </div>`;
          staduims.innerHTML += content
        }else{
            content = `<div class="positions ${pos}"  id="${player.position}">
                <div class="head-card">
                  <div class="position">
                      <p>${player.rating}</p>
                      <span>${player.position}</span>
                  </div>
                  <div class="image-player">
                      <img width="100" src="${player.photo}" alt="">
                  </div>
              </div>
              <div class="body-card">
                  <h3>${player.name}</h3>
                  <div class="rate-player">
                      <div>
                          <p>PAC</p>
                          <span>${player.pace}</span>
                      </div>
                      <div>
                          <p>SHO</p>
                          <span>${player.shooting}</span>
                      </div>
                      <div>
                          <p>PAS</p>
                          <span>${player.passing}</span>
                      </div>
                      <div>
                          <p>DRI</p>
                          <span>${player.dribbling}</span>
                      </div>
                      <div>
                          <p>DEF</p>
                          <span>${player.defending}</span>
                      </div>
                      <div>
                          <p>PHY</p>
                          <span>${player.physical}</span>
                      </div>
                  </div>
              </div>
              </div>`;
               staduims.innerHTML += content
        }   
        });
        
    }
}

//Notification.

let notifications = document.querySelector('.notifications');
    
    function createToast(type, icon, title, text){
        let newToast = document.createElement('div');
        newToast.innerHTML = `
            <div class="toast ${type}">
                <i class="${icon}"></i>
                <div class="content">
                    <div class="title">${title}</div>
                    <span>${text}</span>
                </div>
                <i class="fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
            </div>`;
        notifications.appendChild(newToast);
        newToast.timeOut = setTimeout(
            ()=>newToast.remove(), 5000
        )
    }

    //delet player
    function delet(i, pos){
        dataplayers.splice(i, 1); 
        localStorage.succer = JSON.stringify(dataplayers);
        showplayers();
        console.log(pos);
        pos.innerHTML = "<button class='plus-btn'>+</button>";

        createToast('Success', 'fa-solid fa-circle-exclamation', 'success', 'Player Delet successfully!');
    }
//    // edit player
function editPlayer(index) {
    let player = dataplayers[index];
    document.getElementById('player-nameedit').value = player.name;
    document.getElementById('player-positionedit').value = player.position;
    document.getElementById('ratingedit').value = player.rating;
    document.getElementById('Paceedit').value = player.pace;
    document.getElementById('Shootingedit').value = player.shooting;
    document.getElementById('Passingedit').value = player.passing;
    document.getElementById('Dribblingedit').value = player.dribbling;
    document.getElementById('Defendingedit').value = player.defending;
    document.getElementById('Physicaledit').value = player.physical;
    document.getElementById('photo-linkedit').value = player.photo || '';
    document.querySelector('.modal').style.visibility = 'visible';

    document.querySelector('.formplayer').onsubmit = (e) => {
    e.preventDefault(); 
      player.name = document.getElementById('player-nameedit').value;
      player.position = document.getElementById('player-positionedit').value;
      player.rating = parseInt(document.getElementById('ratingedit').value);
      player.pace = parseInt(document.getElementById('Paceedit').value);
      player.shooting = parseInt(document.getElementById('Shootingedit').value);
      player.passing = parseInt(document.getElementById('Passingedit').value);
      player.dribbling = parseInt(document.getElementById('Dribblingedit').value);
      player.defending = parseInt(document.getElementById('Defendingedit').value);
      player.physical = parseInt(document.getElementById('Physicaledit').value);
      player.photo = document.getElementById('photo-linkedit').value;
       document.querySelector('.modal').style.visibility = 'hidden';
      
      localStorage.setItem('succer', JSON.stringify(dataplayers));
      createToast('Success', 'fa-solid fa-circle-check', 'success', 'Player updated successfully!');
       showselected()
     
    };
  }
  


  
// Appel des fonctions
 showplayers()
 