/// <reference types="cypress" />

describe('Section 3: web elements', () => {

    //reference : Section 3: Interaction with Web Elements


    /********************** 10. Types of locators ***********************/
    //        To get locators:
    // 1. Tag name >> cy.get('value')
    // 2. Id >> cy.get('#value')
    // 3. Class name >> cy.get('.value')
    // 4. Attribute name >> cy.get([value])
    // 5. Attribute name and value >> cy.get([value="value"])  
    // 6. Cypress >> cy.get('[data-cy=login-button]').click()

    // find() : to find child element inside the parent
    // parents() : to locate the parents elements from the current key element which you are in
    // then() : to save the contain value on new method .. it has jquery type
    // wrap() : to return parameter back from jquery to cypress format
    // invoke() : to get specific thing (text, attribute value ..)
    // check() : to deal with check boxes and radio buttons
    // select() : if I <select> tag but here I don't have it

    /********************** 12. Saving subject of the command ***********************/
    it('1. check then and wrap commands', () => {

        cy.openFormLayoutsPage()
        // i will travel from parent(label using grid "nb-card") to child (email label)
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

    /********************** 13. Invoke command ***********************/
    it('2. check invoke command', () => {

        cy.openFormLayoutsPage()

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
        // i am trying to invoke the value from attrubite with type class [class="custom-checkbox checked"]

    })

    /********************** 17. Web Datepickers ***********************/
    // in test 3 I used hard code date so I will use Date interface to select date depend on the current date
    it('3. assert property with invoke command', () => {

        cy.openDatePickerPage()
        // sometimes, you can't find the value on the elemnts so check the properties tab
        // i need to get the date value 

        //get current date and month (short month DEC with toLocaleDateString())
        let date = new Date()
        date.setDate(date.getDate() + 1)
        let nextDate = date.getDate()
        console.log(nextDate)
        let currentMonth = date.toLocaleDateString('default', { month: 'short' })

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()

            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(actualDate => {
                if (!actualDate.includes(currentMonth)) {
                    cy.get('[data-name="chevron-right"]').click()
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(nextDate).click()
                } else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(nextDate).click()
                }
            })

            // // select the locator (parent) for the whole calendar not a specific date
            // cy.get('nb-calendar-day-picker').contains('4').click()
            // // search on properties for the selected date
            // cy.wrap(input).invoke('prop', 'value').should('contain', 'Jan 4, 2022')
        })
    })

    /********************** 14. Checkboxes and Radio buutons ***********************/
    it('4. assert first radio button selected then select second one and check first is unselected', () => {

        cy.openFormLayoutsPage()

        // get all radio buttons with the same attribute [type="radio"]
        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons)
                .first()
                .check({ force: true })
                .should('be.checked')

            cy.wrap(radioButtons)
                .eq(1)
                .check({ force: true })

            cy.wrap(radioButtons)
                .first() // first() = eq(0)
                .should('not.be.checked')

            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled')
        })

    })

    it('5. test checkboxes in Toastr page', () => {
        cy.openToastrPage()
        // i have index 0, 2 checked by defult
        // check method will check all checkboxes with the same attribute.. if there is one already checked it will not uncheck it
        // if you want to uncheck just replace check() with click() or uncheck()
        cy.get('[type="checkbox"]').eq(0).should('be.checked')
        cy.get('[type="checkbox"]').eq(0).uncheck({ force: true }).should('not.be.checked')

        // check the second checkbox
        cy.get('[type="checkbox"]').eq(1).check({ force: true }).should('be.checked')

    })

    /********************** 15. Lists and Dropdowns ***********************/
    it('6. check dark mode is applied correctly after selecting it', () => {
        cy.visit('/')
        /****************** way 1 ****************/
        // // click on modes - i have parent tag "nav" and child tag "nb-select" so i can add them together
        // cy.get('nav nb-select').click()
        // // use locator for the whole dropdowns
        // cy.get('.options-list').contains('Dark').click()

        // // i need to check the background, it is css value or attr, you can find it on the Styles
        // // color in the styles with HEX format and Cypress accepts RGP sp just change it
        // //you can find '.nb-theme-dark nb-layout-header nav' so select header+ tag name 'nb-layout-header nav'
        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        // check the mode button has dark color as well
        // cy.get('nav nb-select').contains('Dark')

        /****************** way 2 ****************/

        // if i want to select each mode and assert that is selected correctly, it will be hassle to repeat our code manytimes so use then() to create variable and loop through the dropdown
        cy.get('nav nb-select').then(modeButton => {
            cy.wrap(modeButton).click()
            // class + tag name for all list
            cy.get('.options-list nb-option').each((itemList, index) => {
                const modeItemText = itemList.text().trim()

                //create json object
                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }
                cy.wrap(itemList).click()
                cy.wrap(modeButton).should('contain', modeItemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[modeItemText])

                if (index < 3) {
                    //close the list to loop again
                    cy.wrap(modeButton).click()
                }
            })

        })
    })

    /********************** 16. Web Tables ***********************/
    // 1. table body"tbody" >> 2. table row "tr" >> 3. table coloumn "td"
    it('7. check age of Larry is saved correctly after editing', () => {
        // scenario 1: i need to find row of Larry then edit his age
        const newAge = '25'
        cy.openSmartTablePage()
        cy.get('tbody').contains('tr', 'Larry').then(larryRow => {
            cy.wrap(larryRow).find('.nb-edit').click()
            cy.wrap(larryRow).find('[placeholder="Age"]').clear().type(newAge)
            cy.wrap(larryRow).find('.nb-checkmark').click()
            cy.wrap(larryRow).find('td').eq(6).should('contain', newAge)
        })


    })

    // scenario 2: i need to add new entry
    it('8. check data is added correctly after adding new row', () => {
        const firstName = 'Yasmin'
        const lastName = 'Ateya'
        cy.openSmartTablePage()
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(newRow => {
            cy.wrap(newRow).find('[placeholder="First Name"]').type(firstName)
            cy.wrap(newRow).find('[placeholder="Last Name"]').type(lastName)
            cy.wrap(newRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then(newRowSaved => {
            cy.wrap(newRowSaved).eq(2).should('contain', firstName)
            cy.wrap(newRowSaved).eq(3).should('contain', lastName)
        })
    })


    // scenario 3: search for 20 in age field and check it is retuned all rows with 20
    it('9. check data is returned correctly after searching for specific age', () => {
        const age = ['20', '30', '40']

        cy.wrap(age).each(age => {
            cy.openSmartTablePage()
            cy.get('thead tr').eq(1).find('[placeholder="Age"]').type(age)
            cy.wait(500)
            cy.get('tbody tr').each(eachRow => {
                cy.wrap(eachRow).find('td').eq(6).should('contain', age)
            })
        })

    })

    /********************** 18. PopUps and Tooltips ***********************/
    it('9. check text of tooltip is correct', () => {
        cy.openTooltipPage()
        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click()

        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    //there are 2 types of dialogues: 1. browser (alert ) dialog  2. normal dialog
    it.only('10. check text of browser dialog is correct', () => {
        cy.openSmartTablePage()
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
    })

})






