import type {} from 'cypress';
import type {} from '../support/cypress';
import {TEST_URL} from "../const";

describe('Ingredient Drag and Drop', () => {
    beforeEach(() => {
        cy.visit(TEST_URL);
    });

    it('should drag and drop ingredient into the constructor', () => {
        cy.get('[data-testId="ingredient-item"]').first().as('ingredient');

        cy.get('@ingredient').should('be.visible');

        cy.get('@ingredient')
            .trigger('dragstart');

        cy.get('[data-testId="burger-constructor"]').trigger('drop');

        cy.get('[data-testId="burger-constructor"]')
            .children()
            .should('have.length.greaterThan', 0);
    });
});