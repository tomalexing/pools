import fire from './../config'
import firebase from 'firebase';
import 'firebase/firestore';
import { getUniqueKey  } from './../utils';

const settings = { timestampsInSnapshots: true};
let db = fire.firestore();
db.settings(settings);

const polls = [{
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
          "question" : "What cartoon is funnier?",
          "cardType": "poll",
          "order" : 1,
          "id": 'U5ZeFYNSpvQ6gXsUe7Os',
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
          "question" : "Where would you like to spend your vacation?",
          "cardType": "poll",
          "order" : 2,
          "id": '0KLqy6wjmWJT8HosoeAk',
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
          "question" : "What movie do you like more?",
          "cardType": "poll" ,
          "order" : 3,
          "id": '20kPaWvDlg1MFhLR2XB2',
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
          "question" : "Which sports brand do you prefer?",
          "cardType": "poll",
          "order" : 4,
          "id": 'M3qwCl3s4Lo8dAYmybvC'
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
          "question" : "Eternal dispute subject: a snowboard or skis?",
          "cardType": "poll",
          "order" : 5,
          "id": 'J1CusUX9M9SvzTag8Gif'
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
          "question" : "What do you like much?",
           "cardType": "poll",
           "order" : 6,
           "id": 'XQJj69mQJcsAaJWMQUT8'
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
          "question" : "What device do you use?",
           "cardType": "poll",
           "order" : 7,
           "id": 'tZQNkPM4pHLIhjxTML91'
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
          "question" : "What car is cooler?",
           "cardType": "poll",
           "order" : 8,
           "id": 'IW6GPQyxs3jEiIOJRlUf'
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
          "question" : "What kind of gearbox you choose?",
           "cardType": "poll",
           "order" : 9,
           "id": 'GOcNeiN7zZj3e2cZ3P8L'
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
          "question" : "What band do you like more?",
           "cardType": "poll",
           "order" : 10,
           "id": 'G7eyBAOtTV9SJ9v4ip1y'
        }
  ];


const quizzes = [
        {
          "answers" : [
            'Dog',
            'Mouse',    
            'Lion',
            'Snake',
            'Elephant'
          ],
          "question" : "Which one of the five is least like the other four?",
          "answerCorrect": 3,
          "cardType": "quiz",
          "order" : 7,
          "id": '6eJOKEeqTpnrd78W6TDg'
        },
        {
          "answers" : [
            '8',
            '13',
            '21',
            '26',
            '31'
          ],
          "question" : "Which number should come next in the series?<br/>1 - 1 - 2 - 3 - 5 - 8 - 13",
          "answerCorrect": 2,
          "cardType": "quiz",
          "order" : 2,
          "id": 'BeJwt10uwf3wfGUlfX5W'
        },
        {
          "answers" : [
            '25641',
            '26451',
            '12654',
            '51462',
            '15264'
          ],
          "question" : "Which one of the five choices makes the best comparison? <br/> PEACH is to HCAEP as 46251 is to:",
          "answerCorrect": 4,
          "cardType": "quiz",
          "order" : 3,
          "id": 'XLt6seUSy4rzH36O1YRx'
        },
        {
          "answers" : [
            '20',
            '24',
            '25',
            '26',
            '28'
          ],
          "question" : "Mary, who is sixteen years old, is four times as old as her brother. How old will Mary be when she is twice as old as her brother?",
          "answerCorrect": 1,
          "cardType": "quiz",
          "order" : 1,
          "id": 'bAriPJdLi6wqBWlTpoZL'
        },
        {
          "answers" : [
            'THREE',
            'SEVEN',
            'EIGHT',
            'FIFTEEN',
            'THIRTY'
          ],
          "question" : "Which one of the numbers does not belong in the following series?<br/>2 - 3 - 6 - 7 - 8 - 14 - 15 - 30",
          "answerCorrect": 2,
          "cardType": "quiz",
          "order" : 5,
          "id": 'lRRbds5YyfLhKTNM0OiI'
        },
        {
          "answers" : [
            '1',
            '2',    
            '3',    
            '4',   
          ],
          "questionSrcImg": './assets/q5.png',
          "question" : "Which larger shape would be made if the two sections are fitted together?",
          "answerCorrect": 2,
          "cardType": "quiz",
          "order" : 6,
          "id": 'wfkzKrEeLfR1qbCrFmIc'
        },
        {
          "answers" : [
            'Twig',
            'Tree',
            'Branch',
            'Blossom',
            'Bark'
          ],
          "question" : "Which one of the five choices makes the best comparison?<br/>Finger is to Hand as Leaf is to:",
          "answerCorrect": 0 ,
          "cardType": "quiz",
          "order" : 4,
          "id": 'GSntbFXNDlQpdYB3VYv0'
        },
        {
          "answers" : [
            'City',
            'Animal',
            'Ocean',    
            'River',
            'Country'
          ],
          "question" : "If you rearrange the letters &quot;CIFAIPC&quot; you would have the name of a(n):",
          "answerCorrect": 2,
          "cardType": "quiz",
          "order" : 8,
          "id": '2p2nODLdXFnYzxUd92LG'
        },
        {
          "answers" : [
            '2',
            '5',
            '10',
            '25',
            '50'
          ],
          "question" : "Choose the number that is 1/4 of 1/2 of 1/5 of 200:",
          "answerCorrect": 1,
          "cardType": "quiz",
          "order" : 9,
          "id": 'OmTrbHgN416JsoXcKZdd'
        },
        {
          "answers" : [
            '1',
            '2',    
            '3',    
            '4',   
          ],
          "questionSrcImg": './assets/q19.png',
          "question" : "Which of the figures below the line of drawings best completes the series?",
          "answerCorrect": 2,
          "cardType": "quiz",
          "order" : 10,
          "id": 'cciv9sS0IZGrmIZLpzpL'
        },
        {
          "answers" : [
            '3',    
            '4',
            '4 1/2',
            '5',
            '6'
          ],
          "question" : "John needs 13 bottles of water from the store. John can only carry 3 at a time. What's the minimum number of trips John needs to make to the store?",
          "answerCorrect": 3,
          "cardType": "quiz",
          "order" : 11,
          "id": 'OCNmnEumLgSmXvifktuH'
        },
        {
          "answers" : [
            'True',    
            'False'
          ],
          "question" : "If all Bloops are Razzies and all Razzies are Lazzies, all Bloops are definitely Lazzies?",
          "answerCorrect": 0,
          "cardType": "quiz",
          "order" : 12,
          "id": 'q9feeWauhunYWDrHnCMB'
        },
        {
          "answers" : [
            'Resolute',
            'Tenacity',
            'Relevant',
            'Insolent',
            'Reliable'
          ],
          "question" : "Choose the word most similar to &quotTrustworthy&quot;:",
          "answerCorrect": 4,
          "cardType": "quiz",
          "order" : 13,
          "id": 'boL8oAk3kPQbGU1bN3Tz'
        },
         {
          "answers" : [
            'Animal',
            'Country',
            'State',
            'City',
            'Ocean'
          ],
          "question" : "If you rearrange the letters &quot;LNGEDNA&quot; you have the name of a(n):",
          "answerCorrect": 1,
          "cardType": "quiz",
          "order" : 14,
          "id": 'AaXDCS03zNPXrOHjszXg'
        },
        {
          "answers" : [
            '1',    
            '5',    
            '26',    
            '29',    
            '48'
          ],
          "question" : "Which one of the numbers does not belong in the following series?<br/>1 - 2 - 5 - 10 - 13 - 26 - 29 - 48",
          "answerCorrect": 4,
          "cardType": "quiz",
          "order" : 15,
          "id": 'fOfz9cJScie4X7pqthcq'
        },
        {
          "answers" : [
            '10',    
            '50',    
            '124',
            '200',
            '1600'
          ],
          "question" : "Ralph likes 25 but not 24; he likes 400 but not 300; he likes 144 but not 145. Which does he like:",
          "answerCorrect": 4,
          "cardType": "quiz",
          "order" : 16,
          "id": 'JR0wp0wsjbdumGuKvqM4'
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
          "question" : "How many four-sided figures appear in the diagram below?",
          "answerCorrect": 3,
          "cardType": "quiz",
          "order" : 17,
          "id": '8bp5YpoyoOkbtkj7kpqC'
        },
        {
        "answers" : [
            '36',
            '45',
            '46',
            '64',
            '99'
          ],
          "question" : "What is the missing number in the sequence shown below?<br/>1 - 8 - 27 - ? - 125 - 216",
          "answerCorrect": 3,
          "cardType": "quiz",
          "order" : 18,
          "id": 'EOEu8EhYazGfdIHARl1H'
        },
        {
        "answers" : [
            'Poem',
            'Novel',
            'Painting',
            'Statue',
            'Flower'
          ],
          "question" : "Which one of the following things is the least like the others?",
          "answerCorrect": 4,
          "cardType": "quiz",
          "order" : 19,
          "id": '2iOXQ4sactXsjPmiOOUr'
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
          "question" : "Which of the figures below the line of drawings best completes the series?",
          "answerCorrect": 4,
          "cardType": "quiz",
          "order" : 20,
          "id": 'MOIs2I0M29KYVhLlE2GD'
        },
];

let QuizzesId = '';
let QuizzesRunned = false;
function setQuizzes(){
    console.log("Add %s quizzes", quizzes.length)
    db.collection(`quizzes`).doc('mNrynOde7h2pec3R9rKe').onSnapshot(doc => {
      if( QuizzesRunned ) return
      QuizzesRunned = true;
      QuizzesId = doc.id;
      db.collection(`quizzes`).doc(doc.id).set({
        allCardsNumber: 20,
        dashOutput: "iqValue",
        dashTitle: "Quiz: IQ test",
        reward: 0.1,
        cat: 'Quizzes',
        title: 'Quiz',
        linksite: 'quizi.io',
        title: 'Quiz',
        desc: 'Discover answers to the most provocative question.',
        img: './assets/polls.png',
        result: 'Your IQ is {{iqValue}}.'
      });
      for(let i = 0; i < quizzes.length; i++){
        console.log('quizzes ' + i)

        db.collection(`quizzes`).doc(doc.id).collection(`v1`).doc(quizzes[i].id).set({
        ...quizzes[i],
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
      }
    })
}

let PollsId = '';
let PollRunned = false;
  function setPolls(){
    console.log("Add %s polles", polls.length)
    
    db.collection(`polls`).doc('TufVMx0dkDVAaOr5KSdF').onSnapshot(doc => {
      if( PollRunned ) return
      PollRunned = true;
      PollsId = doc.id;
      db.collection(`polls`).doc(doc.id).set({
        allCardsNumber: 10,
        dashOutput: 'number',
        dashTitle: 'Poll: Best',
        reward: 0.1,
        cat: 'Polls',
        title: 'Poll',
        linksite: 'quizi.io',
        desc: 'Discover answers to the most provocative question.',
        img: './assets/polls.png',
        result: 'You answered {{number}} of 10 polls.'
      });
      for(let i = 0; i < polls.length; i++){
        console.log('polls ' + i)
        db.collection(`polls`).doc(doc.id).collection(`v1`).doc(polls[i].id).set({
        ...polls[i],
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
      }
    })

}

function setCats(){
  console.log("Add categories.");

    db.collection('cats').doc('polls').set({
      type: 'cat',
      title: 'Poll',
      slug: 'polls',
      desc: 'Discover answers to the most provocative question.',
      img: null,
      btn: 'Discover',
      link: 'polls',
      cardtype: 'Poll',
      collections: ['common','movies'] 
    })
    
    db.collection('cats').doc('quizzes').set({
      type: 'cat',
      title: 'Quizzes',
      slug: 'quizzes',
      desc: 'On this page, you will find different online tests for you to try.',
      img: null,
      btn: 'Choose test',
      link: 'quizzes',
      cardtype: 'Quiz',
      collections: ['iq','blockchain', 'cybersecurity']
    })
    
    db.collection('cats/quizzes/iq').doc('WZ3b7uZkzkxopoMGKDwT').set({
        type: 'term',
        title: 'IQ test',
        linksite: 'quizi.io',
        desc: 'The average IQ is 100. Have you wondered what your IQ score is?',
        cardtype: 'Quiz',
        number: 20,
        btn: 'Take quiz',
        slug: 'quizzes/iq',
        img: null,
        link: `/quizzes/${QuizzesId}`,
        reward: 0.1,
      });
    
    db.collection('cats/quizzes/blockchain').doc('Pu7JCX43tfzoigRFJrQM').set({
      type: 'term',
      title: 'Impleum Platform',
      linksite: 'impleum.com',
      desc: 'Impleum is a powerful and scalable path to develop DApps.',
      cardtype: 'Quiz',
      number: 20,
      btn: 'Take quiz',
      slug: 'quizzes/blockchain',
      img: './assets/impleum.png',
      reward: 0.1,
    });

    db.collection('cats/quizzes/cybersecurity').doc('k2JfLJQZYkFBlwrhIXHI').set({
      type: 'term',
      title: 'Cybersecurity test',
      linksite: '10guards.com',
      desc: 'The development of technologies opens up new business opportunities, and also, new threats to your assets.',
      cardtype: 'Quiz', // todo lowercase
      number: 10,
      btn: 'Take quiz',
      slug: 'quizzes/cybersecurity',
      img: './assets/10guards.png',
      reward: 0.1,
    });

    db.collection('cats/polls/common').doc('EhA5Mms18RSnxoJNQ1JX').set({
      type: 'term',
      title: 'Common Polls',
      linksite: 'quizi.io',
      desc: 'Discover answers to the most provocative question.',
      cardtype: 'Poll',
      number: 20,
      btn: 'Take polls',
      slug: 'polls/common',
      img: './assets/polls.png',
      link: `/polls/${PollsId}`,
      reward: 0.1,
    })

    db.collection('cats/polls/movies').doc('oTFTncqMYa315ydrQUCD').set({
      type: 'term',
      title: 'Raters App',
      linksite: 'ratersapp.com',
      desc: 'Social platform where you can see what your friends are watching.',
      cardtype: 'Poll',
      number: 10,
      btn: 'Take polls',
      slug: 'polls/movies',
      img: './assets/raters.png',
      reward: 0.1,
    })
  }
    
function setCatMenu(){

    console.log("Add categories.")
    db.collection('catsMenu').doc('v1').set({
      polls: {
          name :'Polls',
          slug: 'polls',
          sub: [
            {
              name :'Common',
              slug: 'common'
            },
            {
              name :'Movies',
              slug: 'movies'
            }
          ]
      },
      quizzes:{
        name :'Quizzes',
        slug: 'quizzes',
        sub: [
          {
            name :'IQ tests',
            slug: 'iq'
          },
          {
            name: 'Blockchain',
            slug: 'blockchain'
          },
          {
            name: 'Cybersecurity',
            slug: 'cybersecurity'
          }
        ]
      }
    })
}

// setPolls()
// setQuizzes()
//  setCatMenu();

// setTimeout(() => {
//   setCats()
// }, 10000);
