export class NavigationPage {

    formLayoutsPage() {
        clickOnPageIfCollapsed('Form')
        cy.contains('Form Layouts').click()
    }

    datePickerPage() {
        clickOnPageIfCollapsed('Form')
        cy.contains('Datepicker').click()
    }

    toastrPage() {
        clickOnPageIfCollapsed('Modal & Overlays')
        cy.contains('Toastr').click()
    }

    tooltipPage() {
        clickOnPageIfCollapsed('Modal & Overlays')
        cy.contains('Tooltip').click()
    }

    smartTablePage() {
        clickOnPageIfCollapsed('Tables & Data')
        cy.contains('Smart Table').click()
    }

}

//this method for checking if the main page is collapsed so it will click on it
function clickOnPageIfCollapsed(mainPage) {
    cy.contains('a', mainPage).then(mainMenu => {
        cy.wrap(mainMenu).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
            if (attr.includes('left')) {
                cy.wrap(mainMenu).click()
            }
        })
    })
}

export const navigateTo = new NavigationPage()