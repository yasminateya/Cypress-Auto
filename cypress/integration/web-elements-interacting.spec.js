/// <reference types="cypress" />

describe('Section 3: web elements', () => {

    beforeEach('before', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
    })

    //reference : Section 3: Interaction with Web Elements

    //         To get locators:
    // 1. Tag name >> cy.get('value')
    // 2. Id >> cy.get('#value')
    // 3. Class name >> cy.get('.value')
    // 4. Attribute name >> cy.get([value])
    // 5. Attribute name and value >> cy.get([value="value"])  
    // 6. Cypress >> cy.get('[data-cy=login-button]').click()

    // find() : to find child element inside the parent
    // parents() : to locate the parents elements from the current key element which you are in
    // then() : to save the contain value on new method .. it has jquery type
    // wrap() : If we want to return parameter back from jquery to cypress format
    // invoke() : if we want to get specific thing (text, attribute value ..)


    it('check then and wrap commands', () => {
        // we will travel from parent(label using grid "nb-card") to child (email label)
        // cy.contains('nb-card', 'Using the Grid') = get (nb-card) firstly which contains 'Using the Grid'
        // save the value of contains using then command inside the parameter "firstForm"
        // The parameter is jquery object not cypress object so you need to use expect not should, this find is jquery as well

        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).equal('Email')
            expect(passwordLabelFirst).equal('Password')

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).equal(passwordLabelSecond)

                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
            })
        })
    })

    it('check invoke command', () => {
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).equal('Email address')
        })

        // check if check box in Basic form if it is checked or not after clicking
        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            .should('contain', 'checked')
        // we are trying to invoke the value from attrubite with type class [class="custom-checkbox checked"]

    })

    it.only('assert property with invoke command', () => {
        // sometimes, you can't find the value on the elemnts so check the properties tab
        // we need to get the date value 
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            // select the locator (parent) for the whole calendar not a specific date
            cy.get('nb-calendar-day-picker').contains('4').click()
            // search on properties for the selected date
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Jan 4, 2022')
        })
            
        
        
            
         




    })

})
