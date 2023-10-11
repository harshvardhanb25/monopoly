/**
 * This file contains the Player model.
 * It represents a player in monopoly.
 * It keeps track of the player's name, money, properties, and mortgaged properties.
 */
class Player {
    constructor(name) {
      this.name = name;
      this.position = 0; // Starting position
      this.balance = 1500; // Starting balance
      this.properties = [];
      this.consecutiveDoubles = 0; // Number of consecutive doubles rolled
      this.jailStatus = false; // Whether the player is in jail
      this.jailTurns = 0; // Number of turns spent in jail
      this.getOutOfJailCards = 0; // Number of "Get Out of Jail Free" cards
    }
  
    getName() {
      return this.name;
    }
  
    getPosition() {
      return this.position;
    }
  
    setPosition(position) {
      this.position = position;
    }
  
    getBalance() {
      return this.balance;
    }
  
    setBalance(balance) {
      this.balance = balance;
    }
  
    getProperties() {
      return this.properties;
    }
  
    addProperty(property) {
      this.properties.push(property);
    }
  
    removeProperty(property) {
      this.properties = this.properties.filter((p) => p !== property);
    }
  
    getJailStatus() {
      return this.jailStatus;
    }
  
    setJailStatus(status) {
      this.jailStatus = status;
    }
  
    getJailTurns() {
      return this.jailTurns;
    }
  
    setJailTurns(turns) {
      this.jailTurns = turns;
    }
  
    incrementJailTurns() {
      this.jailTurns++;
    }
  
    getGetOutOfJailCards() {
      return this.getOutOfJailCards;
    }
  
    addGetOutOfJailCard() {
      this.getOutOfJailCards++;
    }
  
    useGetOutOfJailCard() {
      if (this.getOutOfJailCards > 0) {
        this.getOutOfJailCards--;
      }
    }
}

export default Player;