const rsvp = require("./pages/rsvp");

Feature('rsvp-guest-invalid');

Scenario('Typing invalid code in rsvp code form', (I, rsvpPage) => {
    rsvpPage.goToPage();
    rsvpPage.submitCodeForm('0000');
    I.see('Guest code is invalid.');
});
