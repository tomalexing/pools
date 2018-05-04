import { observable, computed, action } from "mobx";
import {loadFromStore , saveToStore} from "./../services/localDb";
import Api from "./../services/Api";

export default class Quiz{
  
  id;
  number = 1;
  ref = null;
  reactClass = null;
  cardType = null;

  @observable question;
  @observable inmovable = false;
  @observable answers = {}
  @observable isInfoVisible = false;
  @observable lImageLoaded = false;
  @observable rImageLoaded = false;

  @computed
  get leftPercentage() {
    return Math.round(this.answers.l.quantity * 100 / (this.answers.l.quantity + this.answers.r.quantity));
  }

  @computed
  get rightPercentage() {
     return 100 - this.leftPercentage;
  }

  voteSetted = false;

  setUserVote({l, r}){

    this.answers.l.quantity += l;
    this.answers.r.quantity += r;
    

    if(l > 0){
      saveToStore(this.id, 'left' );
    }

    if(r > 0){
      saveToStore(this.id, 'right' );
    }

    Api.changeScoresQuizzes(this.id, {l, r});
    
  }

  getUserVote(){
    return loadFromStore(this.id).then(
      choosen => choosen, console.log
    );
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

  @computed
  get isCurrent(){
    return this.ref.classList.contains('currentCard')
  }

  constructor({id, question, answers, cardType}, number) {
    this.id = id ||  Math.floor(10000 *Math.random());
    this.number = number;
    this.question = question;
    this.answers = answers;
    this.cardType = cardType;
  }

  update({question, answers, cardType}) {
    this.answers = answers;
  }
  
}