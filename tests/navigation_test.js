Feature('navigation');

Scenario('Testing from home page > rsvp -> info', (I) => {
    I.amOnPage('/');
    I.dontSeeElement('#wedding-menu');
    I.click('#menu-button');
    I.seeElement('#wedding-menu');
    I.click('#rsvp-button');
    I.seeInCurrentUrl('/rsvp');
    I.click('#menu-button');
    I.seeElement('#wedding-menu');
    I.click('#info-button');
    I.seeInCurrentUrl('/info');
});