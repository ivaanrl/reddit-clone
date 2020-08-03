Cypress.Commands.add("getEditor", (selector) => {
  return cy.get(selector).first().click();
});

Cypress.Commands.add("typeInSlate", { prevSubject: true }, (subject, text) => {
  return cy.wrap(subject).then((subject) => {
    subject[0].dispatchEvent(
      new InputEvent("beforeinput", { inputType: "insertText", data: text })
    );
    return subject;
  });
});

Cypress.Commands.add("clearInSlate", { prevSubject: true }, (subject) => {
  return cy.wrap(subject).then((subject) => {
    subject[0].dispatchEvent(
      new InputEvent("beforeinput", { inputType: "deleteHardLineBackward" })
    );
    return subject;
  });
});

Cypress.Commands.add("logInUser", () => {
  cy.get(".signin-button.navbar-button").click();

  cy.get("#username").type("ivanrl");
  cy.get("#password").type("73442332Ivan");
  cy.get('[data-testid="signin-form-button"]').click();
});
