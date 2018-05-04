import { observable, computed, action } from "mobx";

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
  @observable inmovable = false;
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

  @computed
  get isImageLoaded(){
    return this.ImageLoaded
  }


  @computed
  get isCorrect(){
    return this.answerCorrect == this.selectedValue
  }

  constructor({id, question, answers, cardType, questionSrcImg, answerCorrect}, number) {
    this.id = id ||  Math.floor(10000 *Math.random());
    this.number = number;
    this.question = question;
    this.answers = answers;
    this.questionSrcImg = questionSrcImg;
    this.answerCorrect = answerCorrect;
    this.cardType = cardType;
  }


  /// 
}