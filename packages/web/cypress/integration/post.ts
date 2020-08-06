describe("Profile post link work", () => {
  beforeEach(() => {
    cy.visit("https://dev.mylocalsite.com:3000");

    cy.logInUser();
  });

  describe("redirects to full page post", () => {
    it("redirects clicking on date", () => {
      cy.get('[data-testid="post-date-nav-fullpost"]').first().click();

      cy.url().should("include", "/post/");
    });

    it("redirects clicking on title", () => {
      cy.get('[data-testid="post-title-nav-fullpost"]').first().click();

      cy.url().should("include", "/post/");
    });

    it("redirects clicking on comment count", () => {
      cy.get('[data-testid="post-bottombar-comment-nav-fullpost"]')
        .first()
        .click();

      cy.url().should("include", "/post/");
    });
  });
});
