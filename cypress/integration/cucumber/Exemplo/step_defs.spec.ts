/// <reference types="Cypress" />
import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given(`entrei na página inicial`, () => {
    cy.visit('/');
});

Then(`devo ver {string} no título.`, (titulo) => {
    cy.title().should('eq', titulo);
});