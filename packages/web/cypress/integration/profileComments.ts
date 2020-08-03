describe("Commenting works", () => {
  it("Can write and post a comment", () => {
    cy.visit("http://localhost:3000/u/ivanrl/comments");

    cy.logInUser();

    cy.get('[data-testid="profile-comment-reply"]').first().click();
    cy.getEditor("[contenteditable]").typeInSlate(
      "This is a comment made by slate"
    );

    cy.get('[data-testid="text-editor-comment-button"').click();

    cy.get('[data-testid="flash-message-container"]').should("exist");
  });
});
