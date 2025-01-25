import type {} from 'cypress';
import type {} from '../support/cypress';

describe('Ingredient Drag and Drop', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
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