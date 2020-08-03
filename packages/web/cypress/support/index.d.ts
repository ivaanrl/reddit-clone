declare namespace Cypress {
  interface Chainable {
    getEditor(selector: string): Chainable<Element>;
    typeInSlate(text: string): Chainable<Element>;
    logInUser(): Chainable<Element>;
  }
}
