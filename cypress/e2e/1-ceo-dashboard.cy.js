// cypress/e2e/login_inject_token.cy.js
describe("SPA Dev Login with Token", () => {
  beforeEach(() => {
    cy.visit("/ceo-dashboard"); // otomatis pakai baseUrl dari config

    cy.origin("https://login.microsoftonline.com", () => {
      cy.get('input[type="email"]').type(Cypress.env("loginEmail"));

      cy.get('input[type="submit"]').click();

      cy.get('input[type="password"]').type(Cypress.env("loginPassword"), {
        log: false,
      }); // hide password

      cy.get('input[type="submit"]').click();
      cy.get('input[type="submit"]').click();
    });
  });

  it("should redirect to CEO Dashboard after login", () => {
    cy.location("pathname").should("eq", "/ceo-dashboard");
  });

  it("Should load dashboard successfully", () => {
    cy.contains("General Health").should("be.visible");
    cy.contains("Moderate").should("be.visible");
  });

  it("Should display top navigation logo", () => {
    cy.get('img[alt="Benjamin & Joseph"]').should("be.visible");
  });

  it("Should display General Health score", () => {
    cy.contains("/100").should("be.visible");
    cy.contains("52").should("exist");
  });

  it("Should display Current Operation Health card", () => {
    cy.contains("Current Operation Health").should("be.visible");

    cy.contains("53").should("be.visible");

    cy.contains("Moderate").should("exist");
  });

  it("Should display Current Financial Health card", () => {
    cy.contains("Current Financial Health").should("be.visible");

    cy.contains("56").should("be.visible");
  });

  it("Should display YoY Health card", () => {
    cy.contains("YoY Health").should("be.visible");

    cy.contains("52").should("exist");
  });

  it("Should display Performance to Target section", () => {
    cy.contains("Performance to Target Score").should("be.visible");

    cy.contains("Revenue").should("be.visible");

    cy.contains("SGD").should("exist");
  });

  it("Should display Recharts graph", () => {
    cy.get("svg.recharts-surface").should("exist").and("be.visible");
  });

  it("Should display Recent Activity section", () => {
    cy.contains("Recent Activity").scrollIntoView().should("be.visible");

    cy.contains("Health Score Alerts Updated").should("exist");
  });

  it("Should display Task Requiring Actions section", () => {
    cy.contains("Task Requiring Actions", { timeout: 10000 })
      .scrollIntoView()
      .should("be.visible");

    cy.contains("Inventory Shortage Projected").should("exist");
  });

  it("Should display Chat with AI floating button", () => {
    cy.contains("Chat with AI").should("exist");
  });
});
