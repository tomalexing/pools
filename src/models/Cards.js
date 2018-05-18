import { observable, computed, action, autorun } from "mobx";
import {LazyImagem, lerp} from '../utils'
import Quiz from "./Quiz";
import Pool from "./Pool";
import Card from "./Card";
import {loadFromStore , saveToStore} from "./../services/localDb";

export default class Cards {

  constructor({getIds, cardSlug, dashTitle, dashOutput, tryAgainIsCleanPrevious}){
    this.cardSlug = cardSlug;
    this.dashTitle = dashTitle || '';
    this.dashOutput = dashOutput || 'number';
    this.tryAgainIsCleanPrevious = tryAgainIsCleanPrevious || false;
    this.bindModel(getIds);
  }

  bindModel = (getIds) => {
    let that = this;

    getIds(this.quizesModel).then( ids =>{ 
      that.quizes = ids;
    })
  }

  @observable current = 0;
  @observable next = 1; // correct value defined in Quiz conctructor

  @observable canMakeAction = true;
  
  @observable quizes = [];
  @observable quizesModel = new Map();
  @observable positionStyles = {};
  @observable IsEnd = false;

  initialNumber = this.quizes.length;
  isStack = false;

  @computed
  get getPositionStyles() {
      let addAbsolute = false;
      if(Object.keys(this.positionStyles).length > 0 ){
        addAbsolute = true;
      }
      return Object.entries(this.positionStyles).reduce((acc,[key, val]) => Object.assign(acc,{[key]:`${val}px`}), addAbsolute ? {'position':'absolute', display: 'block'}:{});
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
  get allCardsNumber() {
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

  ditch(){
    for (let [key, card] of this.quizesModel) {
      card.isInfoVisible = false;
      card.selectedValue = null;
      card.showCorrectAnswer = false;
    }
  }
  
  clear(){
    this.quizesModel.clear()

  }

  clearProgress(){
    let cards = this;
    for (let [key, card] of this.quizesModel) {
      if(this.tryAgainIsCleanPrevious){
        card.selectedValue = null;
        card.showCorrectAnswer = false;
      }
      
    }

    loadFromStore(cards.cardSlug).then(val => {
        val.Progress.final = false;
        cards.IsEnd = false;

        if(this.tryAgainIsCleanPrevious)
          val.Progress.number = 0;
        
        saveToStore(cards.cardSlug, {
            current: 0,
            Progress: val.Progress
          });
        }, _ => {
          saveToStore(cards.cardSlug, {
            current: 0,
            Progress: cards.Progress
          });
        })
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

  Progress = {number: this.current, final: false};
  
  saveFinalCard(){
      let cards = this;
      let isEnd = cards.IsEnd;
      loadFromStore(cards.cardSlug).then(val => {
          val.Progress.final = true;
          cards.Progress.final = true;
          cards.Progress.number = cards.current;
          saveToStore(cards.cardSlug, {
            current: val.current,
            Progress: val.Progress
          });
        }, _ => {
            saveToStore(cards.cardSlug, {
              current: cards.current,
              Progress: cards.Progress
            });
        })
  }

  save(){
    let cards = this;
    loadFromStore(cards.cardSlug).then(val => {
        cards.Progress.number = val.Progress.number;
        saveToStore(cards.cardSlug, {
          current: cards.current,
          Progress: val.Progress
        });
      }, _ => {
          saveToStore(cards.cardSlug, {
            current: cards.current,
            Progress: cards.Progress
          });
      })
    

  }

  @action.bound
  load = _ => {
    let that = this;
    return loadFromStore(this.cardSlug).then(
      (val) => {
        let current = val.current;
        that.current = current || 0;
        that.next = current + 1 || 1;
        that.Progress = val.Progress;
        that.IsEnd = val.Progress.final;
        return current
      }, console.log)
  }
    
  @computed
  get allProgress(){
      return loadFromStore(this.cardSlug).then(val => val, console.log)
        .then(val => {
        
          if(!val) return {number:0}
        
        var {number} = val.Progress;
        let iqValue = 0;
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
        if(number>20) iqValue = '>140';

        return { number , iqValue }
    
    })
    
  
  }

}