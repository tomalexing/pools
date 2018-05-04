import { observable, computed, action } from "mobx";
import {LazyImagem, lerp} from '../utils'
import Quiz from "./Quiz";
import Pool from "./Pool";
import Card from "./Card";
import {loadFromStore , saveToStore} from "./../services/localDb";


export default class Cards {

  constructor({getIds, cardSlug}){
    this.cardSlug = cardSlug;
    let that = this;
    getIds(this.quizesModel).then( ids =>{ 
      that.quizes = ids;
    })
    //populateTo({acc:this.quizes, models:this.quizesModel});
  }

  @observable current = 0;
  @observable next = 1; // correct value defined in Quiz conctructor

  @observable canMakeAction = true;
  
  @observable quizes = [];
  @observable quizesModel = new Map();
  @observable positionStyles = {};
  @observable IsEnd = false;

  initialNumber = this.quizes.length;

  @computed
  get getPositionStyles() {
      let addAbsolute = false;
      if(Object.keys(this.positionStyles).length > 0 ){
        addAbsolute = true;
      }
      return Object.entries(this.positionStyles).reduce((acc,[key, val]) => Object.assign(acc,{[key]:`${val}px`}), addAbsolute ? {'position':'absolute'}:{});
  }

  @computed
  get getCurrrent() {
      return this.current;
  }

  @computed
  get _rotationLerp(){
    let {width} = this.positionStyles;
    return lerp(0, width/2, 0, 10, {noClamp: true});
  }

  @computed
  get _leftSwipe(){
    let {width} = this.positionStyles;
    return lerp(0, -width/3, 0, 1);
  }

  @computed
  get _rightSwipe(){
    let {width} = this.positionStyles;
    return lerp(0, width/3, 0, 1);
  }

  @computed
  get _upSwipe(){
    let {height} = this.positionStyles;
    return lerp(-height/8, -height/8 - height/3, 0, 1);
  }

  @computed
  get nextIsEnd() {
    return this.next > this.quizes.length - 2;
  }

  @computed
  get currentIsEnd() {
    return this.current > this.quizes.length - 2;
  }
    
  @computed
  get currentCard() {
      
      if(this.current > this.quizes.length -1 || this.current < 0) return null

      if( this.quizesModel.has(this.current) ){
          return this.quizesModel.get(this.current)
      }else{ 
          let card = new Card(this.cardSlug), cards = this;
          return card.retrieveCard(this.quizes[this.current], this.current + 1).then( card => {
            cards.quizesModel.set(cards.current, card);
            return card
          }).then(card => card)
      }
  }

  @computed
  get allQuizNumber() {
    return this.quizes.length
  }

  @computed
  get pickedNumber() {
    var number = 0;
    for (let [key, card] of this.quizesModel) {
      if(card.cardType == "Quiz" && !!card.voteSetted){
        number++;
      }
    }
    return number;
  }

  clearPool(){
    var number = 0;
    for (let [key, card] of this.quizesModel) {
      if(card.cardType == "Pool"){
        card.selectedValue = null;
        card.showCorrectAnswer = false;
      }
    }
  }

  @computed
  get nextCard() {

      let thisCurrent = this.next;
      if(thisCurrent > this.quizes.length - 1  || thisCurrent < 0) return null


      if( this.quizesModel.has(thisCurrent) ){
          return this.quizesModel.get(thisCurrent)
      }else{
          let card = new Card(this.cardSlug), cards = this;
          return card.retrieveCard(this.quizes[thisCurrent], thisCurrent + 1).then( card => {
            cards.quizesModel.set(thisCurrent, card);
            return card
          }).then(card => card)
    
      }
  }

  
  save(){
 
    saveToStore(this.cardSlug, {
      current: this.current
    });
  }

  load(){
    let that = this;

    return loadFromStore(this.cardSlug).then(
      (val) => {
        let current = val.current;

        that.current = current || 0;
        that.next = current + 1 || 1;
        return current
      }, console.log)
  }
  
  @computed
  get IQ(){
    let iqValue = 100;   
    var number = 0;
    for (let [key, card] of this.quizesModel) {
      if(card.cardType == "Pool" && !!card.isCorrect){
        number++;
      }
    }

    switch (number) {
      case 1:
        iqValue = 40;
        break;
      case 2:
        iqValue = 45;
        break;
      case 3:
        iqValue = 50;
        break;
      case 4:
        iqValue = 60;
        break;
      case 5:
        iqValue = 65;
        break;
      case 6:
        iqValue = 70;
        break;
      case 7:
        iqValue = 75;
        break;
      case 8:
        iqValue = 80;
        break;
      case 9:
        iqValue = 80;
        break;
      case 10:
        iqValue = 80;
        break;
      case 11:
        iqValue = 85;
        break;
      case 12:
        iqValue = 90;
        break;
      case 13:
        iqValue = 95;
        break;
      case 14:
        iqValue = 100;
        break;
      case 15:
        iqValue = 105;
        break;
      case 16:
        iqValue = 110;
        break;
      case 17:
        iqValue = 115;
        break;
      case 18:
        iqValue = 120;
        break;
      case 19:
        iqValue = 130;
        break;
      case 20:
        iqValue = 140;
        break;
      default:
        break;
    }
    return iqValue
  }

}