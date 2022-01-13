describe("Tickets", () => {
    beforeEach(() => cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html'));


    it("Fills all the text input fields", () => {
        const firstName = "Gabriel";
        const lastName = "Silva";

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("gabrielmartinsdasilva0@gmail.com")
        cy.get("#requests").type("Carnivoro")
        cy.get("#signature").type(`${firstName} ${lastName}`)
    });

    it("Select two tickets", () => {
        cy.get("#ticket-quantity").select("2");
    })

    it("Select 'vip' ticket type", () => {
        cy.get("#vip").check();
    });

    it("Select the social media checkbox", () => {
        cy.get("#social-media").check();
    });
    it("Select 'friend and publication', than uncheck 'friend' ", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    });

    it("has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX")
    });

    it("alerts one invalid email", () => {
        cy.get("#email")
            .as("email")
            .type("talkingabouttesting-gmail.com");

        cy.get("#email.invalid").should("exist");


        cy.get("@email")
            .clear()
            .type("talkingabouttesting@gmail.com")

        cy.get("#email.invalid").should("not.exist");
    })


    it("Fill and reset the forms", () => {
        const firstName = "Gabriel";
        const lastName = "Silva";
        const fullName = `${firstName} ${lastName}`;

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("gabrielmartinsdasilva0@gmail.com")
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("Cerveja API");

        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets`
        )

        cy.get("#agree").click();
        cy.get("#signature").type(fullName);

        cy.get("button[type='submit']")

        cy.get("button[type='reset']").click();

    });

    it("Fills mandatory fields using support command", () => {
        const custumer = {
            firstName: "Joao",
            lastName: "Souza",
            email: "js@gmail.com"
        };
        cy.fillMandatoryFields(custumer);

        cy.get("button[type='submit']")

        cy.get("button[type='reset']").click();
    });


});

/*
describe('Google Search', () => {
    it('loads search page', () => {
      cy.visit('https://www.google.com');
    });
  
    it('searches for `Colega`', () => {
      cy.get('input[name="q"]').type('Zezerino{enter}');
    });
    });*/
