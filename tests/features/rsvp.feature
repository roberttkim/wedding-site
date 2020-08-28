Feature: RSVP
  In order to let the host know who can/cannot go to the wedding
  As a guest
  I want to be able to RSVP

  Background:
    Given I am on the home page of the site
    When I click on the RSVP link
    Then I should see the RSVP page

  Scenario: Guest(s) Not Attending
    When I enter my code '1000'
    And I enter my email 'rtkim@hawaii.edu' and submit that I am not attending
    Then I should get a confirmation message

  Scenario: One Guest Attending
    When I enter my code '1000'
    And I enter my information for RSVPing for the following guest:
    | email             | address                                      |
    | test123@test.com  | 123 Test Street #4567 Honolulu, HI 96821     |
    Then I should get a confirmation message
