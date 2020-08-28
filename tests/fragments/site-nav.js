const { I } = inject();

module.exports = {
    siteNav: '#menu-button',
    home: '#home-button',
    info: '#info-button',
    rsvp: '#rsvp-button',

    clickMenuButton() {
        I.click(this.siteNav);
    },

    clickHomeButton() {
        I.click(this.home);
    },

    clickRsvpButton() {
        I.click(this.rsvp);
    },

    clickInfoButton() {
        I.click(this.info);
    }
}