// console.log('hello world');
//object to manipulate direction
const hero = {
    left:550,
    top: 700
};
const missiles = [];

const enemy = [
    {left: 200, top: 100},
    {left: 300, top: 100},
    {left: 400, top: 100},
    // {left: 500, top: 175},
    // {left: 600, top: 175},
    // {left: 700, top: 175}
];
// for( i = 3 ; i <= 9; i+=1){
//     enemy.push({left:i * 100,top:175})
// };



document.onkeydown = function(e) {
    // console.log(e.keycode); // logs any key pressed on board / i can then identify which keycode to assign per button through event
    if (e.keyCode === 37){
        console.log("left")
        hero.left = hero.left - 40; // every time we touch object it moves from object position
        moveHero()// everytime statement true run function 
    }
    else if (e.keyCode === 39){
        console.log("right")
        hero.left = hero.left + 40; // adds to make movement opposite
        moveHero()
    }
    else if (e.keyCode === 32){
        console.log("Fire")
        missiles.push({   // add object into missiles array positioned to missile
            left: hero.left + 15, // missile starts +15px to where hero starts 
            top: hero.top
        })
        fireMissiles()
    }
    moveHero();
};

const moveHero= ()=> {
    document.getElementById('hero').style.left = hero.left + 'px'; // grabs html object of hero, call the styling of object, calling .left redefining property adding px at end so i dont lose pixel from id in css styling 
    document.getElementById('hero').style.top = hero.top + 'px';
};


const fireMissiles= ()=> {
    document.getElementById('missiles').innerHTML ="";// grab elements that have missiles
    for(i = 0; i < missiles.length; i++){
        document.getElementById('missiles').innerHTML += 
        `<div class='missile1' id='missiles${i}' style='left:${missiles[i].left}px;
        top:${missiles[i].top}px;'></div>`; // adds a string to missiles, then bases missiles properties(any number position relative screen/ie 255)
        //highlighted missiles is array , missile gives exact number of missile currently on, .left looks at missile property position, adding style of left and top of value of px
        // missiles[missiles].top// grabs each object of array 
        // missiles[missile1].left
    }
};

const moveMissiles= () =>{
    for( i = 0; i < missiles.length; i++){
        missiles[i].top = missiles[i].top -5;// top element each missile has a top property to redraw a new missile
    }
};

const drawEnemies= ()=>{
    document.getElementById('enemies').innerHTML = "";
    for(i = 0; i < enemy.length; i++){
        document.getElementById('enemies').innerHTML += 
        `<div class='enemy' id='enemy${i}' style='left:${enemy[i].left}px;
        top:${enemy[i].top}px'></div>`; //make various enemy on board
    }    
};
// console.log(enemies);

const moveEnemies= () =>{
    for( i = 0; i < enemy.length; i++){
        enemy[i].top = enemy[i].top +3;// moves enemies toward yourship
    }
};

const collisionDetection= ()=>{
    const enemies = enemy
    if(missiles.length > 0){ // looking for missiles to be fired 
    for( i = 0; i < enemies.length; i++){
        
            if(
                missiles[missiles.length-1].left >= enemies[i].left  &&
                missiles[missiles.length-1].left <= (enemies[i].left + 150)  &&
                missiles[missiles.length-1].top <= enemies[i].top + 150 && 
                missiles[missiles.length-1].top > enemies[i].top
            ){
                $(`#missiles${i}`).remove()
                $(`#enemy${i}`).remove()
                enemy.splice(i, 1)
                missiles.splice(missiles.length-1, 1)
                console.log(enemy)
            };
            
        
    }
    }
};
let hasWon = false;

const checkWin= ()=>{
    if (
        enemy.length < 1
    ){
        hasWon = true;
        console.log("I won")
    }
};


function gameLoop(){
    checkWin();
    if(hasWon === true){
        $("body").html(`<div><h1>You Won</h1></div>`)

        return;
    } 
    setTimeout(gameLoop,50)// method to control timing
    moveMissiles();
    fireMissiles();
    moveEnemies();
    drawEnemies();
    collisionDetection();
    
};
gameLoop();