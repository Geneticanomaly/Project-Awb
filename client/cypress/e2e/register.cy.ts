describe('Register tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/register');
    });
    it('Successful register attempt', () => {
        cy.contains('Create Account').should('exist');
        cy.get('[data-testid="register-form"]').find('input[type=email]').type('email@email.com');
        cy.get('#password').type('123');
        cy.get('#password-confirm').type('123');
        cy.get('[data-testid="register-form"]').find('input[type=submit]').click();
        cy.url().should('equal', 'http://localhost:5173/onboarding');
    });
});
