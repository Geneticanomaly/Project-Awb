export class TestingClass {
    static login(email: string, password: string) {
        cy.visit('http://localhost:5173/login');

        // Intercept the occuring fetch requests
        cy.intercept('POST', '**/login').as('loginRequest');
        cy.intercept('GET', '**/user/**').as('getUserRequest');
        cy.intercept('GET', '**/gendered-users/**').as('getGenderedUsersRequest');
        cy.intercept('GET', '**/matchedUsers/**').as('getMatchedUsersRequest');

        cy.get('[data-testid="login-form"]').find('input[type=email]').type(`${email}`);
        cy.get('[data-testid="login-form"]').find('input[type=password]').type(`${password}`);
        cy.get('[data-testid="login-form"]').find('input[type=submit]').click();

        // Wait request to complete
        cy.wait('@loginRequest');
        cy.wait('@getUserRequest');
        cy.wait('@getGenderedUsersRequest');
        cy.wait('@getMatchedUsersRequest');
    }

    static mobileLogin(email: string, password: string) {
        cy.visit('http://localhost:5173/login');

        // Intercept the occuring fetch requests
        cy.intercept('POST', '**/login').as('loginRequest');
        cy.intercept('GET', '**/user/**').as('getUserRequest');
        cy.intercept('GET', '**/gendered-users/**').as('getGenderedUsersRequest');

        cy.get('[data-testid="login-form"]').find('input[type=email]').type(`${email}`);
        cy.get('[data-testid="login-form"]').find('input[type=password]').type(`${password}`);
        cy.get('[data-testid="login-form"]').find('input[type=submit]').click();

        cy.wait('@loginRequest');
        cy.wait('@getUserRequest');
        cy.wait('@getGenderedUsersRequest');
    }
}
