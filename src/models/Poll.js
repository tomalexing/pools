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
    return Math.round(this.answers.l.quantity * 100 / (this.answers.l.quantity + this.answers.r.quantity));
  }

  @computed
  get rightPercentage() {
     return 100 - this.leftPercentage;
  }

  setProgress = _ => {
    let card = this;

    return loadFromStore(card.id).then(_ => {}, _ => {
      loadFromStore(card.slug).then((val) => {
          val.Progress.number = val.Progress.number + 1;
          saveToStore(card.slug, val ).then(_ => Api.saveUserData() )
        }, _ => {
          saveToStore(card.slug, {current: card.number -1 , Progress:{number:1}}).then(_ => Api.saveUserData() )
        }).catch( _ => {} );
    }).catch( _ => {} );

  }

  async setUserVote({l, r}){
    this.answers.l.quantity += l;
    this.answers.r.quantity += r;
    
    await this.setProgress().catch(_ => {});

    if(l > 0){
      await saveToStore(this.id, 'left');
    }

    if(r > 0){
      await saveToStore(this.id, 'right');
    }

    await Api.changeScoresPolls(this.id, {l, r}).catch(_ => {});

    this.updating = false; 
    
  }
  
  get voteSetted(){
    return this.vote
  }

  set voteSetted(vote){
    this.vote = vote
  }

  getUserVote(){
    return loadFromStore(this.id).then(
      choosen => choosen, _ => this.vote = null
    ).catch( _ => {} );
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