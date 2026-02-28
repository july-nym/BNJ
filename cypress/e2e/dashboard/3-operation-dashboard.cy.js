describe('BNJ Operation Dashboard - UI Automation', () => {
    beforeEach(() => {
        cy.visit('/claims'); // otomatis pakai baseUrl dari config

        cy.origin('https://login.microsoftonline.com', () => {
            cy.get('input[type="email"]').type(Cypress.env('loginEmail'));

            cy.get('input[type="submit"]').click();

            cy.get('input[type="password"]').type(Cypress.env('loginPassword'), {
                log: false,
            }); // hide password

            cy.get('input[type="submit"]').click();
            cy.get('input[type="submit"]').click();
        });
    });

    it('Should display General Health section correctly', () => {
        cy.contains('General Health (ICS)').should('be.visible');

        cy.contains('52').should('be.visible');

        cy.contains('Moderate').should('exist');
    });

    it('Should display Current Operation Health section correctly', () => {
        cy.contains('Current Operation Health').should('be.visible');

        cy.contains('53').should('be.visible');
    });

    it('Should display all score cards correctly', () => {
        cy.contains('Claims Score').should('be.visible');

        cy.contains('99').should('be.visible');

        cy.contains('Patient Score').should('be.visible');

        cy.contains('40').should('be.visible');

        cy.contains('Inventory Score').should('be.visible');

        cy.contains('20').should('be.visible');
    });

    it('Should display Recent Activity section', () => {
        cy.contains('Recent Activity').scrollIntoView().should('be.visible');

        cy.contains('Health Score Alerts Updated').should('exist');
    });

    it('Should display Task Requiring Actions section', () => {
        cy.contains('Task Requiring Actions').scrollIntoView().should('be.visible');

        cy.contains('Inventory Shortage Projected').should('exist');

        cy.contains('Cashflow Shortage Detected').should('exist');
    });

    it('Should have only one Chat with AI button visible', () => {
        cy.contains('Chat with AI').should('exist');
    });
});
