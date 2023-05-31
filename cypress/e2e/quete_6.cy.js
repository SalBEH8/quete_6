import "cypress-mailslurp";

describe("Back Market Registration and Authentication", () => {
  it("reset", () => {
    cy.visit("https://preprod.backmarket.fr/fr-fr/password-reset");

    cy.get('[data-qa="accept-cta"]').click();

    cy.get("#email").type("a1af4ea5-e3cd-4593-8f9b-fc72ac9de902@mailslurp.com");

    cy.get('[data-test="password-reset-submit-button"]').click();

    cy.mailslurp()
      .then((mailslurp) =>
        mailslurp.waitForLatestEmail(
          "a1af4ea5-e3cd-4593-8f9b-fc72ac9de902",
          40000,
          true
        )
      )
      .then((email) => {
        expect(email.subject).to.contain("Nouveau mot de passe");

        cy.document().invoke("write", email.body);
        cy.get(".t_pt20px > a").click();
        cy.get("#newPassword").type("HeLLoSal21@");
        cy.get("#newPasswordConfirmation").type("HeLLoSal21@");
        cy.get("._1xMx-RYw").click();
        cy.get("#email").type(
          "a1af4ea5-e3cd-4593-8f9b-fc72ac9de902@mailslurp.com"
        );
        cy.get("#submit-login").click();
        cy.get("#password").type("HeLLoSal21@");
        cy.get("#submit-login").click();
      });
  });
});
