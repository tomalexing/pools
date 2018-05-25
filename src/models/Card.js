import Quiz from "./Quiz";
import Poll from "./Poll";
import Api from "./../services/Api";

export default class Card {
    constructor(slug){
        this.slug = slug
    }

    async retrieveCard(id, number){
        let card = await Api.getCard(this.slug, id); 
        if(card.cardType == 'quiz')
            this.card = new Quiz(card, number, this.slug)
        if(card.cardType == 'poll')
            this.card = new Poll(card, number, this.slug)
        return new Promise(resolve => resolve(this.card))
    } 

    get instance(){
        return this.card
    }
}