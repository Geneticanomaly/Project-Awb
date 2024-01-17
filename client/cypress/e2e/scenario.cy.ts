import {TestingClass} from '../classes/classCommands';
import {calculateAge} from '../../src/helperFunctions';

describe('scenario tests', () => {
    // :TODO
    // Upload file in profile view.
    //

    it('User logs in and logs out', () => {
        // Calls a class that handles login cypress code
        TestingClass.login('Marianne.Leipola@gmail.com', '123');

        // Wait long enough for fetch requests to happen
        cy.get('[data-testid="profile-page-link"]').click();
        // Wait long enough for fetch requests to happen
        cy.location('pathname').should('include', '/profile');

        cy.intercept('GET', '**/user/**').as('getUserRequest');
        cy.wait('@getUserRequest');

        cy.get('[data-testid="profile-logout"]').should('exist');
        cy.get('[data-testid="profile-add-image"]').should('exist');
        cy.get('[data-testid="profile-logout"]').click();
        cy.url().should('equal', 'http://localhost:5173/');
    });
    it('User can check another users profile', () => {
        // Calls a class that handles login cypress code
        TestingClass.login('Marianne.Leipola@gmail.com', '123');

        cy.get('[data-testid="match-profile-0"]').click();

        cy.intercept('GET', '**/user/**').as('getUserRequest');
        cy.wait('@getUserRequest');

        cy.get('[data-testid="profile-logout"]').should('not.exist');
        cy.get('[data-testid="profile-add-image"]').should('not.exist');
    });
    it.only('Ensure user information is displayed in correctly profile view', () => {
        TestingClass.login('thomaskaatranen@gmail.com', '123');

        cy.get('[data-testid="profile-page-link"]').click();

        cy.location('pathname').should('include', '/profile');

        // cy.intercept('GET', `**/userImages/**`).as('getUserImagesRequest');
        // cy.wait('@getUserImagesRequest').then((imageData) => {
        //     const images = imageData.response?.body;

        //     if (images && images.length > 0) {
        //         cy.get('.images-container img').should('have.length', images.length);
        //     } else {
        //         cy.get('.image-msg')
        //             .should('be.visible')
        //             .and('contain', 'This profile has no images...');
        //     }
        // });

        cy.intercept('GET', '**/user/**').as('getUserRequest');
        cy.wait('@getUserRequest').then((data) => {
            // Access the response body or any other information
            const user = data.response?.body;

            cy.get('.profile-info-container img')
                .should('have.attr', 'src')
                .and('include', `data:${user.url.mimetype};base64,${user.url.buffer.toString()}`);
            cy.get('.profile-info h2')
                .eq(0)
                .should('have.text', `Registered: ${user.registration_date.split('T')[0]}`);
            cy.get('.profile-info h2').eq(1).should('have.text', user.email);
            cy.get('.profile-info h2')
                .eq(2)
                .should('have.text', `${user.first_name} ${user.last_name}`);

            const age = calculateAge(user.dob_day, user.dob_month, user.dob_year);

            cy.get('.profile-info h2').eq(3).should('have.text', `${age} Years old`);

            cy.get('.about p').should('have.text', `${user.about}`);
        });
    });
    it('User with a match can send a message and the message is found', () => {
        // Calls a class that handles login cypress code
        TestingClass.login('Marianne.Leipola@gmail.com', '123');

        cy.get('[data-testid="chat-btn-0"]').click();
        cy.location('pathname').should('include', '/chat');

        cy.intercept('GET', '**/chat/**').as('getUsersChat');
        cy.wait('@getUsersChat');

        cy.get('[data-testid="input-msg"]').type('This is a Cypress test!');
        cy.get('[data-testid="send-msg"]').click();
        cy.get('.messages [data-testid="message-item"]:last .sent-message').should('exist');
    });
});
