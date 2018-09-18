import { observable, computed, action } from "mobx";
import {loadFromStore , saveToStore} from "./../services/localDb";
import Api from './../services/Api';

export default class Quiz {
  
  id;
  number = 1;
  ref = null;
  reactClass = null;
  cardType = null;
  questionSrcImg;
  question;
  answerCorrect;
  answers = [];
  @observable inmovable = true;
  @observable selectedValue = null;
  @observable showCorrectAnswer = false
  @observable ImageLoaded = !(typeof questionSrcImg == 'string')

  isCurrent(cur){ 
    return cur == this.number - 1
  }

  
  @action.bound
  setImageLoaded(){
    this.ImageLoaded = true;
  }

  async setProgress(idx){
    let Quiz = this;
    return loadFromStore('commonSlugs').then(cardsStore => {

        let val = cardsStore[Quiz.slug];

        if(val){

            // we need next card here current = (Quiz.number - 1) + 1
            cardsStore[Quiz.slug] =  Object.assign(val, {
              Progress: Object.assign(val.Progress, { number: Quiz.isCorrect ? Object.values(val.cards).filter(v=>!!v.isCorrect).length + 1 : Object.values(val.cards).filter(v=>!!v.isCorrect).length }),
              cards: Object.assign({}, val.cards, {[Quiz.id]: {isCorrect: Quiz.isCorrect, givenAnswer: idx + 1, time: (new Date).toISOString()}}) 
            })
            
            return saveToStore('commonSlugs', cardsStore).then( _ => Api.saveUserData())
            
        }else{

          if(Quiz.isCorrect){

            cardsStore[Quiz.slug] =  Object.assign(val, {
              current: Quiz.number,
              Progress: Object.assign(val.Progress, {number: 1})
            })
            saveToStore('commonSlugs', cardsStore).then(_ => Api.saveUserData());

          }else{

            cardsStore[Quiz.slug] =  Object.assign(val, {
              current: Quiz.number,
              Progress: Object.assign(val.Progress, {number: 0 })
            })

            saveToStore('commonSlugs', cardsStore).then(_ => Api.saveUserData());
          }
        }

      }).catch( _ => {});

  }

  @computed
  get isImageLoaded(){
    return this.ImageLoaded
  }

  /**
   * Is this quiz was correct?
   * 
   * @readonly
   * @memberof Quiz
   */
  @computed
  get isCorrect(){
    return this.answerCorrect == this.selectedValue
  }

  constructor({id, question, answers, cardType, questionSrcImg, answerCorrect}, number, slug) {
    this.id = id ||  Math.floor(10000 *Math.random());
    this.number = number;
    this.question = question;
    this.answers = answers;
    this.questionSrcImg = questionSrcImg;
    this.answerCorrect = answerCorrect;
    this.cardType = cardType;
    this.slug = slug;
    setTimeout(() => {
      this.ImageLoaded = true;
    }, 300);
  }

}