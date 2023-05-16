//Roll two dice and return the result as a JSON object
exports.roll = () => { 
    const rollDie = () => Math.floor(Math.random() * 6) + 1;
    const die1 = rollDie();
    const die2 = rollDie();
    const total = die1 + die2;
    return { die1, die2, total };
}