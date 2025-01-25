import type {} from 'cypress';
import type {} from '../support/cypress';
import {TEST_URL} from "../const";

describe('Ingredient Modal', () => {
    beforeEach(() => {
        cy.visit(TEST_URL);
    });

    it('should open modal on ingredient click and close it with close button and outside click', () => {
        cy.get('[data-testId="ingredient-item"]').first().click();

        cy.get('[data-testId="modal"]').as('modal').should('be.visible');

        cy.get('[data-testId="close-button"]').click();

        cy.get('@modal').should('not.exist');

        cy.get('[data-testId="ingredient-item"]').first().click();
        cy.get('@modal').should('be.visible');

        cy.get('[data-testId="modal-overlay"]').click({ force: true });

        cy.get('@modal').should('not.exist');
    });
});