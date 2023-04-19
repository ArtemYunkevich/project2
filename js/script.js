console.log("start");

const DEFAULT_MAP = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const fieldElement = document.querySelector(".field");
const infoElement = document.querySelector(".info");

const BLOCK_SIZE = 50; // размер блока

const FIELD_WIDTH = 10; // ширина поля
const FIELD_HEIGHT = 11; // высота поля

const NPC_NUMBER = 4;
const NPC_MOVEMENT_PROBABILITY = 0.05;


const field = {
    map: [],
    width: FIELD_WIDTH,
    height: FIELD_HEIGHT,
    values: {
        0: {
            name: 'forest',
            shortName: 'F',
            color: 'white',
            backgroundColor: 'green'
        },
        1: {
            name: 'grass',
            shortName: 'G',
            color: 'yellow',
            backgroundColor: 'lightgreen'
        },
        2: {
            name: 'road',
            shortName: 'R',
            color: 'gray',
            backgroundColor: 'wheat'
        },
    },

    init() {
        for (let y = 0; y < this.height; y++) {
            this.map[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.map[y][x] = DEFAULT_MAP[y][x];
            }
        }
        console.log(this.map);
    },

    draw() {
        fieldElement.innerHTML = '';
        for (let y = 0; y < this.height; y++) {

            for (let x = 0; x < this.width; x++) {
                const block = document.createElement('div');
                block.style.width = BLOCK_SIZE + 'px';
                block.style.height = BLOCK_SIZE + 'px';
                block.style.position = 'absolute';
                block.style.top = BLOCK_SIZE * y + 'px';
                block.style.left = BLOCK_SIZE * x + 'px';
                block.style.backgroundColor = this.values[this.map[y][x]].backgroundColor;
                fieldElement.appendChild(block);
            }
        }
        console.log(this.map);
    }



}

const player = {
    x: 0,
    y: 0,
    shortName: 'P',
    backgroundColor: 'blue',
    color: 'white',

    init() {
        this.y = 5;
    },

    draw() {
        const block = document.createElement('div');
        block.style.width = BLOCK_SIZE + 'px';
        block.style.height = BLOCK_SIZE + 'px';
        block.style.position = 'absolute';
        block.style.top = BLOCK_SIZE * this.y + 'px';
        block.style.left = BLOCK_SIZE * this.x + 'px';
        block.style.backgroundColor = this.backgroundColor;
        fieldElement.appendChild(block);
    }
}

const NPCs = {
    entities: [],
    init() {
        for (let i = 0; i < NPC_NUMBER; i++) {
            this.entities.push({
                x: Math.trunc(Math.random() * (FIELD_WIDTH - 3) + 3),
                y: Math.random() > 0.5 ? 4 : 6,
                shortName: 'E' + i,
                backgroundColor: 'red',
                color: 'white',



                draw() {
                    const block = document.createElement('div');
                    block.style.width = BLOCK_SIZE + 'px';
                    block.style.height = BLOCK_SIZE + 'px';
                    block.style.position = 'absolute';
                    block.style.top = BLOCK_SIZE * this.y + 'px';
                    block.style.left = BLOCK_SIZE * this.x + 'px';
                    block.style.backgroundColor = this.backgroundColor;
                    fieldElement.appendChild(block);
                }
            })
        }
    },

    draw() {
        for (let i = 0; i < NPC_NUMBER; i++) {
            this.entities[i].draw();
        }
    },

    update() {
        for (let i = 0; i < NPC_NUMBER; i++) {
            if (Math.random() < NPC_MOVEMENT_PROBABILITY) this.entities[i].x++;
            if (Math.random() < NPC_MOVEMENT_PROBABILITY) this.entities[i].x--;
            if (this.entities[i].x == FIELD_WIDTH) this.entities[i].x = FIELD_WIDTH - 1;
            if (this.entities[i].x < 0) this.entities[i].x = 0;
        }
    }
};



infoElement.innerHTML = "some info";


field.init();

player.init();

NPCs.init();

setInterval(() => {
    field.draw();
    player.draw();
    NPCs.update();
    NPCs.draw();

}, 100)

// добавить иконки
// добавить перемещение игрока
// добавить условие, чтобы NPC не пересекались

