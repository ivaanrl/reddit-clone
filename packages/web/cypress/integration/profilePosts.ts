describe("Profile posts work", () => {
  it("can load user posts", () => {
    cy.visit("https://dev.mylocalsite.com:3000/u/ivanrl/posts");

    cy.logInUser();
  });
});
