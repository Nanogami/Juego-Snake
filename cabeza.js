class Cabeza {
    constructor() {
        this.x = floor(width / (2 * regla)) * regla;
        this.y = floor(height / (2 * regla)) * regla;
        this.dir = 'up';
        this.puntaje = 0;
        this.colas = [];
    }

    update() {
        if (this.dir == 'left') {
            this.x -= regla;
        } else if (this.dir == 'right') {
            this.x += regla;
        } else if (this.dir == 'up') {
            this.y -= regla;
        } else if (this.dir == 'down') {
            this.y += regla;
        }
    }

    definir() {
        this.x = floor(width / (2 * regla)) * regla;
        this.y = floor(height / (2 * regla)) * regla;
        this.dir = 'up';
        this.puntaje = 0;
        this.colas = [];

        for (let i = 0; i < 2; i++) {
            snake.colas.push(new Cola(snake.x, snake.y + (15 * i)));
        }
    }

    colision_cola() {
        for (let i = 0; i < this.colas.length; i++) {
            if (this.x == this.colas[i].x && this.y == this.colas[i].y) {
                return true;
            }
        }
    }

    colision(obj) {
        if (this.x == obj.x && this.y == obj.y) {
            return true;
        }
        if (this.x >= width || this.x < 0 || this.y >= height || this.y < 0) {
            return false;
        }
    }

    show() {
        fill(23, 31, 10);
        rect(this.x, this.y, regla, regla, 4);
    }
}