const { I, rsvpPage, siteNav } = inject();

Given('I am on the home page of the site', () => {
    // From "tests/features/rsvp.feature" {"line":7,"column":5}
    I.amOnPage('/');
    I.see('RSVP HERE', '.main-link-button')
});

When('I click on the RSVP link', () => {
    // From "tests/features/rsvp.feature" {"line":8,"column":5}
    siteNav.clickMenuButton();
    siteNav.clickRsvpButton();
});

Then('I should see the RSVP page', () => {
    // From "tests/features/rsvp.feature" {"line":9,"column":5}
    I.seeInCurrentUrl(rsvpPage.url);
});

When(`I enter my code {string}`, (code) => {
    // From "tests/features/rsvp.feature" {"line":12,"column":5}
    rsvpPage.submitCodeForm(code);
    I.seeElement(rsvpPage.guestFormFields.formId);
});

When('I enter my email {string} and submit that I am not attending', (email) => {
    // From "tests/features/rsvp.feature" {"line":13,"column":5}
    I.fillField(rsvpPage.guestFormFields.email, email);
    I.checkOption(rsvpPage.guestFormFields.notAttending);
    I.click(rsvpPage.guestFormFields.submitButton);
});

Then('I should get a confirmation message', () => {
    // From "tests/features/rsvp.feature" {"line":14,"column":5}
    I.see('MAHALO!');
});

When('I enter my information for RSVPing for the following guest:', (table) => {
    // From "tests/features/rsvp.feature" {"line":18,"column":5}
    const email = table.rows[1].cells[0].value;
    const address = table.rows[1].cells[1].value;

    I.fillField(rsvpPage.guestFormFields.email, email);
    I.checkOption(rsvpPage.guestFormFields.attending);
    I.fillField(rsvpPage.guestFormFields.address, address);
    I.checkOption(rsvpPage.guestFormFields.guestCountActual1);
    I.click(rsvpPage.guestFormFields.submitButton);
});