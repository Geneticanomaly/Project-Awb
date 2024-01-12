describe('home tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
    });
    it('Contains correct elements and texts', () => {
        cy.get('[data-testid="home-logo"]').should('exist').should('be.visible');
        cy.get('[data-testid="home-title"]')
            .should('exist')
            .should('be.visible')
            .should('have.text', 'Search something you never thought you needed.');
        cy.get('[data-testid="home-register-btn"]').should('exist').contains('Create account');
        cy.get('[data-testid="home-login-btn"]').should('exist').contains('Login');
    });
    it('Navigation to register view and back works correctly', () => {
        cy.get('[data-testid="navbar"]').should('not.exist');
        cy.get('[data-testid="home-register-btn"]').click();

        cy.url().should('not.equal', 'http://localhost:5173/');
        cy.url().should('equal', 'http://localhost:5173/register');
        cy.get('[data-testid="navbar"]').should('exist').should('be.visible');
        cy.get('[data-testid="register-modal"]').should('exist').should('be.visible');
        cy.get('[data-testid="register-close-btn"]').should('exist').should('be.visible').click();

        cy.url().should('not.equal', 'http://localhost:5173/register');
        cy.url().should('equal', 'http://localhost:5173/');
        cy.get('[data-testid="register-modal"]').should('not.exist');
        cy.get('[data-testid="navbar"]').should('not.exist');
    });
    it('Navigation to login view and back works correctly', () => {
        cy.get('[data-testid="navbar"]').should('not.exist');
        cy.get('[data-testid="home-login-btn"]').click();

        cy.url().should('not.equal', 'http://localhost:5173/');
        cy.url().should('equal', 'http://localhost:5173/login');
        cy.get('[data-testid="navbar"]').should('exist').should('be.visible');
        cy.get('[data-testid="login-modal"]').should('exist').should('be.visible');
        cy.get('[data-testid="login-close-btn"]').should('exist').should('be.visible').click();

        cy.url().should('not.equal', 'http://localhost:5173/login');
        cy.url().should('equal', 'http://localhost:5173/');
        cy.get('[data-testid="login-modal"]').should('not.exist');
        cy.get('[data-testid="navbar"]').should('not.exist');
    });
});
