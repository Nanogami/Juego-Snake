class Comida {

    constructor() {
        this.x = floor(random(0, width) / regla) * regla;
        this.y = floor(random(0, height) / regla) * regla;
    }

    comer() {
        this.x = floor(random(0, width) / regla) * regla;
        this.y = floor(random(0, height) / regla) * regla;

        if (this.x == snake.x || this.y == snake.y) {
            this.comer();
        }
    }

    show() {
        fill(180, 200, 30);
        rect(this.x, this.y, regla, regla, 4);
    }
}