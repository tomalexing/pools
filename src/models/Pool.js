import { observable, computed, action } from "mobx";
import {loadFromStore , saveToStore} from "./../services/localDb";
import Api from './../services/Api';

export default class Pool {
  
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

  setProgress(){
    let pool = this;
    if(this.isCorrect)
      loadFromStore(pool.slug).then((val) => {
          val.Progress.number = val.Progress.number + 1;
          saveToStore(pool.slug, val ).then(_ => Api.saveUserData() )
        }, _ => {
          saveToStore(pool.slug, {Progress:{number:1}}).then(_ => Api.saveUserData() )
        } )

  }

  @computed
  get isImageLoaded(){
    return this.ImageLoaded
  }

  /**
   * Is this pools was correct?
   * 
   * @readonly
   * @memberof Pool
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