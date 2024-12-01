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

//ajout player
addplayer.addEventListener('click',(e)=>{
 e.preventDefault();
      //  validation inputs values
      let nameRegex = /^[a-zA-Z\s]{1,15}$/; 
      let ratingRegex = /^([1-9][0-9]?|100)$/; 
      let positionRegex = /^[a-zA-Z\s]+$/; 
      if (!nameRegex.test(nameplayert.value)) {
          createToast('warning', 'fa-solid fa-triangle-exclamation', 'Warning', 'Invalid player name! Please enter only letters and spaces.');

          return;
      }
      if (!ratingRegex.test(ratingplt.value)) {
          createToast('warning', 'fa-solid fa-triangle-exclamation', 'Warning', 'Invalid rating! Please enter a number between 1 and 100.');

          return;
      }
      if (!positionRegex.test(posplayert.value)) {
          createToast('warning', 'fa-solid fa-triangle-exclamation', 'Warning', 'Invalid position! Please enter a number between 1 and 100.');

          return;
      }
      let playerStats = [paceplt, shootingplt, passingplt, dribblingplt, physiqplt];
    playerStats.forEach(stat => {
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
        let newplayer = {
            name: nameplayert.value,  
            photo: event.target.result,  
            position: posplayert.value,  
            nationality: "Argentina", 
            flag: "https://cdn.sofifa.net/flags/ar.png",  
            club: "Inter Miami",
            logo: "https://cdn.sofifa.net/meta/team/239235/120.png",  
            rating: parseInt(ratingplt.value),  
            pace: parseInt(paceplt.value),  
            shooting: parseInt(shootingplt.value),  
            passing: parseInt(passingplt.value),  
            dribbling: parseInt(dribblingplt.value),  
            defending:parseInt(defendingIt.value),  
            physical: parseInt(physiqplt.value),  
        };
          console.log(newplayer);
          

          dataplayers.push(newplayer);
          console.log("array"+dataplayers);

          localStorage.setItem('succer', JSON.stringify(dataplayers));

          console.log("local"+localStorage.getItem("succer"));

          createToast('Success', 'fa-solid fa-circle-exclamation', 'success', 'Player added successfully!');
          showplayers();

          nameplayert.value = "";
          posplayert.value = "";
          ratingplt.value = "";
          photoplayert.value = "";
          paceplt.value = "";
          shootingplt.value = "";
          passingplt.value = "";
          dribblingplt.value = "";
          physiqplt.value = "";
         
      };

      reader.readAsDataURL(file); 
   
  } else {
      createToast('warning', 'fa-solid fa-triangle-exclamation', 'Warning', 'please add photo the player');

  }
})



fetch("sources/api/players.json")
.then(res => res.json())
.then(res => {
    player = res.players;   
    localStorage.setItem('succer', JSON.stringify(player));
    console.log('Données sauvegardées dans localStorage');
    showplayers();
    showselected()
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
           <div class="edit-delet" onclick = "delet(${index})">
              <button class="delete-btn">
                 <i class="fa-solid fa-xmark"></i>
              </button>
               <button class="edit-btn" onclick="editPlayer(${index})">
              <i class="fa-solid fa-pen-to-square"></i>              </button>
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
              <button class="delete-btn"  onclick = "delet(${index})">
                 <i class="fa-solid fa-xmark"></i>
              </button>
               <button class="edit-btn" onclick="editPlayer(${index})">
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
    function delet(i){
        dataplayers.splice(i, 1); 
        localStorage.succer = JSON.stringify(dataplayers);
        showplayers();

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

      localStorage.setItem('succer', JSON.stringify(dataplayers));
  
      showplayers();
      createToast('Success', 'fa-solid fa-circle-check', 'Player updated successfully!');
    };
  }

  function closeModal() {
    document.querySelector('.modal').style.display = 'none';
  }
  

// Appel des fonctions
 showplayers()
 