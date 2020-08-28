# wedding-site
Front-end template for wedding site.  Built on Angular 10.  
Run ```npm install``` and ```npm start``` to install and run the app.

E2E Testing via CodeceptJS using Puppeteer/Protractor.  
In order to run the tests, you need to start the selenium server ```npm run wd:start``` and then you can run the tests ```npm run codeceptjs```.  
Test cases:
* Basic Navigation
* Invalid code entry

BDD scenarios:
* RSVP - not attending
* RSVP - one guest
