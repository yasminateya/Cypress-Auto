export class SmartTablePage{

    addNewRecordWithFirstAndLastName(firstName, lastName){
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
    }
    
    updateAgeByFirstName(name, age){
        cy.get('tbody').contains('tr', name).then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        })
    }

    deleteRowByIndex(index){
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').eq(index).find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
    }
}

export const smartTablePageObj = new SmartTablePage()