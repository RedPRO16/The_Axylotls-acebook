describe("Timeline", () => {
  beforeEach(() => {
    cy.task("dropUsers");
    cy.task("dropPosts");

    // sign up + log in
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();
  });

  it("can submit posts, when signed in, and view them", () => {
    // submit a post
    cy.visit("/posts");
    cy.get('#message').invoke('attr', 'placeholder').should("contain", " Whats on your mind?")
    cy.get("#message").type("Hello, world!");
    cy.get("#submit").click();
    cy.get(".post__bottom").should("contain", "Hello, world!");
  });

  it("Unable to submit a blank post", () => {
    // submit a blank post
    cy.get("#submit").click();
    cy.get('#message').invoke('attr', 'placeholder').should("contain", " Please enter a message or add an image")
  });

  it("Displays the name of user on a post", () => {
    // submit post
    cy.visit("/posts");
    cy.get('#message').invoke('attr', 'placeholder').should("contain", " Whats on your mind?")
    cy.get("#message").type("Hello, world!");
    cy.get("#submit").click();

    cy.get("#post_name").should("contain", "someone")
  })
});
