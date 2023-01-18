Feature: Login
	Login options including registering

@registration
Scenario: Perform Registration of theaterlaak.site
	Given I send the following details 
		| userName | email             | Password |
		| jantje     | jantje@testmail.com | String1! |
  	When I click register button
  	Then I should receive succes alert