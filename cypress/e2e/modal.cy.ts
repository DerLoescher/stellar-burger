import type {} from 'cypress';
import type {} from '../support/cypress';

describe('Ingredient Modal', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
    });

    it('should open modal on ingredient click and close it with close button and outside click', () => {
        cy.get('[data-testId="ingredient-item"]').first().click();

        cy.get('[data-testId="modal"]').should('be.visible');

        cy.get('[data-testId="close-button"]').click();

        cy.get('[data-testId="modal"]').should('not.exist');

        cy.get('[data-testId="ingredient-item"]').first().click();
        cy.get('[data-testId="modal"]').should('be.visible');

        cy.get('[data-testId="modal-overlay"]').click({ force: true });

        cy.get('[data-testId="modal"]').should('not.exist');
    });
});