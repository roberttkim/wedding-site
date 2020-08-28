exports.config = {
  output: './tests/output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:4200',
      show: true,
      windowSize: '1200x900'
    }
  },
  include: {
    I: './steps_file.js',
    rsvpPage: './tests/pages/rsvp.js',
    guestMikeData: './tests/data/guest-mike.js',
    siteNav: './tests/fragments/site-nav.js'
  },
  mocha: {},
  bootstrap: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './tests/features/*.feature',
    steps: ['./tests/step_definitions/rsvp_steps.js']
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    retryFailedStep: {
      enabled: true
    }
  },
  tests: './tests/*_test.js',
  multiple: {
    basic: {
      browsers: ['chrome', 'safari']
    }
  },
  name: 'wedding-site'
}