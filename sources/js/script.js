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
    document.getElementById('Change').addEventListener('click', () =>{
        document.getElementById('formations').classList.remove('active')
        document.getElementById('players').classList.remove('active')
        showpage('Change','changment')} );
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

//
let player;
let dataplayers = JSON.parse(localStorage.getItem('succer')) || [];
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
function showplayers(){
     dataplayers.forEach(data=>{
        if(data.position === 'GK'){
            let content = `<div class="positions">
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
          container.innerHTML += content;  
        }else{
            content = `<div class="positions">
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
              container.innerHTML += content;  
        }
      
     })
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


console.log(selectplayer());
function showselected(){
    let team = selectplayer()
    for(let pos in team){
        team[pos].forEach(player=>{
         if(player.position === 'GK'){
            let content = `<div class="positions ${pos}">
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
          staduim.innerHTML += content
        }else{
            content = `<div class="positions ${pos}">
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
               staduim.innerHTML += content
        }   
        });
        
    }
}


// Appel des fonctions
showplayers();

showselected()


