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
          inboxId,
          40000,
          true
        )
      )
      .then((email) => {
        expect(email.subject).to.contain("Nouveau mot de passe");
        cy.document().invoke("write", email.body);
      });
  });
});
