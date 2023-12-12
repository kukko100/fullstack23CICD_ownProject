/* eslint-disable no-undef */
describe('Anecdotes', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Anecdotes')
    cy.contains('create new')
  })
})

describe('AnecdoteForm', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })
  
  it('notification of a new anecdote created, even if server can not be reached', function () {
    cy.get('input[name="content"]').type('New Anecdote')
    cy.get('#createButton').click()
    cy.contains('you created a new anecdoteNew Anecdote').should('be.visible')
  })
})


