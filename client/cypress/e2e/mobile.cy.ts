import {TestingClass} from '../classes/classCommands';

describe('mobile view tests', () => {
    it('MatchContainer component should not exist in mobile Dashboard view', () => {
        cy.viewport(390, 844);
        TestingClass.mobileLogin('marianne.leipola@gmail.com', '123');
        cy.get('[data-testid="match-container"]').should('not.exist');
    });
    it('User can see matches in mobile view from /matches route', () => {
        cy.viewport(390, 844);
        TestingClass.mobileLogin('marianne.leipola@gmail.com', '123');
        cy.get('[data-testid="view-matches"]').should('exist').should('be.visible').click();
        cy.url().should('equal', 'http://localhost:5173/matches');

        cy.intercept('GET', '**/matchedUsers/**').as('getMatchedUsersRequest');
        cy.wait('@getMatchedUsersRequest');

        cy.get('[data-testid="match-profile-0"]').should('exist').should('be.visible');
    });
});
