import requests
import os
import random

# Stores the urls for the posts
imageURLs = [] 
originalURLs = []
captions = []

def get_content(subreddit, count):
    """
    Request content from reddit and add to the list of posts
    """
    res = requests.get('https://oauth.reddit.com/r/'+subreddit+'/new', headers=headers, params={'limit': str(count)})
    for post in res.json()['data']['children']:
        # Make sure it's not a gallery, video, imgur post, or youtube video
        try:
            if 'preview' in post['data'] and post['data']['is_video'] is False:
                if 'imgur' not in post['data']['url_overridden_by_dest'] and 'v.redd.it' not in post['data']['url_overridden_by_dest']  and 'youtu' not in post['data']['url_overridden_by_dest']:
                    originalURLs.append('https://reddit.com/' + post['data']['permalink'])
                    imageURLs.append(post['data']['url_overridden_by_dest'])
                    captions.append(post['data']['title'])
        except Exception as e:
            print(e)

def readHTML(filename) -> str:
    """
    Reads HTML boilerplate code and returns it as a string
    """
    fr = open(filename, 'r')
    the_file = fr.read()
    fr.close()
    return the_file


def readFile(fileName: str) -> str:
    with open(fileName, 'r') as f:
        return f.read()

# You will need to provide your own client id, secret key, username, and password if you want this to work
CLIENT_ID = os.getenv("TOKEN")
SECRET_KEY = os.getenv("SECRET")

auth = requests.auth.HTTPBasicAuth(CLIENT_ID,SECRET_KEY)

USERNAME = os.getenv('UNAME')
PASSWORD = os.getenv('PASSWORD')

data = {
    'grant_type': 'password',
    'username': USERNAME,
    'password': PASSWORD
}

headers = {'User-Agent': 'Cat-Hour/0.0.1'}
res = requests.post('https://www.reddit.com/api/v1/access_token', auth=auth, data=data, headers=headers)

TOKEN = res.json()['access_token']
headers['Authorization'] = f'bearer {TOKEN}'

# Getting content from the following subreddits
# The number refers to the amount of posts I look for in these subreddits
# The higher the number, the more likely those posts will be shown
get_content('blurrypicturesofcats', 15)
get_content('Blep', 15)
get_content('WhatsWrongWithYourCat', 10)
get_content('MEOW_IRL', 10)
get_content('Catswithjobs', 10)
get_content('CatsStandingUp', 10)
get_content('funnycats', 10)
get_content('sillycats', 5)
get_content('OneOrangeBraincell', 5)



# Create post tuple and randomize it
postList = [(originalURLs[i], imageURLs[i], captions[i]) for i in range(len(imageURLs))]
random.shuffle(postList)
posts = []
content = '\n'
for i in range(9):
    content += '<div class="post-wrapper">\n<a href="'+postList[i][0]+'"><img src="'+postList[i][1]+'"/></a>\n<div class="caption">\n<p>'+postList[i][2]+'</p>\n</div>\n</div>\n'

header = readHTML('header.html')
footer = readHTML('footer.html')

# Create the final HTML file, which then gets pushed to my website
f = open('index.html', 'w')
f.write(header)
f.write(content)
f.write(footer)

# Run a cron job every hour, running this script and pushing the contents.

