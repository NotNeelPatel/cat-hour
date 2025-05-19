const dataTemplate = document.querySelector("[data-template]");
const entryContainer = document.querySelector("[data-entries-container");

// List of subreddits that I'm pulling from
// There is a weight that changes how common the subreddit is to be selected as one of the 9 photos
// Count is used to ensure that a unique image from the subreddit is chosen
// (I am aware there are edge cases like when someone posts the same image in two subs, but this does a good enough job at avoiding duplicates)
const subs_and_weights = [
    {
        subreddit: "blurrypicturesofcats",
        weight: 0.19,
        count: 0,
    },
    {
        subreddit: "Blep",
        weight: 0.18,
        count: 0,
    },
    {
        subreddit: "Catswithjobs",
        weight: 0.12,
        count: 0,
    },
    {
        subreddit: "WhatsWrongWithYourCat",
        weight: 0.1,
        count: 0,
    },
    {
        subreddit: "funnycats",
        weight: 0.1,
        count: 0,
    },
    {
        subreddit: "MEOW_IRL",
        weight: 0.08,
        count: 0,
    },
    {
        subreddit: "CatsStandingUp",
        weight: 0.08,
        count: 0,
    },
    {
        subreddit: "sillycats",
        weight: 0.05,
        count: 0,
    },
    {
        subreddit: "OneOrangeBraincell",
        weight: 0.05,
        count: 0,
    },
    {
        subreddit: "VoidCats",
        weight: 0.05,
        count: 0,
    },
];

// Used for weighted random to get weight value
let weight_value = 0;
const weights = subs_and_weights.map(function (x) {
    weight_value += x.weight;
    return weight_value;
});

// Weighted random to decide which subreddit to choose
function weightedRandom(weights) {
    let rand = Math.random();
    let i;
    for (i = 0; i < weights.length; i++) {
        if (rand < weights[i]) {
            return i;
        }
    }
    return weights.length - 1;
}


// loads the 5 latest posts from a subreddit
// and grabs all the posts that contain only one image in it
// then puts the relevant data in a JSON object and returns an array of
// all potential candidates
async function getCandidates(subreddit) {
    let limit = 5
    let reddit_url = "https://www.reddit.com/r/"+subreddit+"/new.json?limit="+limit;
    // use for debug
    //let reddit_url = "./debug.json";
    let new_candidates = [];

    // Fetch reddit URL
    const res = await fetch(reddit_url);
    const data = await res.json();
    for (let i = 0; i < limit; i++) {
        if (data.data.children[i] != null) {
            const children = data.data.children[i];
            
            // Filter out galleries and videos and imgur links (they dont embed on other websites)
            if (
                !children.data.is_video &&
                !children.data.is_gallery &&
                !(children.data.url_overridden_by_dest == undefined) &&
                !children.data.url_overridden_by_dest.includes("imgur") &&
                !children.data.url_overridden_by_dest.includes("v.redd.it") &&
                !children.data.url_overridden_by_dest.includes("gallery")
            ) {
                // If successful, push the image url, original link of the reddit post, and the caption
                new_candidates.push({
                    src: children.data.url_overridden_by_dest,
                    href: "https://reddit.com" + children.data.permalink,
                    caption: children.data.title,
                });
            }
        }
    }
    return new_candidates;
}

// Creates and displays an image
function setImages(subreddit, id, reddit_objs) {
    // Create image from template
    const card = dataTemplate.content.cloneNode(true).children[0];
    const img = card.querySelector("[data-img]");
    const url = card.querySelector("[data-url]");
    const caption = card.querySelector("[data-caption]");

    // This value increases for every image from that subreddit is already placed
    // This prevents duplicate images
    let count = subs_and_weights[subreddit].count;

    // Ensure there is another image in the array
    if (reddit_objs[count]) {
        img.src = candidates[subreddit][count].src;
        url.href = candidates[subreddit][count].href;
        caption.textContent = candidates[subreddit][count].caption;
    } else {
        // If not, retry (this can be done by calling setImages again)
        console.log(
            "no more candidates for subreddit: " + subs_and_weights[subreddit].subreddit
        );
        return false;
    }

    subs_and_weights[subreddit].count++;

    card.id = "window-" + id;
    entryContainer.append(card);
    // Z-index is important for the window stacking, z-indices 10-18 are used for the images
    card.style.zIndex = 18 - id;

    // Place images roughly in center, with some RNG
    const w = window.innerWidth - 600;
    const h = window.innerHeight - 400;
    const quarter_w = 150;
    const quarter_h = -50;
    card.style.top = Math.random() * h + quarter_h + "px";
    card.style.left = Math.random() * (w - quarter_w) + quarter_w + "px";
    
    dragElement(document.getElementById("window-" + id));
    return true;
}

let candidates = [];
async function loadCandidatesAndImages() {
    // Fetch all candidates asynchronously
    candidates = await Promise.all(
        subs_and_weights.map((_, d) => getCandidates(subs_and_weights[d].subreddit))
    );

    let img_count = 0;
    var retries = 0;
    
    // Attempt at most 20 times to get 9 images.
    // This is based off the math of E(x) = nlog(n), where n is 9, therefore E(x) ≈ 20
    // This is incorrect math because of the weighted random,
    // but considering the odds of getting this scenario is so low,
    // it's probably not worth doing more attempts.
    while (img_count < 9 && retries < 11) {
        // get a random subreddit
        let index = weightedRandom(weights);
        // Setting an image may not be successful if all candidates have been used
        if (setImages(index, img_count, candidates[index])) {
            img_count++;
        } else {
            retries++;
            if (retries >= 11) {
                alert(
                    "Please check developer console and try again in ~1 hour"
                );
            }
        }
    }
}

loadCandidatesAndImages();