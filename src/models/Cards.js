import { observable, computed, action, autorun } from "mobx";
import {LazyImagem, lerp} from '../utils'
import Quiz from "./Quiz";
import Poll from "./Poll";
import Card from "./Card";
import {loadFromStore , saveToStore} from "./../services/localDb";
import Api from "./../services/Api";
export default class Cards {

  constructor({getIds, cardSlug, dashTitle, dashOutput, tryAgainIsCleanPrevious}){
    this.cardSlug = cardSlug;
    this.dashTitle = dashTitle || '';
    this.dashOutput = dashOutput || 'number';
    this.tryAgainIsCleanPrevious = tryAgainIsCleanPrevious || false;
    this.bindModel(getIds);
    this.saveSlugsCardsInProcess();
  }

  bindModel = (getIds) => {
    let that = this;

    getIds(this.cardsModel).then( ids =>{ 
      that.cards = ids;
    })
  }

  saveSlugsCardsInProcess = () => {
    let cards = this;
    this.save()
    loadFromStore('SlugsCardsInProcess').then(val => {
      let alreadyAdded = val.find(slug => slug == cards.cardSlug);
      if(!alreadyAdded){
        val.push(cards.cardSlug);
        saveToStore('SlugsCardsInProcess', val);
      }
    }, _ => {
      saveToStore('SlugsCardsInProcess', [cards.cardSlug]);
    })
  }

  @observable current = 0;
  @observable next = 1; // correct value defined in Quiz conctructor

  @observable canMakeAction = true;
  
  @observable cards = [];
  @observable cardsModel = new Map();
  @observable positionStyles = {};
  @observable IsEnd = false;

  initialNumber = this.cards.length;
  isStack = false;

  @computed
  get previuos(){
    return Math.max(Math.min(this.current - 1, this.allCardsNumber), 0)
  }

  @computed
  get getPositionStyles() {
      let addAbsolute = false;
      if(Object.keys(this.positionStyles).length > 0 ){
        addAbsolute = true;
      }
      return Object.entries(this.positionStyles).reduce((acc,[key, val]) => Object.assign(acc,{[key]:`${val}px`}), addAbsolute ? {'position':'fixed', display: 'block'}:{});
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
    return this.next > this.cards.length - 2;
  }

  @computed
  get currentIsEnd() {
    return this.current > this.cards.length - 2;
  }
    
  @computed
  get currentCard() {
      
      if(this.current > this.cards.length -1 || this.current < 0) return null


      if( !this.cardsModel.has( this.previuos ) ){
        let card = new Card(this.cardSlug), cards = this;
        card.retrieveCard(this.cards[this.previuos], this.previuos + 1).then( card => {
          cards.cardsModel.set(this.previuos, card);
        })
      }


      if( this.cardsModel.has(this.current) ){
          return this.cardsModel.get(this.current)
      }else{ 
          let card = new Card(this.cardSlug), cards = this;
          return card.retrieveCard(this.cards[this.current], this.current + 1).then( card => {
            cards.cardsModel.set(cards.current, card);
            return card
          }).then(card => card)
      }
  }

  @computed
  get allCardsNumber() {
    return this.cards.length
  }

  @computed
  get pickedNumber() {
    var number = 0;
    for (let [key, card] of this.cardsModel) {
      if(card.cardType == "poll" && !!card.voteSetted){
        number++;
      }
    }
    return number;
  }

  ditch(){
    for (let [key, card] of this.cardsModel) {
      card.isInfoVisible = false;
      card.selectedValue = null;
      card.showCorrectAnswer = false;
    }
  }
  
  clear(){
    this.cardsModel.clear()

  }

  clearProgress(){
    let cards = this;
    for (let [key, card] of this.cardsModel) {
      if(this.tryAgainIsCleanPrevious){
        card.selectedValue = null;
        card.showCorrectAnswer = false;
      }
      
    }

    loadFromStore(cards.cardSlug).then(val => {
        if(!val.Progress) return

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
      if(thisCurrent > this.cards.length - 1  || thisCurrent < 0) return null


      if( this.cardsModel.has(thisCurrent) ){
          return this.cardsModel.get(thisCurrent)
      }else{
          let card = new Card(this.cardSlug), cards = this;
          return card.retrieveCard(this.cards[thisCurrent], thisCurrent + 1).then( card => {
            cards.cardsModel.set(thisCurrent, card);
            return card
          }).then(card => card)
    
      }

  }

  Progress = {number: this.current, final: false};
  
  saveFinalCard(){
      let cards = this;
      let isEnd = cards.IsEnd;
      loadFromStore(cards.cardSlug).then(val => {
          if(!val.Progress)
            val.Progress = {};

          val.Progress.final = true;
          cards.Progress.final = true;
          cards.Progress.number = cards.current;
          saveToStore(cards.cardSlug, {
            current: cards.allCardsNumber - 1,
            Progress: val.Progress
          }).then(_=>{
            Api.saveUserData().then(_ => Promise.resolve(true))
          })
        }, _ => {
            saveToStore(cards.cardSlug, {
              current: cards.current,
              Progress: cards.Progress
            }).then(_=>{
              Api.saveUserData().then(_ => Promise.resolve(true))
            })
        })
  }


  // actually only current saved here
  save(){
    let cards = this;
    loadFromStore(cards.cardSlug).then(val => {
      val.current = cards.current
      saveToStore(cards.cardSlug, val)
        .then(_=>{
        Api.saveUserData().then(_ => Promise.resolve(true))
      })
    }, _ => {
        saveToStore(cards.cardSlug, {
          current: cards.current,
          Progress: cards.Progress
        }).then(_=>{
          Api.saveUserData().then(_ => Promise.resolve(true))
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
        that.IsEnd = val.Progress ? val.Progress.final : false;
        return current
      }, console.log)
  }

  static saveLike(cardSlug){ // Todo: fallback
    return loadFromStore(cardSlug).then(cardSlugData => {
      if(cardSlugData.liked) return Promise.resolve(true);
      cardSlugData.liked = true;
      return saveToStore(cardSlug, cardSlugData).then( _ => {
        Api.saveUserData().then(_ => Promise.resolve(true))
      })
    })
  }

  static isLiked(cardSlug){ // Todo: fallback
    return loadFromStore(cardSlug).then(cardSlugData => {
      if(cardSlugData.liked) return Promise.resolve(true);
      else return Promise.resolve(false);
    }, ()=> {
      return Promise.resolve(false);
    })
  }
    
  static allProgress(cardSlug){
      return loadFromStore(cardSlug).then(val => val, () => {
        // Api.loadUserData({forceLoad: true}).then(data => {
        //     if( ! data[cardSlug] ) return Promise.resolve({number:0, iqValue: 0});
        //     let reload = prompt('Error has happened. Reload page?', 'yes');
        //     if( reload == 'yes' )
        //     window.location.reload();
        // })
        return Promise.resolve({number:0, iqValue: 0});
      }).then(val => {
        if(!val) return {number:0, iqValue: 0}
        
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