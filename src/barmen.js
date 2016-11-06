'use strict';

module.exports= {
    Barman: function(cupboard){
        this.pour = function(drinkName, volume, client) {
            if (volume < 0) {
                throw new Error('Invalid volume of whisky');
            }

            if(client.isDrunken()){
                throw new Error('Sorry, its enough for you');
            }

            if(!cupboard.hasDrink(drinkName, volume)){
                throw new Error('Not enough ' + drinkName);
            }

            return cupboard.getDrink(drinkName, volume);
        };
    }}