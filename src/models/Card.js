import Quiz from "./Quiz";
import Pool from "./Pool";
import Api from "./../services/Api";

export default class Card {
    constructor(slug){
        this.slug = slug
    }

    async retrieveCard(id, number){
        let card = await Api.getCard(this.slug, id); 
        if(card.cardType == 'Quiz')
            this.card = new Quiz(card, number, this.slug)
        if(card.cardType == 'Pool')
            this.card = new Pool(card, number, this.slug)
        return new Promise(resolve => resolve(this.card))
    } 

    get instance(){
        return this.card
    }
}