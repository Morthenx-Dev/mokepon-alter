const selectPet = document.getElementById('select-pet')
const selectAttack = document.getElementById('select-attack')
const mokeponContainer = document.getElementById('mokepon-container')
const attackContainer = document.getElementById('attack-container')
const petButton = document.getElementById('pet-button')
const attackButton = document.getElementById('attack-button')
const battle = document.getElementById('battle')
const battleMokepons = document.getElementById('battle-mokepons')
const battleAttacks = document.getElementById('battle-attacks')
const selectedAttacksList = document.getElementById('selected-attack-list');

const waterIco = `./assets/esferaAgua.webp`
const plantIco = './assets/esferaPlanta.webp'
const fireIco = './assets/esferaFuego.webp'

let mokeponOption
let mokeponRandomOption
let attackOption
let mokepones = []
let attacks = []
let inputMokepon = []
let inputAttacks = []
let selectedMokepon
let selectedAttacks = []
let mokeAleatorio
let attackAleatorio = []

class Mokepon {
    constructor(name, HP, typePicture, type){
        this.name = name
        this.HP = HP
        this.typePicture = typePicture
        this.type = type
        this.atacks = []
    }
}
class Attack {
    constructor(name, typePicture, damage, description){
        this.name = name
        this.typePicture = typePicture
        this.damage = damage
        this.description = description
    }
}

let rinodoge = new Mokepon('Hipodoge', 10, waterIco, 'water')
let capipepo = new Mokepon('Capipepo', 10, plantIco, 'plant')
let ratiguella = new Mokepon('Ratiguella', 10,  fireIco, 'fire')
let hyponius = new Mokepon('Hiponius', 15,  waterIco, 'water')
let torteir = new Mokepon('Torteir', 15,  plantIco, 'plant')
let firowl = new Mokepon('Firowl', 15,  fireIco, 'fire')

let throwingFire = new Attack('Throwing Fire', fireIco, '2', 'you spit fire from your mouth that burns your enemy')
let bubbleBlast = new Attack('Bubble Blast', waterIco, '2', 'launch soap bubbles that punch your enemy and burns their eyes')
let woodWipe = new Attack('Wood Wipe', plantIco, '2', 'move your wood parts making a wipe that stings the enemy')

mokepones.push(rinodoge, capipepo, ratiguella, hyponius, torteir, firowl)
attacks.push(throwingFire, bubbleBlast, woodWipe)

function gameStart() {
    selectAttack.style.display = 'none'
    mokepones.forEach((mokepon) => {
        mokeponOption = `
        <input type="radio" name="mascota" id="${mokepon.name}"/>
        <label id="mokepon" class="card" for="${mokepon.name}"> 
            <img class="TypePicture" src=${mokepon.typePicture} alt=${mokepon.name}>
            <p class="subtitle">${mokepon.name}</p>
        </label>
        `
    mokeponContainer.innerHTML += mokeponOption
    })
    petButton.addEventListener('click', checkMokepon)
}
function checkMokepon(){
    mokeCPU()
    selectedMokepon = null
    inputMokepon = document.querySelectorAll('input[type=radio]')
    inputMokepon.forEach(mokepon => {
        if(mokepon.checked){
            selectedMokepon = mokepones.find(m => m.name === mokepon.id)
        }
    })
    if(selectedMokepon === null){
        alert("Selecciona una mascota")
    }else{
        showAtacks()
    }  
}
function mokeCPU(){
    mokeAleatorio = mokepones[aleatorio(0, mokepones.length -1)]
}
function showAtacks(){
    selectAttack.style.display = 'flex'
    selectPet.style.display = 'none'

    attacks.forEach(attack => {
        attackOption = `
        <input type="checkbox" name="mascota" id="${attack.name}"/>
        <label id="attack" class="card" for="${attack.name}"> 
            <p class="subtitle">${attack.name}</p>
            <img class="TypePicture" src=${attack.typePicture} alt=${attack.name}>
        </label> 
        `
    attackContainer.innerHTML += attackOption
    })
    attackButton.addEventListener('click', checkAttack)
}
function checkAttack() {
    attackCPU();
    inputAttacks = document.querySelectorAll('input[type=checkbox]');
    const NodeArray = Array.from(inputAttacks)
    const inputArray = NodeArray.filter((input) => input.checked === true)
    for(let i=0; i<inputArray.length; i++){
        let inputId = inputArray[i].id
        for(let j=0; j<attacks.length; j++){
            let attackName = attacks[j].name
            if(inputId === attackName){
                selectedAttacks.push(attacks[j])
                console.log(selectedAttacks)
            }
        }
    }    
    showbattle();
    }
function attackCPU(){
    for (i=0; i<4; i++){
        
        attackAleatorio.push(attacks[aleatorio(0, attacks.length -1)])
    }
    
}
function showbattle(){
    selectAttack.style.display = 'none'
    battle.style.display = 'flex'
    mokeponOption= `
    <div class="mokepon">
            <p class="subtitle">${selectedMokepon.name}</p>
            <img src="${selectedMokepon.image}" alt="${selectedMokepon.name}" class="moke-Picture">
            <div class="moke-atributes">
                <img src="${selectedMokepon.typePicture}" alt="" class="TypePicture">
                <p class="moke-HP">${selectedMokepon.HP}</p>
            </div>
        </div>
    `
    mokeponRandomOption = `
        <div class="mokepon">
            <p class="subtitle">${mokeAleatorio.name}</p>
            <img src="${mokeAleatorio.image}" alt="${mokeAleatorio.name}" class="moke-Picture">
            <div class="moke-atributes">
                <img src="${mokeAleatorio.typePicture}" alt="" class="TypePicture">
                <p class="moke-HP">${mokeAleatorio.HP}</p>
            </div>
        </div>
        `
    battleMokepons.innerHTML = mokeponOption + mokeponRandomOption

    selectedAttacks.forEach((attack) => {
        attackOption = `
        <li id="attack" class="card"> 
            <p class="subtitle">${attack.name}</p>
            <img class="TypePicture" src=${attack.typePicture} alt=${attack.name}>
        </li> 
        `
        selectedAttacksList.innerHTML += attackOption
    })
    BattleStart()
}
function BattleStart(){
    
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', gameStart)