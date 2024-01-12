export class TestingClass {
    static login(email: string, password: string) {
        cy.visit('http://localhost:5173/login');
        cy.get('[data-testid="login-form"]').find('input[type=email]').type(`${email}`);
        cy.get('[data-testid="login-form"]').find('input[type=password]').type(`${password}`);
        cy.get('[data-testid="login-form"]').find('input[type=submit]').click();
    }
}
