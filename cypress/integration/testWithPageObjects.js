import { datePickerPageObj } from "../support/page-objects/datePickerPage";
import { formLayoutsPageObj } from "../support/page-objects/formLayoutsPage";
import { smartTablePageObj } from "../support/page-objects/smartTablePage";
import { navigateTo } from "../support/page-objects/navigationPage";

describe('Test with Page objects', () => {

    const firstName = 'Yasmin'
    const mail = 'test@test.com'

    beforeEach('open application', () => {
        cy.openHomePage()
    })

    it('Verify navigations accross pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
        navigateTo.toastrPage()
    })

    it('should submit Inline Form and Basic form FormLayoutsPage', () => {

        navigateTo.formLayoutsPage()
        formLayoutsPageObj.submitInLineFormWithAndEmail(firstName, mail)
        formLayoutsPageObj.submitBasicFormWithEmailAndPassword(mail, 'pass')
    })

    it('should select date from date picker page', () => {

        navigateTo.datePickerPage()
        datePickerPageObj.selectCommonDatePickerFromToday(1)
        datePickerPageObj.selectDatePickerWithRangeFromToday(7, 14)
    })

    it('should test table functionality from smartTablePage', () => {

        navigateTo.smartTablePage()
        smartTablePageObj.addNewRecordWithFirstAndLastName(firstName, 'Ateya')
        smartTablePageObj.updateAgeByFirstName(firstName, '35')
        smartTablePageObj.deleteRowByIndex(1)
    })
})