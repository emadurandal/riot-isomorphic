'use strict'
import riot from 'riot';
import RiotControl from 'riotcontrol';
import fetch from 'isomorphic-fetch';
import Q from 'q';

function FruitStore() {
    console.log("Init FruitStore");

    riot.observable(this);
    this.currentFruit = null;

    this.on("fruit_swap", async function (fruit) { 
        try {
            this.currentFruit = fruit;

            if (fruit) {
                // Get fruit types
                console.log("Getting info for ", fruit);
                let response = await fetch('http://localhost:3000/service/fruit/' + fruit);
                this.fruitData = await response.json();
                RiotControl.trigger("fruit_data_updated");
            }
        }
        catch (e) {
            console.log("Error getting fruit data ", e);                    
        }
    });
};


let instance = new FruitStore();
RiotControl.addStore(instance);
export default instance;
