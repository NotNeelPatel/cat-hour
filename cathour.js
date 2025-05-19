const dataTemplate = document.querySelector("[data-template]");
const entryContainer = document.querySelector("[data-entries-container");

const subs_and_weights = [
    {
        subreddit: "blurrypicturesofcats",
        weight : 0.19,
        count: 0
    },
    {
        subreddit: "Blep",
        weight: 0.18,
        count: 0
    },
    {
        subreddit: "Catswithjobs",
        weight: 0.12,
        count: 0
    },
    {
        subreddit: "WhatsWrongWithYourCat",
        weight: 0.10,
        count: 0
    },
    {
        subreddit: "funnycats",
        weight: 0.10,
        count: 0
    },
    {
        subreddit: "MEOW_IRL",
        weight: 0.08,
        count: 0
    },
    {
        subreddit: "CatsStandingUp",
        weight: 0.08,
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
    },
    {
        subreddit: "VoidCats",
        weight: 0.05,
        count: 0
    }
];

const subreddits = subs_and_weights.map(function(x){
    return x.subreddit;
});

let weight_value = 0;
const weights = subs_and_weights.map(function(x){
    weight_value += x.weight;
    return weight_value;
});


function weightedRandom(weights){
    let rand = Math.random();
    let i;
    for(i = 0; i < weights.length; i++){
        if (rand < weights[i]){
            //console.log(i)
            return i;
        }
    }
    return weights.length - 1;
    //console.log(i)
    //return weights.length - 1;
}



async function getCandidates(i){
    let subreddit = subreddits[i];
    //let reddit_url = "https://www.reddit.com/r/"+subreddit+"/new.json?limit=5";
    let reddit_url = "./debug.json";
    let count = 0;
    let new_candidates = [];
    //console.log(reddit_url)
    const res = await fetch(reddit_url);
    const data = await res.json();
    while(count < 5){
        if(data.data.children[count] != null) {
            const children = data.data.children[count];

            if(!(children.data.is_video) 
                && !(children.data.is_gallery)
                && !(children.data.url_overridden_by_dest == undefined)  
                && !(children.data.url_overridden_by_dest.includes("imgur"))
                && !(children.data.url_overridden_by_dest.includes("v.redd.it"))
                && !(children.data.url_overridden_by_dest.includes("gallery"))){
                    
                    new_candidates.push({
                        "src":children.data.url_overridden_by_dest,
                        "href":"https://reddit.com"+children.data.permalink,
                        "caption":children.data.title
                    });

            }
        }
        count++;
    }
    return new_candidates;
}



let entries = []
function getImages(i, id, reddit_objs){

    const card = dataTemplate.content.cloneNode(true).children[0];
    const img = card.querySelector("[data-img]");
    const url = card.querySelector("[data-url]");
    const caption = card.querySelector("[data-caption]");

    //img.src = children.data.url_overridden_by_dest
    //url.href = "https://reddit.com"+children.data.permalink
    //caption.textContent = children.data.title;
    let count = subs_and_weights[i].count;
    
    if(reddit_objs[count]){
        img.src = candidates[i][count].src;    
        url.href = candidates[i][count].href;
        caption.textContent = candidates[i][count].caption;
    } else {
        return false;
    }


    caption.id = "window-" + id + "-title";
    card.id = "window-" + id;
    entryContainer.append(card);
    card.style.zIndex = 18 - id;

    const w = window.innerWidth - 600;
    const h = window.innerHeight - 400;
    const quarter_w = 150;
    const quarter_h = -50;
    card.style.top = (Math.random() * (h) + quarter_h) + "px";
    card.style.left = (Math.random() * (w - quarter_w) + quarter_w) + "px";
    //card.style.top = (Math.random() * (400 - 50) + 50) + "px";
    //card.style.left = (Math.random() * (1000 - 200) + 200) + "px";
    subs_and_weights[i].count++;
    dragElement(document.getElementById("window-" + id));
    return true;
} 














/*
while (img_count < 9){
    let index = weightedRandom(weights)
    if(getImages(index, img_count)){
        img_count++;
    }
    else if (retries > 10){
        alert("try again idk");
        img_count = 10;
    }
    else {
        retries++;
    }

}
*/


let candidates = [];

async function loadCandidatesAndImages() {
    // Fetch all candidates asynchronously
    candidates = await Promise.all(
        subreddits.map((_, d) => getCandidates(d))
    );

    //console.log("Candidates Length : " + candidates.length)
    //console.log(candidates)

    let img_count = 0;
    var retries = 0;
    while (img_count < 9 || retries > 8){
        let index = weightedRandom(weights)
        //let index = Math.round((Math.random() * candidates.length))
        //console.log(index)
        if(getImages(index, img_count, candidates[index])) {
            img_count++;
        } else {
            retries++;
            //console.log(retries)
        }
 
    }
}

loadCandidatesAndImages();