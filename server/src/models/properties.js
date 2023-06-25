// Create all the properties for the properties in monopoly

import Property from './Property';

const properties = [
    new Property('Mediterranean Avenue', 60, [2, 10, 30, 90, 160, 250], 'brown'), // 0
    new Property('Baltic Avenue', 60, [4, 20, 60, 180, 320, 450], 'brown'), // 1
    new Property('Oriental Avenue', 100, [6, 30, 90, 270, 400, 550], 'lightblue'), // 2
    new Property('Vermont Avenue', 100, [6, 30, 90, 270, 400, 550], 'lightblue'), // 3
    new Property('Connecticut Avenue', 120, [8, 40, 100, 300, 450, 600], 'lightblue'), // 4
    new Property('St. Charles Place', 140, [10, 50, 150, 450, 625, 750], 'pink'), // 5
    new Property('States Avenue', 140, [10, 50, 150, 450, 625, 750], 'pink'), // 6
    new Property('Virginia Avenue', 160, [12, 60, 180, 500, 700, 900], 'pink'), // 7
    new Property('St. James Place', 180, [14, 70, 200, 550, 750, 950], 'orange'), // 8
    new Property('Tennessee Avenue', 180, [14, 70, 200, 550, 750, 950], 'orange'), // 9
    new Property('New York Avenue', 200, [16, 80, 220, 600, 800, 1000], 'orange'), // 10
    new Property('Kentucky Avenue', 220, [18, 90, 250, 700, 875, 1050], 'red'), // 11
    new Property('Indiana Avenue', 220, [18, 90, 250, 700, 875, 1050], 'red'), // 12
    new Property('Illinois Avenue', 240, [20, 100, 300, 750, 925, 1100], 'red'), // 13
    new Property('Atlantic Avenue', 260, [22, 110, 330, 800, 975, 1150], 'yellow'), // 14
    new Property('Ventnor Avenue', 260, [22, 110, 330, 800, 975, 1150], 'yellow'),  // 15
    new Property('Marvin Gardens', 280, [24, 120, 360, 850, 1025, 1200], 'yellow'), // 16
    new Property('Pacific Avenue', 300, [26, 130, 390, 900, 1100, 1275], 'green'),  // 17
    new Property('North Carolina Avenue', 300, [26, 130, 390, 900, 1100, 1275], 'green'), // 18
    new Property('Pennsylvania Avenue', 320, [28, 150, 450, 1000, 1200, 1400], 'green'), // 19
    new Property('Park Place', 350, [35, 175, 500, 1100, 1300, 1500], 'blue'), // 20 
    new Property('Boardwalk', 400, [50, 200, 600, 1400, 1700, 2000], 'blue'), // 21
    new Property('Reading Railroad', 200, [25, 50, 100, 200], 'black'), // 22
    new Property('Pennsylvania Railroad', 200, [25, 50, 100, 200], 'black'), // 23
    new Property('B. & O. Railroad', 200, [25, 50, 100, 200], 'black'), // 24
    new Property('Short Line Railroad', 200, [25, 50, 100, 200], 'black'), // 25
    new Property('Electric Company', 150, [4, 10], 'white'), // 26
    new Property('Water Works', 150, [4, 10], 'white'), // 27
];

export default properties;