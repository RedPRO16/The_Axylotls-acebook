describe("Profile page", () => {
  beforeEach(() => {
    cy.task("dropUsers");
    cy.task("dropPosts");
  });

  it("goes to profile page if user is logged in", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();
    cy.get("#logout").click();

    // sign in
    cy.visit("/");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    //profile
    cy.visit("/profile");

    cy.get(".title").should("contain", "Acebook");
    cy.get("p").should("contain", "someone");
  });

  it("returns to posts when link is clicked",()=>{
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#firstName").type("someone");
    cy.get("#submit").click();
    cy.visit("/profile");
    cy.get("a").contains("Back to posts").click()
    cy.url().should("include", "/posts");
  })

  it.only("Lists posts only by the user",()=>{
     // sign up
     cy.visit("/users/new");
     cy.get("#email").type("someone@example.com");
     cy.get("#password").type("password");
     cy.get("#firstName").type("someone");
     cy.get("#submit").click();

     // makes post from 1st user
    cy.get("#message").type("Hello, world!");
    cy.get("#submit").click();

    
    cy.visit("/profile");
    cy.contains("li", "Hello, world!");

    // logout
    cy.get("#logout").click();

    // sign up new user
    cy.visit("/users/new");
    cy.get("#email").type("someoneNEW@example.com");
    cy.get("#password").type("NEWpassword");
    cy.get("#firstName").type("NEWsomeone");
    cy.get("#submit").click();

    cy.get("#message").type("This is the message that should show");
    cy.get("#submit").click();

    cy.visit("/profile");
    cy.contains("li", "This is the message that should show");
    cy.get("li").should('not.contain', 'Hello, world!');
  })
});
