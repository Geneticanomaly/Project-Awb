import {TestingClass} from '../classes/classCommands';

describe('mobile view tests', () => {
    it('MatchContainer component should not exist in mobile Dashboard view', () => {
        cy.viewport(390, 844);
        TestingClass.login('Marianne.Leipola@gmail.com', '123');
        cy.wait(8000); // Wait long enough for fetch requests to happen
        cy.get('[data-testid="match-container"]').should('not.exist');
    });
    it('User can see matches in mobile view', () => {
        cy.viewport(390, 844);
        TestingClass.login('Marianne.Leipola@gmail.com', '123');
        cy.wait(4000); // Wait long enough for fetch requests to happen
        cy.get('[data-testid="view-matches"]').should('exist').should('be.visible').click();
        cy.wait(4000); // Wait long enough for fetch requests to happen
        cy.url().should('equal', 'http://localhost:5173/matches');
        cy.get('[data-testid="match-profile-0"]').should('exist').should('be.visible');
    });
});
