const { I } = inject();

module.exports = {
  // insert your locators and methods here
  url: '/rsvp',
  codeFormFields: {
    formId: '#code-form',
    code: '#code',
    submitButton: '#code-submit'
  },

  guestFormFields: {
    formId: '#guest-form',
    email: '#email',
    attending: '#attendingYES',
    notAttending: '#attendingNO',
    address: '#address',
    guestCountActual1: '#guestCountActual1',
    guestCountActual2: '#guestCountActual2',
    guestCountActual3: '#guestCountActual3',
    submitButton: '#guest-submit'
  },

  // start at rsvp page
  goToPage() {
    I.amOnPage(this.url);
  },

  //submit code
  submitCodeForm(code) {
    I.fillField(this.codeFormFields.code, code);
    I.click(this.codeFormFields.submitButton);
  }
}
