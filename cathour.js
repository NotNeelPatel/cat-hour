const dataTemplate = document.querySelector("[data-template]");
const entryContainer = document.querySelector("[data-entries-container");


let entries = []
function getImages(i){
    let subreddit = subreddits[i];
    let reddit_url = "https://www.reddit.com/r/"+subreddit+"/new.json?limit=5";

    fetch(reddit_url)
        .then(res => res.json())
        .then(data => {
            while(subs_and_weights[i].count < 5){
                const children = data.data.children[subs_and_weights[i].count];
                if(!(children.data.is_video) 
                    && !(children.data.is_gallery) 
                    && (children.data.url_overridden_by_dest != undefined)  
                    && !(children.data.url_overridden_by_dest.includes("imgur"))){

                    const card = dataTemplate.content.cloneNode(true).children[0];
                    const img = card.querySelector("[data-img]");
                    const url = card.querySelector("[data-url]");
                    const caption = card.querySelector("[data-caption]");

                    img.src = children.data.url_overridden_by_dest
                    url.href = "https://reddit.com"+children.data.permalink
                    caption.textContent = children.data.title
                    entryContainer.append(card);
                    
                    subs_and_weights[i].count++;
                    return;
                } 
                subs_and_weights[i].count++;
            }
        });
        return;
}

function weightedRandom(weights){
    let rand = Math.random();
    let i;
    for(i = 0; i < weights.length; i++){
        if (rand < weights[i]){
            return i;
        }
    }
    return weights[i];
}

subs_and_weights = [
    {
        subreddit: "blurrypicturesofcats",
        weight : 0.18,
        count: 0
    },
    {
        subreddit: "Blep",
        weight: 0.20,
        count: 0
    },
    {
        subreddit: "WhatsWrongWithYourCat",
        weight: 0.12,
        count: 0
    },
    {
        subreddit: "MEOW_IRL",
        weight: 0.10,
        count: 0
    },
    {
        subreddit: "Catswithjobs",
        weight: 0.10,
        count: 0
    },
    {
        subreddit: "CatsStandingUp",
        weight: 0.10,
        count: 0
    },
    {
        subreddit: "funnycats",
        weight: 0.10,
        count: 0
    },
    {
        subreddit: "sillycats",
        weight: 0.05,
        count: 0
    },
    {
        subreddit: "OneOrangeBraincell",
        weight: 0.05,
        count: 0
    }
]

const subreddits = subs_and_weights.map(function(x){
    return x.subreddit;
});

let weight_value = 0;
const weights = subs_and_weights.map(function(x){
    weight_value += x.weight;
    return weight_value;
});

for(let i = 0; i < 9; i++){
    let index = weightedRandom(weights)
    getImages(index);
}

