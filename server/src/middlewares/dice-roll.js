// Export a function called "roll"
exports.roll = () => {
    // This is a helper function that generates a random number between 1 and 6
    const rollDie = () => Math.floor(Math.random() * 6) + 1;

    // Roll two dice by calling the rollDie function twice, and store the results
    const die1 = rollDie();
    const die2 = rollDie();

    // Calculate the total of both dice rolls
    const total = die1 + die2;

    // Return an object containing the values for each die and their total
    return { die1, die2, total };
};
