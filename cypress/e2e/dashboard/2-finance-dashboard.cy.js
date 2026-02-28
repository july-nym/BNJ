describe('BNJ Finance Dashboard - UI Automation', () => {
    beforeEach(() => {
        cy.visit('/finance'); // otomatis pakai baseUrl dari config

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

    it('Should load dashboard page successfully', () => {
        cy.contains('General Health (ICS)').should('be.visible');
        cy.contains('Current Financial Health').should('be.visible');
    });

    it('Should display correct General Health score', () => {
        cy.contains('General Health (ICS)')
            .closest('.bg-white')
            .within(() => {
                cy.contains('52').should('be.visible');
                cy.contains('Moderate').should('be.visible');
            });
    });

    it('Should display correct Financial Health score', () => {
        cy.contains('Current Financial Health')
            .parents('.bg-white')
            .first()
            .within(() => {
                cy.contains('56').should('be.visible');
                cy.contains('Moderate').should('be.visible');
            });
    });

    it('Should validate A/R & A/P Score Card', () => {
        cy.contains('A/R & A/P Score')
            .parent()
            .within(() => {
                cy.contains('80').should('be.visible');
                cy.contains('Healthy').should('be.visible');
            });
    });

    it('Should validate Profit/Loss Score Card', () => {
        cy.contains('Profit /Loss Score')
            .parent()
            .within(() => {
                cy.contains('30').should('be.visible');
                cy.contains('Moderate').should('be.visible');
            });
    });

    it('Should validate Cashflow Score Card', () => {
        cy.contains('Cashflow Score')
            .parent()
            .within(() => {
                cy.contains('57').should('be.visible');
                cy.contains('Moderate').should('be.visible');
            });
    });

    it('Should display Recent Activity list', () => {
        cy.contains('Recent Activity').scrollIntoView().should('be.visible');
    });

    it('Should display Task Requiring Actions section', () => {
        cy.contains('Task Requiring Actions').scrollIntoView().should('be.visible');
    });

    it('Should display Chat with AI button', () => {
        cy.contains('Chat with AI').should('exist');
    });

    it('Should hover score cards successfully', () => {
        cy.contains('A/R & A/P Score').parent().trigger('mouseover').should('have.css', 'border-color', 'rgb(0, 0, 0)');
    });
});
