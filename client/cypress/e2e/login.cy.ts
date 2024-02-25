describe('login tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
    });
    it('Successful login attempt', () => {
        cy.contains('Login');
        cy.get('[data-testid="login-form"]').find('input[type=email]').type('marianne.leipola@gmail.com');

        cy.get('[data-testid="login-form"]').find('input[type=password]').type('123');
        cy.get('[data-testid="login-form"]').find('input[type=submit]').click();
        cy.url().should('equal', 'http://localhost:5173/dashboard');
    });
    it('Failed login attempt - Invalid email', () => {
        cy.contains('Invalid email address').should('not.exist');
        cy.get('[data-testid="login-form"]').find('input[type=email]').type('wrong.email@gmail.com');
        cy.get('[data-testid="login-form"]').find('input[type=password]').type('123');
        cy.get('[data-testid="login-form"]').find('input[type=submit]').click();

        cy.contains('Invalid email address').should('exist');
        cy.wait(5000); // Wait for the error message to disappear
        cy.contains('Invalid email address').should('not.exist');
        cy.get('[data-testid="new-around-here"]').click();

        cy.url().should('equal', 'http://localhost:5173/register');
    });
    it('Failed login attempt - Incorrect password', () => {
        cy.contains('Incorrect password').should('not.exist');
        cy.get('[data-testid="login-form"]').find('input[type=email]').type('marianne.leipola@gmail.com');
        cy.get('[data-testid="login-form"]').find('input[type=password]').type('WrongPassword');
        cy.get('[data-testid="login-form"]').find('input[type=submit]').click();

        cy.contains('Incorrect password').should('exist');
        cy.wait(5000); // Wait for the error message to disappear
        cy.contains('Incorrect password').should('not.exist');
    });
});
