const jsdom = require("jsdom");
const fs = require("mz/fs");

const { JSDOM } = jsdom;
const cname = 'https://quizi.io/';
async function pagesWithCards(){
    
const pages = [

    {
        id: 'mNrynOde7h2pec3R9rKe',
        type: 'term',
        title: 'IQ test',
        linksite: 'quizi.io',
        desc: 'The average IQ is 100. Have you wondered what your IQ score is?',
        cardtype: 'Quiz',
        number: 20,
        btn: 'Take quiz',
        slug: 'quizzes/iq',
        img: '/socialPictures/IQ.png',
        link: `/quizzes/mNrynOde7h2pec3R9rKe`,
        reward: 0.1,
    },

    {
        id: 'OMx1k83U7LcZwlvZs9Aw',
        type: 'term',
        title: 'Impleum Platform',
        linksite: 'impleum.com',
        desc: 'Impleum is a powerful and scalable path to develop DApps.',
        cardtype: 'Quiz',
        number: 14,
        btn: 'Take quiz',
        slug: 'quizzes/blockchain',
        img: '/socialPictures/impleum.png',
        reward: 0.1,
        link: `/quizzes/OMx1k83U7LcZwlvZs9Aw`,
    },

    {
        id: 'cHuEIjL3dsvNTVXNXa1Z',
        type: 'term',
        title: 'Cyber Resilience',
        linksite: '10guards.com',
        desc: 'The development of technologies opens up new business opportunities, and also, new threats to your assets.',
        cardtype: 'Quiz', // todo lowercase
        number: 10,
        btn: 'Take quiz',
        slug: 'quizzes/cybersecurity',
        img: '/socialPictures/10guards.png', 
        reward: 0.1,
        link: `/quizzes/cHuEIjL3dsvNTVXNXa1Z`,
    },

    {
        id: 'TufVMx0dkDVAaOr5KSdF',
        type: 'term',
        title: 'Common poll',
        linksite: 'quizi.io',
        desc: 'Discover answers to the most provocative question.',
        cardtype: 'Poll',
        number: 10,
        btn: 'Take polls',
        slug: 'polls/common',
        img: '/socialPictures/common.png',
        link: `/polls/TufVMx0dkDVAaOr5KSdF`,
        reward: 0.1,
    },

    {
        id: 'ga2Y4kgp7kHOxu2IF4dl',
        type: 'term',
        title: 'Raters Movie',
        linksite: 'ratersapp.com',
        desc: 'Join Raters and discover great movies based on reviews from your friends.',
        cardtype: 'Poll',
        number: 10,
        btn: 'Take polls',
        slug: 'polls/movies',
        img: '/socialPictures/raters.png',
        link: `/polls/ga2Y4kgp7kHOxu2IF4dl`,
        reward: 0.1,
    },

    {
        id: 'jUxerqRUfMblYzRbGRY4',
        type: 'term',
        title: 'Raters Comics',
        linksite: 'ratersapp.com',
        desc: 'Join Raters and discover great movies based on reviews from your friends.',
        cardtype: 'Poll',
        number: 10,
        btn: 'Take polls',
        slug: 'polls/movies',
        img: '/socialPictures/ratersComics.png',
        link: `/polls/jUxerqRUfMblYzRbGRY4`,
        reward: 0.1,
    }
];



const index = await fs.readFile('./build/index.html');
const dom = new JSDOM(index.toString('utf-8'));

    for ({title, desc, img, id} of pages){


        let entriesToReplace = [
            {
                propertyName: '[property="og:title"]',
                content: title
            },
            {
                propertyName: '[property="og:description"]',
                content: desc
            },
            {
                propertyName: '[property="og:image"]',
                content: cname + img
            },
            {
                propertyName: '[name="twitter:title"]',
                content: title
            },
            {
                propertyName: '[name="twitter:description"]',
                content: title
            },
            {
                propertyName: '[name="twitter:image"]',
                content: cname + img
            }
        ];

        for ({propertyName, content} of entriesToReplace){
            let meta = dom.window.document.querySelector(propertyName);
            if(content) meta.content = content;
            if( await fs.exists(`./build/${id}.html`)) {
                await fs.unlink(`./build/${id}.html`)
            }
            const index = await fs.writeFile(`./build/${id}.html`, `<!DOCTYPE html><html lang="en"> ${dom.window.document.documentElement.innerHTML} </html>`);

        }
        
    }

}

pagesWithCards();