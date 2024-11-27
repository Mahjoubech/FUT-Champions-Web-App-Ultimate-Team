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

//

fetch()