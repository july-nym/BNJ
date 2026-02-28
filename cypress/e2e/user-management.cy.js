describe('User Management Page', () => {
    beforeEach(() => {
        cy.visit('/user-management'); // otomatis pakai baseUrl dari config

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

    it('Should load User Management page correctly', () => {
        it('Should open sidebar and show Admin menu', () => {
            // klik tombol yang membuka sidebar dulu
            cy.get('button')
                .first() // atau pilih tombol toggle sidebar yang benar
                .click();

            // tunggu animasi selesai
            cy.wait(500);

            // sekarang baru cek button admin muncul
            cy.contains('Target & Benchmark Management').should('be.visible');
        });
    });

    it('Should display Add New User button', () => {
        cy.contains('Add new user').should('be.visible').and('not.be.disabled');
    });

    it('Should display Search Input', () => {
        cy.get('input[placeholder="Search user name or email"]').should('be.visible');
    });

    it('Should display Table Headers', () => {
        cy.contains('Name').should('be.visible');
        cy.contains('Email').should('be.visible');
        cy.contains('Role').should('be.visible');
        cy.contains('Status').should('be.visible');
        cy.contains('Action').should('be.visible');
    });

    it('Should display Users in Table', () => {
        // cek minimal satu row muncul
        cy.get('tbody tr').should('have.length.greaterThan', 0);

        // cek salah satu user yang ada di table
        cy.contains('Melle').should('be.visible');
        cy.contains('Grace').should('be.visible');
    });

    it('Should show Edit and Delete buttons for each user', () => {
        cy.get('tbody tr').each(($row) => {
            cy.wrap($row).within(() => {
                cy.get('button[title="Edit"]').should('exist');
                cy.get('button[title="Delete"]').should('exist');
            });
        });
    });

    it('Should display Pagination Section', () => {
        cy.contains('Showing 1 to 10 of 22 users').should('exist');
    });
});
