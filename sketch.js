let nivel = 1;
let pera; //Lo que aumenta la cola
let regla = 15; //Regla
let snake;
let pLoc = {}; //Lo que guia la cola en direccion a la cabeza
let highest = 0;
let game_over = new Audio(src = 'library/game_over.mp3');
let comer = new Audio(src = 'library/comer.mp3');

function setup() {
    pera = new Comida();
    snake = new Cabeza();
    textSize(14);
    textStyle(BOLD);

    for (let i = 0; i < 2; i++) {
        snake.colas.push(new Cola(snake.x, snake.y + (15 * i)));
    }
}

function draw() {
    if (nivel==1) {
        createCanvas(300, 300);//20x20
        frameRate(5);
    }
    if (nivel==2) {
        createCanvas(375, 375);//25x25
        frameRate(10);
    }
    if (nivel==3) {
        createCanvas(450, 450);//30x30
        frameRate(15);
    }
    if (nivel==4) {
        createCanvas(600, 600);//40x40
        frameRate(25);
    }
    if (nivel==5) {
        createCanvas(900, 900);//60x60
        frameRate(30);
    }

    background(198, 166, 100);

    noStroke(); //Mostrar regla
    noFill();
    for (let i = 0; i < height; i += regla) {
        for (let j = 0; j < width; j += regla) {

            rect(j, i, regla, regla);

        }
    }
    
    for (let i = snake.colas.length - 1; i >= 0; i--) {
        if (i == 0) {
            snake.colas[i].x = snake.x;
            snake.colas[i].y = snake.y;
        } else {
            snake.colas[i].x = snake.colas[i - 1].x;
            snake.colas[i].y = snake.colas[i - 1].y;
        }
        snake.colas[i].show();
    }

    pLoc.x = snake.x;
    pLoc.y = snake.y;
    snake.update();

    if (snake.colision(pera)) {
        comer.play();
        snake.puntaje++;
        pera.comer();
        snake.colas.push(new Cola(pLoc.x, pLoc.y));
        
        //Niveles
        if (snake.puntaje>=4) {
           nivel=2;           
           if (snake.puntaje>=8) {
               nivel=3;
               if (snake.puntaje>=20) {
                   nivel=4;
                   if (snake.puntaje>=30) {
                    nivel=5;
                    }
               }
           }
        }
    }

    if (snake.puntaje > highest) {
        highest = snake.puntaje;
    }

    if (snake.colision(pera) == false || snake.colision_cola() == true) {
        game_over.play();
        snake.definir();
        nivel = 1;
        pera.comer();
    }

    pera.show();

    fill(43, 51, 25);
    text("Puntaje: " + int(snake.puntaje), 10, height - 25);
    text("Record maximo: " + int(highest), 10, height - 10);
    text("Nivel: " + int(nivel), 10, height * 0.07);
    snake.show();
    noFill();
    strokeWeight(4);
    stroke(43, 51, 25);
    rect(1, 1, width - 2, height - 2);
}

function keyPressed() {
    if (keyCode == LEFT_ARROW && snake.dir != 'right') {
        snake.dir = 'left';
    } else if (keyCode == RIGHT_ARROW && snake.dir != 'left') {
        snake.dir = 'right';
    } else if (keyCode == UP_ARROW && snake.dir != 'down') {
        snake.dir = 'up';
    } else if (keyCode == DOWN_ARROW && snake.dir != 'up') {
        snake.dir = 'down';
    }
}