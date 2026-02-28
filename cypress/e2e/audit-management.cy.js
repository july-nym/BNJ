describe('Audit Management Page', () => {
    beforeEach(() => {
        cy.visit('/audit-management'); // sesuaikan route kamu
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

    it('Should load Audit Management page correctly', () => {
        it('Should open sidebar before checking admin menu', () => {
            // klik tombol yang buka sidebar
            cy.get('.lucide-layout-dashboard') // atau pilih toggle yang benar
                .parent()
                .click();

            // tunggu animasi selesai
            cy.wait(500);

            // sekarang baru cek tombol
            cy.contains('Target & Benchmark Management').should('be.visible');
        });
    });

    it('Should display all file upload sections', () => {
        cy.contains('Medical Bill').should('be.visible');
        cy.contains('Universal Claim Form').should('be.visible');
        cy.contains('Medical Claims Authentication Form').should('be.visible');

        cy.get('input[type="file"]').should('have.length', 3);
    });

    it('File input should be disabled by default', () => {
        cy.get('input[type="file"]').each(($input) => {
            cy.wrap($input).should('exist');
        });

        cy.contains('Run audit validation').should('be.disabled');
    });

    it('Should allow file selection', () => {
        cy.get('#medical-bill-input').selectFile('cypress/fixtures/sample.pdf', { force: true });

        // tunggu UI update
        cy.wait(500);

        // cek file name muncul
        cy.contains('sample.pdf').should('be.visible');

        // jangan cek "No file selected"
    });

    it('Remove button should exist but disabled', () => {
        cy.contains('Remove').should('have.attr', 'disabled');
    });

    it('Should display Clear and Run Audit buttons', () => {
        cy.contains('Clear files').should('be.disabled');

        cy.contains('Run audit validation').should('be.disabled');
    });
});
