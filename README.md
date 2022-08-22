# Proj1

Requirements:
1. Use CSS framework NOT Bootstrap
2. Be interactive by accepting and responding to user input 
3. Use 2 server side APIs
4. Use Modals instead of alerts/confirms/prompts
5. Use client side storage (localstorage) to store data
6. Be responsive on mobile 
7. Have polished UI



## User Story:

As a millennial trying to pay attention to the news, 
I want to be able to see a 'blurb' form of the news that is quick to read 
So I can quickly get up to date on current events

I want to be able to search for news
So that I can find articles

I want to see the thumbnails of the news article 
So that i can visually see the articles

I want to be able to scroll and see different articles 
So that my news continues 

I want to see a more detailed description of a news story whenever I hover over the image
So that I can read the abstract at a glance

I want to be able to click on the articles 
So that I can read the full article

I want to be able choose categories of news to specify my feed
So that I can quickly see different types of news

I want to be able to share the articles 
So that I can send these articles to my friends 

I want the application to remember my last location to localStorage
So that I can continue my viewing after closing/opening the browser 

I want to be able to subscribe to the news to get regular updates //tricky, but not impossible //adds email to emailListArray?
So that I can get emails with the latest stories

This was accomplished by: 
1. Making the webpage present multiple news stories with their abstracts 
2. Having a search bar to search for news topics
3. Having each news article's thumbnail be present
4. A hover caption that displays the news article's blurb in a tooltip
5. The URL of the articles are anchored in the HTML with their href being updated in the JS
6. Defined categories at the top of the webpage to select between different curated news topics
7. A share button was added to automatically copy the URL of the article
8. Having the application run on startup on the last news category chosen
9. Having a subscribe button that stores first name, last name, and email to an array

Application Description: 
Swift News is a easy to access news website that uses multiple APIs from the New York Times to display the most popular news, the top stories of today, and other news articles. The articles are presented as an easy-to-read format, with their image, abstract, and title displayed per article. The user is able to select between a variety of categories on the responsive navigation bar or search for articles in the search bar. Each category displays their corresponding top news stories, with the most recent story appearing on the main article page. The user can cycle through articles with the Previous/Next buttons when clicked. The older articles within the selected category are displayed as sub-articles below the main article, with each having their abstract and image displayed in an organized manner. A sidebar with the 4 most popular articles, which are the most shared NYT articles on FaceBook, are displayed as a card format with a share option, which copies the URL of the article to the clipboard. The footer hosts a subscribe button which, when clicked, pops up a responsive modal where the user can submit their first name, last name, and email. The data is stored into an array for contact purposes. Lastly, the last article and category are stored to LocalStorage so the user can resume their browsing.

## Screenshots

![Screenshot of Desktop Version of SwiftNews Web Page.](./Screen%20Shot%202022-08-21%20at%208.44.28%20PM.png) 
![Screenshot of Desktop Version of SwiftNews Web Page.Pt.2](Screen%20Shot%202022-08-21%20at%208.45.12%20PM.png)

## Links

Link to Repo: https://github.com/shawnbandy/SwiftNews

Link to Deployed Application: 

