describe('Target & Benchmark Page', () => {
    beforeEach(() => {
        cy.visit('/target-benchmark'); // otomatis pakai baseUrl dari config

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

    it('Should load Target & Benchmark page correctly', () => {
        cy.contains('Target & Benchmark').should('be.visible');
        cy.contains('Manage the yearly budget').should('be.visible');
    });

    it('Should display Year selector', () => {
        cy.contains('Year').should('be.visible');
        cy.contains('2026').should('be.visible');
    });

    it('Should display Quarter Tabs', () => {
        cy.contains('Q1').should('be.visible');
        cy.contains('Q2').should('be.visible');
        cy.contains('Q3').should('be.visible');
        cy.contains('Q4').should('be.visible');
    });

    it('Should show Quarterly Target Warning Box', () => {
        cy.contains('Quarterly Target Window').scrollIntoView().should('be.visible');

        cy.contains('The targets cannot be created/modified').should('be.visible');
    });

    it('Should display Upload Section (Disabled)', () => {
        cy.contains('Drop your files here').scrollIntoView().should('be.visible');

        cy.get('input[type="file"]').should('be.disabled');
    });

    it('Should display Target Period Section', () => {
        cy.contains('Target Period').scrollIntoView().should('be.visible');

        cy.contains('Fiscal Year').should('be.visible');
        cy.contains('Quarter Start Date').should('be.visible');
    });

    it('Should display Financial Targets Section', () => {
        cy.contains('Financial Targets').scrollIntoView().should('be.visible');

        cy.contains('Revenue Target').should('be.visible');
        cy.contains('Profit').should('be.visible');
        cy.contains('Operating Cashflow').should('be.visible');
    });

    it('Should display Working Capital Targets', () => {
        cy.contains('Working Capital Targets').scrollIntoView().should('be.visible');

        cy.contains('A/R').should('be.visible');
        cy.contains('A/P').should('be.visible');
    });

    it('Should display Inventory Risk Threshold Section', () => {
        cy.contains('Inventory Risk Threshold').scrollIntoView().should('be.visible');

        cy.contains('Min. Inventory Turnover Rate').should('be.visible');
        cy.contains('Max. Inventory Turnover Rate').should('be.visible');
    });

    it('Should display Patient Experience Section', () => {
        cy.contains('Patient Experience').scrollIntoView().should('be.visible');

        cy.contains('Min. Patient Satisfaction Score').should('be.visible');
    });

    it('Should display Action Buttons', () => {
        cy.contains('Cancel').scrollIntoView().should('be.visible');

        cy.contains('Save & Replace Data').should('be.visible');
    });

    it('Should display Audit Log Section', () => {
        cy.contains('Last edited').scrollIntoView().should('be.visible');

        cy.contains('See audit log').should('be.visible');
    });
});
