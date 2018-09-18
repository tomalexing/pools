import { observable, computed, action } from "mobx";
import {loadFromStore , saveToStore} from "./../services/localDb";
import Api from "./../services/Api";

export default class Poll{
  
  id;
  number = 1;
  ref = null;
  reactClass = null;
  cardType = null;
  vote = null;
  @observable question;
  @observable inmovable = false;
  @observable answers = {}
  @observable isInfoVisible = false;
  @observable lImageLoaded = false;
  @observable rImageLoaded = false;
  @observable updating = false;

  @computed
  get leftPercentage() {

    if(this.answers.l.quantity + this.answers.r.quantity == 0){
      return 0
    }

    return Math.round(this.answers.l.quantity * 100 / (this.answers.l.quantity + this.answers.r.quantity));
  }

  @computed
  get rightPercentage() {
     return 100 - this.leftPercentage;
  }

  setProgress = async _ => {
    let card = this;
    return loadFromStore('commonSlugs').then(cardsStore => {

        let val = cardsStore[card.slug];
        
        if(val.Progress){

          cardsStore[card.slug] =  Object.assign(val, {
            current: card.number - 1,
            Progress: Object.assign(val.Progress, {number: val.cards[card.id] ? Object.values(val.cards).length : Object.values(val.cards).length + 1})
          })
          //return saveToStore('commonSlugs', cardsStore).then( _ => Api.saveUserData().then(_ => Promise.resolve(true)))
          return cardsStore
           

        }else{

          cardsStore[card.slug] =  Object.assign(val, {
            current: card.number - 1,
            Progress: {number: 1, final: false}
          })
          //return saveToStore('commonSlugs', cardsStore).then( _ => Api.saveUserData().then(_ => Promise.resolve(true)))
          return cardsStore

        }
    }).catch( _ => {} );

  }

  async saveUserVote(cardSlideId, side, cardsStore = null){
    let card = this;

    if(cardsStore) {
      let val = cardsStore[card.slug];
      cardsStore[card.slug] =  Object.assign(val, {
        cards: Object.assign(val.cards || {}, {[cardSlideId]: {position: side, time: (new Date).toISOString()}})
      })
      return saveToStore('commonSlugs', cardsStore).then( _ => Api.saveUserData().then(_ => Promise.resolve(true)))
    }

    return loadFromStore('commonSlugs').then(cardsStore => {
      let val = cardsStore[card.slug];
      cardsStore[card.slug] =  Object.assign(val, {
        cards: Object.assign(val.cards || {}, {[cardSlideId]: side})
      })
      return saveToStore('commonSlugs', cardsStore).then( _ => Api.saveUserData().then(_ => Promise.resolve(true)))
     })

  }

  async setUserVote({l, r}){
    this.answers.l.quantity += l;
    this.answers.r.quantity += r;
    
    this.answers.l.quantity = Math.max(0, this.answers.l.quantity);
    this.answers.r.quantity = Math.max(0, this.answers.r.quantity);

    let cardsStore = await this.setProgress().catch(_ => {});

    if(l > 0){
      await this.saveUserVote(this.id, 'left', cardsStore)
    }

    if(r > 0){
      await this.saveUserVote(this.id, 'right', cardsStore);
    }
    // maybe await
    Api.changeScoresPolls(this.slug ,this.id, {l, r}).catch(_ => {});

    this.updating = false; 
    
  }
  
  get voteSetted(){
    return this.vote
  }

  set voteSetted(vote){
    this.vote = vote
  }

  getUserVote(){
    let card = this;

    return loadFromStore('commonSlugs').then(cardsStore => {
      let val = cardsStore[card.slug];
      return val.cards ? val.cards[card.id] : this.vote = null
     }).catch( _ => {});
  }

  @action
  setRImageLoaded(){

    this.rImageLoaded = true;
  }

  @action
  setLImageLoaded(){
    this.lImageLoaded = true;
  }

  @computed
  get isImageLoaded(){
    return this.rImageLoaded && this.lImageLoaded
  }

  isCurrent(cur){ 
    return cur == this.number - 1
  }

  constructor({id, question, answers, cardType}, number, slug) {
    this.id = id ||  Math.floor(10000 *Math.random());
    this.number = number;
    this.question = question;
    this.answers = answers;
    this.cardType = cardType;
    this.slug = slug;
    setTimeout(() => {
      this.rImageLoaded = true;
      this.lImageLoaded = true;
    }, 300);

  }

  update({question, answers, cardType}) {
    this.answers = answers;
  }
  
}