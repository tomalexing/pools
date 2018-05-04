import fire from './../config'
import firebase from 'firebase';
import 'firebase/firestore';
const settings = { timestampsInSnapshots: true};
let db = fire.firestore();
db.settings(settings)

const quizes = [{
          "answers" : {
            l: {
              "quantity" : 61,
              "srcImg" : './assets/simpsons.jpg',
              "value" : "Simpsons"
            },
            r : {
              "quantity" : 52,
              "srcImg" : './assets/southPark.jpg',
              "value" : "South Park"
            }
          },
          "category" : "default",
          "question" : "What cartoon is funnier?",
          "cardType": "Quiz" 
        },
        {
          "answers" : {
            l : {
              "quantity" : 47,
              "srcImg" :  './assets/beach.jpg',
              "value" : "Beach"
            },
            r : {
              "quantity" : 42,
              "srcImg" :  './assets/mountian.jpg',
              "value" : "Mountian"
            }
          },
          "category" : "default",
          "question" : "Where would you like to spend your vacation?",
          "cardType": "Quiz" 
        },
        {
          "answers" : {
            l : {
              "quantity" : 40,
              "srcImg" : './assets/starTrek.jpg',
              "value" : "Star Trek"
            },
            r : {
              "quantity" : 54,
              "srcImg" : './assets/starWars.jpg',
              "value" : "Star Wars"
            }
          },
          "category" : "new",
          "question" : "What movie do you like more?",
           "cardType": "Quiz" 
        },
        {
          "answers" : {
            l : {
              "quantity" : 26,
              "srcImg" : './assets/nike.jpg',
              "value" : "Nike"
            },
            r : {
              "quantity" : 29,
              "srcImg" : './assets/adidas.jpg',
              "value" : "Adidas"
            }
          },
          "category" : "new",
          "question" : "Which sports brand do you prefer?",
           "cardType": "Quiz" 
        },
        {
          "answers" : {
            l : {
              "quantity" : 38,
              "srcImg" : './assets/skis.jpg',
              "value" : "Skis"
            },
            r : {
              "quantity" : 34,
              "srcImg" : './assets/snowboard.jpg',
              "value" : "Snowboard"
            }
          },
          "category" : "new",
          "question" : "Eternal dispute subject: a snowboard or skis?",
           "cardType": "Quiz" 
        },
        {
          "answers" : {
            l : {
              "quantity" : 30,
              "srcImg" : './assets/pepsi.jpg',
              "value" : "Coca-cola"
            },
            r : {
              "quantity" : 36,
              "srcImg" : './assets/cocaCola.jpg',
              "value" : "Pepsi"
            }
          },
          "category" : "new",
          "question" : "What do you like much?",
           "cardType": "Quiz" 
        },
        {
          "answers" : {
            l : {
              "quantity" : 36,
              "srcImg" : './assets/ios.jpg',
              "value" : "iOS"
            },
            r : {
              "quantity" : 36,
              "srcImg" : './assets/android.jpg',
              "value" : "Android"
            }
          },
          "category" : "new",
          "question" : "What device do you use?",
           "cardType": "Quiz" 
        },
        {
          "answers" : {
            l : {
              "quantity" : 47,
              "srcImg" : './assets/ford.jpg',
              "value" : "Ford Mustang"
            },
            r : {
              "quantity" : 19,
              "srcImg" : './assets/chevrolet.jpg',
              "value" : "Chevrolet Camaro"
            }
          },
          "category" : "default",
          "question" : "What car is cooler?",
           "cardType": "Quiz" 
        },
        {
          "answers" : {
            l : {
              "quantity" : 25,
              "srcImg" : './assets/automatic.jpg',
              "value" : "Automatic"
            },
            r : {
              "quantity" : 37,
              "srcImg" : './assets/mechanic.jpg',
              "value" : "Mechanical"
            }
          },
          "category" : "default",
          "question" : "What kind of gearbox you choose?",
           "cardType": "Quiz" 
        },
        {
          "answers" : {
            l : {
              "quantity" : 38,
              "srcImg" : './assets/metallica.jpg',
              "value" : "Nirvana"
            },
            r : {
              "quantity" : 26,
              "srcImg" : './assets/nirvana.jpg',
              "value" : "Metallica"
            }
          },
          "category" : "new",
          "question" : "What band do you like more?",
           "cardType": "Quiz"
        }
  ];


const pools = [
        {
          "answers" : [
            'Dog',
            'Mouse',    
            'Lion',
            'Snake',
            'Elephant'
          ],
          "category" : "default",
          "question" : "Which one of the five is least like the other four?",
          "answerCorrect": 3,
          "cardType": "Pool",
        },
        {
          "answers" : [
            '8',
            '13',
            '21',
            '26',
            '31'
          ],
          "category" : "default",
          "question" : "Which number should come next in the series?<br/>1 - 1 - 2 - 3 - 5 - 8 - 13",
          "answerCorrect": 2,
          "cardType": "Pool",
        },
        {
          "answers" : [
            '25641',
            '26451',
            '12654',
            '51462',
            '15264'
          ],
          "category" : "default",
          "question" : "Which one of the five choices makes the best comparison? <br/> PEACH is to HCAEP as 46251 is to:",
          "answerCorrect": 4,
          "cardType": "Pool",
        },
        {
          "answers" : [
            '20',
            '24',
            '25',
            '26',
            '28'
          ],
          "category" : "default",
          "question" : "Mary, who is sixteen years old, is four times as old as her brother. How old will Mary be when she is twice as old as her brother?",
          "answerCorrect": 1,
          "cardType": "Pool",
        },
        {
          "answers" : [
            'THREE',
            'SEVEN',
            'EIGHT',
            'FIFTEEN',
            'THIRTY'
          ],
          "category" : "default",
          "question" : "Which one of the numbers does not belong in the following series?<br/>2 - 3 - 6 - 7 - 8 - 14 - 15 - 30",
          "answerCorrect": 2,
          "cardType": "Pool",
        },
        {
          "answers" : [
            '1',
            '2',    
            '3',    
            '4',   
          ],
          "questionSrcImg": './assets/q5.png',
          "category" : "default",
          "question" : "Which larger shape would be made if the two sections are fitted together?",
          "answerCorrect": 2,
          "cardType": "Pool",
        },
        {
          "answers" : [
            'Twig',
            'Tree',
            'Branch',
            'Blossom',
            'Bark'
          ],
          "category" : "default",
          "question" : "Which one of the five choices makes the best comparison?<br/>Finger is to Hand as Leaf is to:",
          "answerCorrect": 0 ,
          "cardType": "Pool",
        },
        {
          "answers" : [
            'City',
            'Animal',
            'Ocean',    
            'River',
            'Country'
          ],
          "category" : "default",
          "question" : "If you rearrange the letters &quot;CIFAIPC&quot; you would have the name of a(n):",
          "answerCorrect": 2,
          "cardType": "Pool",
        },
        {
          "answers" : [
            '2',
            '5',
            '10',
            '25',
            '50'
          ],
          "category" : "default",
          "question" : "Choose the number that is 1/4 of 1/2 of 1/5 of 200:",
          "answerCorrect": 1,
          "cardType": "Pool",
        },
        {
          "answers" : [
            '1',
            '2',    
            '3',    
            '4',   
          ],
          "questionSrcImg": './assets/q19.png',
          "category" : "default",
          "question" : "Which of the figures below the line of drawings best completes the series?",
          "answerCorrect": 2,
          "cardType": "Pool",
        },
        {
          "answers" : [
            '3',    
            '4',
            '4 1/2',
            '5',
            '6'
          ],
          "category" : "default",
          "question" : "John needs 13 bottles of water from the store. John can only carry 3 at a time. What's the minimum number of trips John needs to make to the store?",
          "answerCorrect": 3,
          "cardType": "Pool",
        },
        {
          "answers" : [
            'True',    
            'False'
          ],
          "category" : "default",
          "question" : "If all Bloops are Razzies and all Razzies are Lazzies, all Bloops are definitely Lazzies?",
          "answerCorrect": 0,
          "cardType": "Pool",
        },
        {
          "answers" : [
            'Resolute',
            'Tenacity',
            'Relevant',
            'Insolent',
            'Reliable'
          ],
          "category" : "default",
          "question" : "Choose the word most similar to &quotTrustworthy&quot;:",
          "answerCorrect": 4,
          "cardType": "Pool",
        },
         {
          "answers" : [
            'Animal',
            'Country',
            'State',
            'City',
            'Ocean'
          ],
          "category" : "default",
          "question" : "If you rearrange the letters &quot;LNGEDNA&quot; you have the name of a(n):",
          "answerCorrect": 1,
          "cardType": "Pool",
        },
        {
          "answers" : [
            '1',    
            '5',    
            '26',    
            '29',    
            '48'
          ],
          "category" : "default",
          "question" : "Which one of the numbers does not belong in the following series?<br/>1 - 2 - 5 - 10 - 13 - 26 - 29 - 48",
          "answerCorrect": 4,
          "cardType": "Pool",
        },
        {
          "answers" : [
            '10',    
            '50',    
            '124',
            '200',
            '1600'
          ],
          "category" : "default",
          "question" : "Ralph likes 25 but not 24; he likes 400 but not 300; he likes 144 but not 145. Which does he like:",
          "answerCorrect": 4,
          "cardType": "Pool",
        },
        {
          "answers" : [
            '10',
            '16',    
            '22',    
            '25',    
            '28'
          ],
          "questionSrcImg": './assets/q16.png',
          "category" : "default",
          "question" : "How many four-sided figures appear in the diagram below?",
          "answerCorrect": 3,
          "cardType": "Pool",
        },
        {
        "answers" : [
            '36',
            '45',
            '46',
            '64',
            '99'
          ],
          "category" : "default",
          "question" : "What is the missing number in the sequence shown below?<br/>1 - 8 - 27 - ? - 125 - 216",
          "answerCorrect": 3,
          "cardType": "Pool",
        },
        {
        "answers" : [
            'Poem',
            'Novel',
            'Painting',
            'Statue',
            'Flower'
          ],
          "category" : "default",
          "question" : "Which one of the following things is the least like the others?",
          "answerCorrect": 4,
          "cardType": "Pool",
        },
        {
          "answers" : [
            '1',
            '2',    
            '3',    
            '4',    
            '5'
          ],
          "questionSrcImg": './assets/q20.png',
          "category" : "default",
          "question" : "Which of the figures below the line of drawings best completes the series?",
          "answerCorrect": 4,
          "cardType": "Pool",
        },
];


function setQuizzes(){
    console.log("Add %s quizzes", quizes.length)

    for(let i = 0; i < quizes.length; i++){
        db.collection('quizzes').add({
        ...quizes[i],
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

    }
}

function setPools(){
    console.log("Add %s polles", pools.length)

    for(let i = 0; i < pools.length; i++){
        db.collection('pools').add({
        ...pools[i],
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

    }
}

//setPools()
//setQuizzes()