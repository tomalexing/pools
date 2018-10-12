import fire from './../config'
import firebase from 'firebase/app';
import 'firebase/firestore';
import { getUniqueKey  } from './../utils';

const settings = { timestampsInSnapshots: true};
let db = fire.firestore();
db.settings(settings);

const polls = [{
        "answers" : {
            l: {
              "quantity" : 61,
              "srcImg" : './assets/common/simpsons.jpg',
              "value" : "Simpsons"
            },
            r : {
              "quantity" : 52,
              "srcImg" : './assets/common/southPark.jpg',
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
              "srcImg" :  './assets/common/beach.jpg',
              "value" : "Beach"
            },
            r : {
              "quantity" : 42,
              "srcImg" :  './assets/common/mountian.jpg',
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
              "srcImg" : './assets/common/starTrek.jpg',
              "value" : "Star Trek"
            },
            r : {
              "quantity" : 54,
              "srcImg" : './assets/common/starWars.jpg',
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
              "srcImg" : './assets/common/nike.jpg',
              "value" : "Nike"
            },
            r : {
              "quantity" : 29,
              "srcImg" : './assets/common/adidas.jpg',
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
              "srcImg" : './assets/common/skis.jpg',
              "value" : "Skis"
            },
            r : {
              "quantity" : 34,
              "srcImg" : './assets/common/snowboard.jpg',
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
              "srcImg" : './assets/common/pepsi.jpg',
              "value" : "Coca-cola"
            },
            r : {
              "quantity" : 36,
              "srcImg" : './assets/common/cocaCola.jpg',
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
              "srcImg" : './assets/common/ios.jpg',
              "value" : "iOS"
            },
            r : {
              "quantity" : 36,
              "srcImg" : './assets/common/android.jpg',
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
              "srcImg" : './assets/common/ford.jpg',
              "value" : "Ford Mustang"
            },
            r : {
              "quantity" : 19,
              "srcImg" : './assets/common/chevrolet.jpg',
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
              "srcImg" : './assets/common/automatic.jpg',
              "value" : "Automatic"
            },
            r : {
              "quantity" : 37,
              "srcImg" : './assets/common/mechanic.jpg',
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
              "srcImg" : './assets/common/metallica.jpg',
              "value" : "Nirvana"
            },
            r : {
              "quantity" : 26,
              "srcImg" : './assets/common/nirvana.jpg',
              "value" : "Metallica"
            }
          },
          "question" : "What band do you like more?",
           "cardType": "poll",
           "order" : 10,
           "id": 'G7eyBAOtTV9SJ9v4ip1y'
        }
  ];


const polls1 = [{
    "answers" : {
        l: {
          "quantity" : 0,
          "srcImg" : './assets/raters/01_marvel.png',
          "value" : "Marvel"
        },
        r : {
          "quantity" : 0,
          "srcImg" : './assets/raters/01_DC.png',
          "value" : "DC"
        }
      },
      "question" : "Which comics studio do you prefer?",
      "cardType": "poll",
      "order" : 9,
      "id": '31k3ZqNAAE7ObKlhyIJs',
    },
    {
      "answers" : {
        l : {
          "quantity" : 0,
          "srcImg" :  './assets/raters/02_Scarlett_Johansson.png',
          "value" : "Scarlett Johansson"
        },
        r : {
          "quantity" : 0,
          "srcImg" :  './assets/raters/02_Angelina_Jolie.png',
          "value" : "Angelina Jolie"
        }
      },
      "question" : "Who is sexier?",
      "cardType": "poll",
      "order" : 2,
      "id": '3KqpLnhphkl5xWftqdvv',
    },
    {
      "answers" : {
        l : {
          "quantity" : 0,
          "srcImg" : './assets/raters/03_Terminator.png',
          "value" : "Terminator"
        },
        r : {
          "quantity" : 0,
          "srcImg" : './assets/raters/03_Matrix.png',
          "value" : "Matrix"
        }
      },
      "question" : "Which action movie is cooler?",
      "cardType": "poll" ,
      "order" : 3,
      "id": 'XT1pdTh7956P15dMhUdu',
    },
    {
      "answers" : {
        l : {
          "quantity" : 0,
          "srcImg" : './assets/raters/04_Brad_Pitt.png',
          "value" : "Brad Pitt"
        },
        r : {
          "quantity" : 0,
          "srcImg" : './assets/raters/04_Djonny_Depp.png',
          "value" : "Djonny Depp"
        }
      },
      "question" : "Who is more handsome?",
      "cardType": "poll",
      "order" : 4,
      "id": '4BwrTlC4uGwWiJcfSi85'
    },
    {
      "answers" : {
        l : {
          "quantity" : 0,
          "srcImg" : './assets/raters/05_R2D2.png',
          "value" : "R2D2"
        },
        r : {
          "quantity" : 0,
          "srcImg" : './assets/raters/05_Slimer.png',
          "value" : "Slimer"
        }
      },
      "question" : "Which made-up assistant is funnier?",
      "cardType": "poll",
      "order" : 5,
      "id": 'wlYiBICprh7cPrrN5GYR'
    },
    {
      "answers" : {
        l : {
          "quantity" : 0,
          "srcImg" : './assets/raters/06_The_Fast_and_the_Furious.png',
          "value" : "The Fast and the Furious"
        },
        r : {
          "quantity" : 0,
          "srcImg" : './assets/raters/06_The_Transporter.png',
          "value" : "The Transporter"
        }
      },
      "question" : "Which saga is cooler?",
       "cardType": "poll",
       "order" : 6,
       "id": 'Y1jjtlIFKT5Y3jyMmkl2'
    },
    {
      "answers" : {
        l : {
          "quantity" : 0,
          "srcImg" : './assets/raters/07_batmobile.png',
          "value" : "Batmobile"
        },
        r : {
          "quantity" : 0,
          "srcImg" : './assets/raters/07_delorean.png',
          "value" : "Delorean"
        }
      },
      "question" : "What vehicle would you like to have?",
       "cardType": "poll",
       "order" : 7,
       "id": 'crYALNH4P1ReJLQKFRob'
    },
    {
      "answers" : {
        l : {
          "quantity" : 0,
          "srcImg" : './assets/raters/08_Batman.png',
          "value" : "Batman"
        },
        r : {
          "quantity" : 0,
          "srcImg" : './assets/raters/08_Superman.png',
          "value" : "Superman"
        }
      },
      "question" : "Which superhero is stronger?",
       "cardType": "poll",
       "order" : 8,
       "id": '5ZNWM5hwIOQDbRUlxjEs'
    },
    {
      "answers" : {
        l : {
          "quantity" : 0,
          "srcImg" : './assets/raters/09_Steven_Spielberg.png',
          "value" : "Steven Spielberg"
        },
        r : {
          "quantity" : 0,
          "srcImg" : './assets/raters/09_George_Lucas.png',
          "value" : "George Lucas"
        }
      },
      "question" : "Movies of which director do you prefer?",
       "cardType": "poll",
       "order" : 1,
       "id": 'maxVwpqlPnUhq82bSdMI'
    },
    {
      "answers" : {
        l : {
          "quantity" : 0,
          "srcImg" : './assets/raters/10_She\'s_All_That.png',
          "value" : "She's All That"
        },
        r : {
          "quantity" : 0,
          "srcImg" : './assets/raters/10_Pretty_Woman.png',
          "value" : "Pretty Woman"
        }
      },
      "question" : "Which \"modern Cinderella\" story is more interesting?",
       "cardType": "poll",
       "order" : 10,
       "id": 'fJhE0Xnk5trn3uqb6i5a'
    }
];

const polls2 = [{
  "answers" : {
      l: {
        "quantity" : 0,
        "srcImg" : './assets/ratersComics/01_marvel.png',
        "value" : "Marvel"
      },
      r : {
        "quantity" : 0,
        "srcImg" : './assets/ratersComics/01_DC.png',
        "value" : "DC"
      }
    },
    "question" : "Which comics studio do you prefer?",
    "cardType": "poll",
    "order" : 1,
    "id": 'EzIKn4a7O56quBaDMkQV',
  },
  {
    "answers" : {
      l : {
        "quantity" : 0,
        "srcImg" :  './assets/ratersComics/Avengers.jpg',
        "value" : "Avengers"
      },
      r : {
        "quantity" : 0,
        "srcImg" :  './assets/ratersComics/JL.jpg',
        "value" : "Justice League"
      }
    },
    "question" : "Avengers or Justice League",
    "cardType": "poll",
    "order" : 2,
    "id": 'lVoac9NEoEhV52ok8r98',
  },
  {
    "answers" : {
      l : {
        "quantity" : 0,
        "srcImg" : './assets/ratersComics/Batman.png',
        "value" : "Batman"
      },
      r : {
        "quantity" : 0,
        "srcImg" : './assets/ratersComics/Superman.png',
        "value" : "Superman"
      }
    },
    "question" : "Batman or Superman",
    "cardType": "poll" ,
    "order" : 3,
    "id": 'GovpNjkgWrJD4EWl6IXk',
  },
  {
    "answers" : {
      l : {
        "quantity" : 0,
        "srcImg" : './assets/ratersComics/Professor.jpeg',
        "value" : "Professor X"
      },
      r : {
        "quantity" : 0,
        "srcImg" : './assets/ratersComics/Magneto.jpg',
        "value" : "Magneto"
      }
    },
    "question" : "Professor X or Magneto",
    "cardType": "poll",
    "order" : 4,
    "id": 'trLoZyY7Zofez79PAnVp'
  },
  {
    "answers" : {
      l : {
        "quantity" : 0,
        "srcImg" : './assets/ratersComics/TeamIron.jpg',
        "value" : "Team Iron Man"
      },
      r : {
        "quantity" : 0,
        "srcImg" : './assets/ratersComics/TeamCap.jpg',
        "value" : "Team Cap"
      }
    },
    "question" : "Team Iron Man or Team Cap",
    "cardType": "poll",
    "order" : 5,
    "id": 'tPnAr82m2ZmkWTVMCi2o'
  },
  {
    "answers" : {
      l : {
        "quantity" : 0,
        "srcImg" : './assets/ratersComics/Joker.jpeg',
        "value" : "Joker"
      },
      r : {
        "quantity" : 0,
        "srcImg" : './assets/ratersComics/Bane.jpg',
        "value" : "Bane"
      }
    },
    "question" : "Joker or Bane",
     "cardType": "poll",
     "order" : 6,
     "id": 'weMHFSSnyGXCQFbQjAjk'
  },
  {
    "answers" : {
      l : {
        "quantity" : 0,
        "srcImg" : './assets/ratersComics/Thor.jpg',
        "value" : "Thor"
      },
      r : {
        "quantity" : 0,
        "srcImg" : './assets/ratersComics/Loki.jpeg',
        "value" : "Loki"
      }
    },
    "question" : "Thor or Loki",
     "cardType": "poll",
     "order" : 7,
     "id": 'J6OXJASWhBy5gaVbiPTr'
  },
  {
    "answers" : {
      l : {
        "quantity" : 0,
        "srcImg" : './assets/ratersComics/Flash.jpg',
        "value" : "Flash"
      },
      r : {
        "quantity" : 0,
        "srcImg" : './assets/ratersComics/Quicksilver.jpg',
        "value" : "Quicksilver"
      }
    },
    "question" : "Flash or Quicksilver",
     "cardType": "poll",
     "order" : 8,
     "id": 'ltonywo7NGIoeoXuiNb8'
  },
  {
    "answers" : {
      l : {
        "quantity" : 0,
        "srcImg" : './assets/ratersComics/Wolverine.jpg',
        "value" : "Wolverine"
      },
      r : {
        "quantity" : 0,
        "srcImg" : './assets/ratersComics/Deadpool.jpg',
        "value" : "Deadpool"
      }
    },
    "question" : "Wolverine or Deadpool",
    "cardType": "poll",
    "order" : 9,
    "id": 'Hpe3hYUKUFpMUVQLh9AF'
  },
  {
    "answers" : {
      l : {
        "quantity" : 38,
        "srcImg" : './assets/ratersComics/Captain.jpg',
        "value" : "Captain America"
      },
      r : {
        "quantity" : 26,
        "srcImg" : './assets/ratersComics/Torch.jpg',
        "value" : "Human Torch"
      }
    },
    "question" : "Chris Evans as Captain America or Chris Evans as Human Torch",
     "cardType": "poll",
     "order" : 10,
     "id": 'cakUXy6t0wJ9gQaSrYVL'
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
          "questionSrcImg": './assets/iqtest/q5.png',
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
          "questionSrcImg": './assets/iqtest/q19.png',
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
          "questionSrcImg": './assets/iqtest/q16.png',
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
          "questionSrcImg": './assets/iqtest/q20.png',
          "question" : "Which of the figures below the line of drawings best completes the series?",
          "answerCorrect": 4,
          "cardType": "quiz",
          "order" : 20,
          "id": 'MOIs2I0M29KYVhLlE2GD'
        },
];


const quizzes1 = [
  {
    "answers" : [
      'Federal Reserve System',
      'Bank of America',    
      'Bank of Japan',
      'No one organization isn\'t engaged in emission of IMP',
    ],
    "question" : "What organization is engaged in emission of Impleum Coin?",
    "answerCorrect": 3,
    "cardType": "quiz",
    "order" : 14,
    "id": '6zCxhw9JwQ3TmfLzhX8m'
  },
  {
    "answers" : [
      'December 27, 2018',
      'April 10, 2018',    
      'March 5, 2009',
      'October 23, 2017',
    ],
    "question" : "When was first Impleum block?",
    "answerCorrect": 1,
    "cardType": "quiz",
    "order" : 2,
    "id": 'UIyiDSVsHennMANYp4AO'
  },
  {
    "answers" : [
      '1',
      '2',
      '3',
      '4'
    ],
    "questionSrcImg": './assets/iqtest/impleum3q.png',
    "question" : "How does Impleum logo look?",
    "answerCorrect": 2,
    "cardType": "quiz",
    "order" : 3,
    "id": 'j7wOPJ1FVueHdOdsM2D5'
  },
  {
    "answers" : [
      'Impleum Foundation gives an award for using user\'s computer facilities ',
      'All IMP are created in advance and distributed for all users in ratio equal to a contribution, to network power',
      'They are created by certain mining-companies',
      'A reward is given to the first miner who solves a block problem'
    ],
    "question" : "How Impleum PoW mining does work?",
    "answerCorrect": 3,
    "cardType": "quiz",
    "order" : 4,
    "id": 'IgVcj00L6j7WM4Z5zXt5'
  },
  {
    "answers" : [
      'Yes, since they will not receive an reward ',
      'No, since the system will move to other level and to proceed IMP release',
      'No, since calculation of transactions is necessary always, the award will go from the increased transaction commission.',
      'Yes, since also the Impleum system will disappear if all IMP are extracted'
    ],
    "question" : "When 100 million imp will have been extracted, the \"miners\" will disappear?",
    "answerCorrect": 2,
    "cardType": "quiz",
    "order" : 5,
    "id": 'p4IKuTugDtFGAl3lMgNW'
  },
  {
    "answers" : [
      'Yes, because of different complexity of a network',
      'No',
      'Depends on transaction confirmation speed',
      'Yes, because of different algorithms'
    ],
    "question" : "Is video card productivity different while compare between mining of Impleum and  Litecoin and why?",
    "answerCorrect": 3,
    "cardType": "quiz",
    "order" : 6,
    "id": 'fQXDRAvhzym9wbPmdooF'
  },
  {
    "answers" : [
      'No, because it is only a program code',
      'Yes, as well as any digital documents and data',
      'No, because it is necessary to decrypt the unit of transactions again',
      'Yes, but only by means of phishing (by deception, when transfer IMP from a wallet on a wallet is forced)'
    ],
    "question" : "Whether is it possible to steal IMP?",
    "answerCorrect": 3,
    "cardType": "quiz",
    "order" : 7,
    "id": '9VHsTzqkE8f7trlG10ZG'
  },
  {
    "answers" : [
      'Only creator of Impleum',
      'Only the one who bought the Impleum code from the creator',
      'Any person',
      'Nobody'
    ],
    "question" : "Who can create fork Impleum?",
    "answerCorrect": 2,
    "cardType": "quiz",
    "order" : 8,
    "id": 'llVM8BDx93oLafrHC6WL'
  },
  {
    "answers" : [
      'In proportion to the power of miner (changes at the same time with a network speed)',
      'From time recalculation of difficulty and power of a network',
      'Only from the number of the got IMP',
      'The complexity is set by the creator of a network'
    ],
    "question" : "What major factors does influence on complexity of the impleum network?",
    "answerCorrect": 0,
    "cardType": "quiz",
    "order" : 9,
    "id": 'AuVsDuLnzcAf38FZxTco'
  },
  {
    "answers" : [
      'Double wasting of the same IMP',
      'Possession of 51% of the got IMP',
      'Change of complexity at discretion',
      'Change the information more than half of all Impleum\'s transactions and the impact on the whole system'
    ],
    "question" : "What is \"attack of 51%\"?",
    "answerCorrect": 3,
    "cardType": "quiz",
    "order" : 10,
    "id": 'Cd52l5hPucWVHxgKOn2C'
  },
  {
    "answers" : [
      'up to 5 signs',
      'up to 6 signs',
      'up to 7 signs',
      'up to 8 signs'
    ],
    "question" : "How many signs after comma IMP have?",
    "answerCorrect": 3,
    "cardType": "quiz",
    "order" : 11,
    "id": 'cSQNM8SKJALbKl6Orb8G'
  },
  {
    "answers" : [
      'AMD Radeon',
      'nVidia',
      'Any, in one price category',
      'Depends on an algorithm'
    ],
    "question" : "What video cards are suitable for mining of Impleum better?",
    "answerCorrect": 2,
    "cardType": "quiz",
    "order" : 12,
    "id": 'mXpAi26v2OOfwZNdt4DX'
  },
  {
    "answers" : [
      'X13',
      'sha256',
      'X16R',
      'CryptoNight'
    ],
    "question" : "Impleum PoW algorithm is ",
    "answerCorrect": 0,
    "cardType": "quiz",
    "order" : 13,
    "id": 'ADC9yqia5NkhXtO4j6hI'
  },
  {
    "answers" : [
      'open ecosystem of apps based on the Impleum blockchain platform.',
      'an open source, global payment network that is fully decentralized without any central authorities',
      'the cryptocurrency on the basis of the CryptoNote protocol oriented on the increased anonymity of transactions',
      'the system of bulk calculations in real time (RTGS), currency exchange and a network of money transfers.'
    ],
    "question" : "Impleum is ",
    "answerCorrect": 0,
    "cardType": "quiz",
    "order" : 1,
    "id": 'aa6bb8GzXEfxLBer95Q9'
  },
];

const quizzes2 = [
  {
    "answers" : [
      'I will immediately click on the link. It can be something important',
      'I will ask several questions to make sure it\'s not a scam',    
      'I won\'t open it at all',
    ],
    "question" : "You received an unexpected message by e-mail / in the messenger with an enclosed link. Your actions:",
    "answerCorrect": 1,
    "cardType": "quiz",
    "order" : 1,
    "id": 'GI7xhYRTT2D10Xeuq7bV'
  },
  {
    "answers" : [
      'I have a specially trained person that knows better than me',
      'It’s a simulated attack on a computer system',    
      'Are you insane? Do you think I need to know the answer?',
    ],
    "question" : "What is Penetration Testing?",
    "answerCorrect": 1,
    "cardType": "quiz",
    "order" : 2,
    "id": 'NUBLg0XxKtBFs27pYHGN'
  },
  {
    "answers" : [
      'Something about aggressive fishing',
      'Type of Internet fraud, the purpose of which is to find out the login and password',
      'Is it really not about the fishing?'
    ],
    "question" : "Phishing attack is:",
    "answerCorrect": 1,
    "cardType": "quiz",
    "order" : 3,
    "id": 'ofWCWSE63Sk3yhhQcUoN'
  },
  {
    "answers" : [
      'Immediately after the update is released',
      'When I will find time for it',
      'Once in a lifetime',
    ],
    "question" : "How often do I need to update the software?",
    "answerCorrect": 0,
    "cardType": "quiz",
    "order" : 4,
    "id": 'onbCWSEc6ST3yhhQcuoR'
  },
  {
    "answers" : [
      'The human factor (personnel)',
      'The weak technical equipment',
      'Nobody knows'
    ],
    "question" : "One of the biggest cyber vulnerabilities for the company is:",
    "answerCorrect": 0,
    "cardType": "quiz",
    "order" : 5,
    "id": '7QGwa16Q6KacSAqlpvXk'
  },
  {
    "answers" : [
      'essential for company survival',
      'an unusual way to spend a day',
      'a waste of time and money',
    ],
    "question" : "To invest in cybersecurity is:",
    "answerCorrect": 0,
    "cardType": "quiz",
    "order" : 6,
    "id": 'nrXgHXkxhzt5YAXdSAwc'
  },
  {
    "answers" : [
      '2nd',
      '59th',
      'Somewhere between Equatorial Guinea and Somalia'
    ],
    "question" : "By the level of cybersecurity in the world, Ukraine is:",
    "answerCorrect": 1,
    "cardType": "quiz",
    "order" : 7,
    "id": 'QhERsBnsCyEOsyenncwu'
  },
  {
    "answers" : [
      'Yes, they are also called white hackers',
      'I don\'t think that "good" and "hacker" are two compatible words',
      'What a twist'
    ],
    "question" : "Are there any \"good\" hackers?",
    "answerCorrect": 0,
    "cardType": "quiz",
    "order" : 8,
    "id": 'Zm1vTv2QgLoPDeKE7kjp'
  },
  {
    "answers" : [
      'You are probably joking',
      'Yes, there is a possibility of data theft',
      'No, it’s okay'
    ],
    "question" : "Is it dangerous to use free public Wi-Fi?",
    "answerCorrect": 1,
    "cardType": "quiz",
    "order" : 9,
    "id": 'AkZeYZXkU40UxEPx0o2y'
  },
  {
    "answers" : [
      'a Myth',
      'The future',
      'Useless idea'
    ],
    "question" : "Cyber insurance in Ukraine is:",
    "answerCorrect": 1,
    "cardType": "quiz",
    "order" : 10,
    "id": 'niH29erObCLDNCJLAvak'
  }
];



function setQuizzes(){
    console.log("Add %s quizzes", quizzes.length)
    db.collection(`quizzes`).doc('mNrynOde7h2pec3R9rKe').get().then(function(doc) {

      db.collection(`quizzes`).doc(doc.id).set({
        id: 'mNrynOde7h2pec3R9rKe',
        allCardsNumber: 20,
        dashOutput: "iqValue",
        dashTitle: "IQ test",
        reward: 0.1,
        sharedReward: 0.5,
        cat: 'Quizzes',
        linksite: 'quizi.io',
        title: 'IQ test',
        desc: 'Discover popular answers to the most provocative questions.',
        img: './assets/polls.png',
        result: 'Your IQ is {{iqValue}}.',
        addr: 'q8TbAwAjRnSa38zVq5PQJCpKw0w1'
      }, { merge: true });
      
      for(let i = 0; i < quizzes.length; i++){
        console.log('quizzes ' + i)

        db.collection(`quizzes`).doc(doc.id).collection(`v1`).doc(quizzes[i].id).set({
        ...quizzes[i],
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
      }
    })
}

function setQuizzes1(){
  console.log("Add %s quizzes1", quizzes1.length)
  db.collection(`quizzes`).doc('OMx1k83U7LcZwlvZs9Aw').get().then(function(doc) {
    db.collection(`quizzes`).doc(doc.id).set({
      id: 'OMx1k83U7LcZwlvZs9Aw',
      allCardsNumber: 14,
      dashOutput: "number",
      dashTitle: "Impleum Platform",
      reward: 0.1,
      sharedReward: 0.5,
      cat: 'Quizzes',
      title: 'Impleum Platform',
      linksite: 'impleum.com',
      desc: 'Impleum is a powerful and scalable path to develop DApps.',
      img: './assets/catalog/impleum.png',
      result: 'You gave {{number}} right answers.',
      addr: 'q8TbAwAjRnSa38zVq5PQJCpKw0w1'
    }, { merge: true });

    for(let i = 0; i < quizzes1.length; i++){
      console.log('quizzes ' + i)
      db.collection(`quizzes`).doc(doc.id).collection(`v1`).doc(quizzes1[i].id).set({
      ...quizzes1[i],
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  })
}

async function setQuizzes2(){
  console.log("Add %s quizzes2", quizzes2.length)

  let doc = await db.collection(`polls`).doc('cHuEIjL3dsvNTVXNXa1Z');


  db.collection(`quizzes`).doc(doc.id).set({
      id: 'cHuEIjL3dsvNTVXNXa1Z',
      allCardsNumber: 10,
      dashOutput: "number",
      dashTitle: "Cyber Resilience",
      reward: 0.1,
      sharedReward: 0.5,
      cat: 'Quizzes',
      title: 'Cyber Resilience',
      linksite: 'impleum.com',
      desc: 'Will Your Business Survive in Ukrainian Cyber Realities?',
      img: './assets/catalog/10guards.png',
      result: `You gave {{number}} right {{startIf  number > 1  }}answers.{{endIf}} {{startIf  number <= 1  }}answer.{{endIf}}
      <br/> 
      {{startIf  number > 9  }}
        Cyber hero<br/> 
        Oh, dear Lord, you are practically invulnerable! With such a serious approach to cybersecurity, you shouldn’t worry about anything. Relax, pour yourself a drink and enjoy the day. Why not? You deserved it. But don’t forget about cybersecurity audits. Entrust this task to specialists and sleep soundly.
      {{endIf}}

      {{startIf  number > 3 and number <= 8}}
        Cyber student<br/> 
        Oh, what a potential you have. You are certainly well done, but you still have a room to grow. Keep going, and not a single hacker will scam you. You better contact cybersecurity specialists.
      {{endIf}}

      {{startIf  number <= 3 }}
        Cyber Buddhist<br/> 
        You have nerves of steel! You laugh in the face of danger, believe in karma and practice meditation to the sound of broken hopes. The only thing that stands between you and the hacker is a red thread tied to a computer monitor. But for the sake of the Buddha, before it's too late, contact cybersecurity specialists.
      {{endIf}}
      `,
      addr: 'q8TbAwAjRnSa38zVq5PQJCpKw0w1'
    }, { merge: true });

    for(let i = 0; i < quizzes2.length; i++){
      console.log('quizzes ' + i)
      db.collection(`quizzes`).doc(doc.id).collection(`v1`).doc(quizzes2[i].id).set({
      ...quizzes2[i],
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
    }

}


function setPolls(){
    console.log("Add %s polles", polls.length)

    db.collection(`polls`).doc('TufVMx0dkDVAaOr5KSdF').get().then(function(doc) {

      db.collection(`polls`).doc(doc.id).set({
        id: 'TufVMx0dkDVAaOr5KSdF',
        allCardsNumber: 10,
        dashOutput: 'number',
        dashTitle: 'Common poll',
        reward: 0.1,
        sharedReward: 0.5,
        cat: 'Polls',
        title: 'Common poll',
        linksite: 'quizi.io',
        desc: 'Discover popular answers to the most provocative questions.',
        img: './assets/catalog/common.png',
        result: 'You answered {{number}} of 10 polls.',
        addr: 'q8TbAwAjRnSa38zVq5PQJCpKw0w1'
      }, { merge: true });

      for(let i = 0; i < polls.length; i++){
        console.log('polls ' + i)
        db.collection(`polls`).doc(doc.id).collection(`v1`).doc(polls[i].id).set({
        ...withOutQuantity( polls[i] ),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true })
      }
    })
}


async function setPolls1(){
  console.log("Add %s polles", polls1.length)

  let doc =  await db.collection(`polls`).doc('ga2Y4kgp7kHOxu2IF4dl');

  doc.set({
    id: 'ga2Y4kgp7kHOxu2IF4dl',
    allCardsNumber: 10,
    dashOutput: 'number',
    dashTitle: 'Raters Movie',
    reward: 0.1,
    sharedReward: 0.5,  
    cat: 'Polls',
    title: 'Raters Movie',
    linksite: 'ratersapp.com',
    desc: 'Join Raters and discover great movies based on reviews from your friends.',
    img: './assets/catalog/raters.png',
    result: 'You answered {{number}} of 10 polls.',
    appleStore: 'https://itunes.apple.com/us/app/raters-movie-lovers-network/id1258540735?mt=8',
    addr: 'q8TbAwAjRnSa38zVq5PQJCpKw0w1'
  }, { merge: true });

  for(let i = 0; i < polls1.length; i++){
    console.log('polls ' + i)
    db.collection(`polls`).doc(doc.id).collection(`v1`).doc(polls1[i].id).set({
    ... withOutQuantity( polls1[i] ),
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true })
  }

}

async function setPolls2(){
  console.log("Add %s polles", polls2.length)

  let doc =  await db.collection(`polls`).doc('jUxerqRUfMblYzRbGRY4');

  doc.set({
    id: 'jUxerqRUfMblYzRbGRY4',
    allCardsNumber: 10,
    dashOutput: 'number',
    dashTitle: 'Raters Comics',
    reward: 0.1,
    sharedReward: 0.5,
    cat: 'Polls',
    title: 'Raters Comics',
    linksite: 'ratersapp.com',
    desc: 'Join Raters and discover great movies based on reviews from your friends.',
    img: './assets/catalog/ratersComics.png',
    result: 'You answered {{number}} of 10 polls.',
    appleStore: 'https://itunes.apple.com/us/app/raters-movie-lovers-network/id1258540735?mt=8',
    addr: 'q8TbAwAjRnSa38zVq5PQJCpKw0w1'
  }, { merge: true });

  for(let i = 0; i < polls2.length; i++){
    console.log('polls ' + i)
    db.collection(`polls`).doc(doc.id).collection(`v1`).doc(polls2[i].id).set({
    ...withOutQuantity( polls2[i] ) ,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true })
  }

}



function setCats(){
  console.log("Add categories.");

    db.collection('categories').doc('polls').set({
      type: 'cat',
      title: 'Polls',
      slug: 'polls',
      desc: 'Take a poll and discover popular answers to the most provocative questions.',
      img: null,
      btn: 'Explore polls',
      link: 'polls',
      cardtype: 'Poll',
      collections: ['common','movies'] 
    })
    
    db.collection('categories').doc('quizzes').set({
      type: 'cat',
      title: 'Quizzes',
      slug: 'quizzes',
      desc: 'Challenge yourself in various IQ, IT, and other fields by taking a quiz.',
      img: null,
      btn: 'Choose test',
      link: 'quizzes',
      cardtype: 'Quiz',
      collections: ['iq','blockchain', 'cybersecurity']
    })
    
    db.collection('categories/quizzes/iq').doc('WZ3b7uZkzkxopoMGKDwT').set({
        id: 'mNrynOde7h2pec3R9rKe',
        type: 'term',
        title: 'IQ test',
        linksite: 'quizi.io',
        desc: 'The average IQ is 100. Have you wondered what your IQ score is?',
        cardtype: 'Quiz',
        number: 20,
        btn: 'Take quiz',
        slug: 'quizzes/iq',
        img: './assets/catalog/IQ.png',
        link: `/quizzes/mNrynOde7h2pec3R9rKe`,
        reward: 0.1,
        sharedReward: 0.5, 
      });
    
    db.collection('categories/quizzes/blockchain').doc('Pu7JCX43tfzoigRFJrQM').set({
      id: 'OMx1k83U7LcZwlvZs9Aw',
      type: 'term',
      title: 'Impleum Platform',
      linksite: 'impleum.com',
      desc: 'Impleum is a powerful and scalable path to develop DApps.',
      cardtype: 'Quiz',
      number: 14,
      btn: 'Take quiz',
      slug: 'quizzes/blockchain',
      img: './assets/catalog/impleum.png',
      reward: 0.1,
      sharedReward: 0.5, 
      link: `/quizzes/OMx1k83U7LcZwlvZs9Aw`,
    });
    
    db.collection('categories/quizzes/cybersecurity').doc('k2JfLJQZYkFBlwrhIXHI').set({
      id: 'cHuEIjL3dsvNTVXNXa1Z',
      type: 'term',
      title: 'Cyber Resilience',
      linksite: '10guards.com',
      desc: 'The development of technologies opens up new business opportunities, and also, new threats to your assets.',
      cardtype: 'Quiz', // todo lowercase
      number: 10,
      btn: 'Take quiz',
      slug: 'quizzes/cybersecurity',
      img: './assets/catalog/10guards.png', 
      reward: 0.1,
      sharedReward: 0.5, 
      link: `/quizzes/cHuEIjL3dsvNTVXNXa1Z`,
    });

    db.collection('categories/polls/common').doc('EhA5Mms18RSnxoJNQ1JX').set({
      id: 'TufVMx0dkDVAaOr5KSdF',
      type: 'term',
      title: 'Common poll',
      linksite: 'quizi.io',
      desc: 'Discover popular answers to the most provocative questions.',
      cardtype: 'Poll',
      number: 10,
      btn: 'Take poll',
      slug: 'polls/common',
      img: './assets/catalog/common.png',
      link: `/polls/TufVMx0dkDVAaOr5KSdF`,
      reward: 0.1,
      sharedReward: 0.5, 
    })

    db.collection('categories/polls/movies').doc('oTFTncqMYa315ydrQUCD').set({
      id: 'ga2Y4kgp7kHOxu2IF4dl',
      type: 'term',
      title: 'Raters Movie',
      linksite: 'ratersapp.com',
      desc: 'Join Raters and discover great movies based on reviews from your friends.',
      cardtype: 'Poll',
      number: 10,
      btn: 'Take poll',
      slug: 'polls/movies',
      img: './assets/catalog/raters.png',
      link: `/polls/ga2Y4kgp7kHOxu2IF4dl`,
      reward: 0.1,
      sharedReward: 0.5, 
    })

    db.collection('categories/polls/movies').doc('Q8G2L4BfcNvbMZbwzzVV').set({
      id: 'jUxerqRUfMblYzRbGRY4',
      type: 'term',
      title: 'Raters Comics',
      linksite: 'ratersapp.com',
      desc: 'Join Raters and discover great movies based on reviews from your friends.',
      cardtype: 'Poll',
      number: 10,
      btn: 'Take poll',
      slug: 'polls/movies',
      img: './assets/catalog/ratersComics.png',
      link: `/polls/jUxerqRUfMblYzRbGRY4`,
      reward: 0.1,
      sharedReward: 0.5, 
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




function withOutQuantity(obj){
  
  let copyObj = Object.assign(obj);
  
  delete copyObj.answers.l.quantity;
  delete copyObj.answers.r.quantity;

  return copyObj
  
}


setPolls();
setPolls1();
setPolls2();
setQuizzes(); 
setQuizzes1();
setQuizzes2();
setCats();

// setCatMenu();
