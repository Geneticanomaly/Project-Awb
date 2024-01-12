import {TestingClass} from '../classes/classCommands';

describe('scenario tests', () => {
    it('User logs in and logs out', () => {
        // Calls a class that handles login cypress code
        TestingClass.login('Marianne.Leipola@gmail.com', '123');

        cy.wait(4000); // Wait long enough for fetch requests to happen
        cy.get('[data-testid="profile-page-link"]').click();
        cy.wait(2000); // Wait long enough for fetch requests to happen
        cy.url().should('include', 'http://localhost:5173/profile');
        cy.get('[data-testid="profile-logout"]').should('exist');
        cy.get('[data-testid="profile-add-image"]').should('exist');
        cy.get('[data-testid="profile-logout"]').click();
        cy.url().should('include', 'http://localhost:5173/');
    });
    it('User with a match can send a message and the message is found', () => {
        // Calls a class that handles login cypress code
        TestingClass.login('Marianne.Leipola@gmail.com', '123');

        cy.wait(8000); // Wait long enough for fetch requests to happen
        cy.get('[data-testid="chat-btn-1"]').click();
        cy.wait(2000); // Wait long enough for fetch requests to happen
        cy.url().should('include', 'http://localhost:5173/chat');

        cy.get('[data-testid="input-msg"]').type('This is a Cypress test!');
        cy.get('[data-testid="send-msg"]').click();
        cy.get('.messages [data-testid="message-item"]:last .sent-message').should('exist');
    });
    it('User can check another users profile', () => {
        // Calls a class that handles login cypress code
        TestingClass.login('Marianne.Leipola@gmail.com', '123');

        cy.wait(8000);
        cy.get('[data-testid="match-profile-1"]').click();
        cy.wait(2000); // Wait long enough for fetch requests to happen
        cy.get('[data-testid="profile-logout"]').should('not.exist');
        cy.get('[data-testid="profile-add-image"]').should('not.exist');
    });
});
