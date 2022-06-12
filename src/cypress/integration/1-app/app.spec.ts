/// <reference types="cypress" />

const TEST_LOCAL_STORAGE = {
  access_token: Cypress.env('accessToken'),
  name: Cypress.env('name'),
  isAuthenticated: true,
};

describe('Home', () => {
  const inputUserName = TEST_LOCAL_STORAGE.name;
  const inputTextValue = 'test';

  beforeEach(() => {
    for (let key in TEST_LOCAL_STORAGE) {
      window.localStorage.setItem(key, TEST_LOCAL_STORAGE[key]);
    }
  });

  it('1. Mypage HomeList > lastHomeId setting', () => {
    cy.visit('/my/home/list');
    if (!cy.get('[data-cy=myHomeList]').should('exist')) {
      cy.get('[data-cy=myHomeList] div').first().click();
    }
  });

  it('1-1. [add home] member', () => {
    cy.visit('/my/home/list');
    cy.get('[data-cy=floatingButton] button').first().click();

    cy.get('[data-cy=row] div button').eq(0).click();
    cy.get('[data-cy=search] button').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('내용을 입력해주세요.');
    });
    cy.get('[data-cy=memberList]').contains('검색 결과가 없어요');

    cy.get('[data-cy=search] input').type(inputUserName);
    cy.get('[data-cy=search] button').click();
    cy.get('[data-cy=memberList]').contains(inputUserName);
    cy.get('[data-cy=confirm]').click();

    cy.get('[data-cy=row]').eq(1).find('span').contains(inputUserName);
  });
  it('1-2. [add home] work', () => {
    cy.get('[data-cy=row] div button').eq(1).click();
    cy.get('[data-cy=registerModal] [data-cy=confirm]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('내용을 입력해주세요.');
    });

    cy.get('[data-cy=registerModal] #name').type(inputTextValue);
    cy.get('[data-cy=registerModal] [data-cy=confirm]').click();

    cy.get('[data-cy=row]').eq(2).find('span').contains(inputTextValue);
  });

  it('1-3. [add home] targetItem', () => {
    cy.get('[data-cy=row] div button').eq(2).click();
    cy.get('[data-cy=registerModal] [data-cy=confirm]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('내용을 입력해주세요.');
    });

    cy.get('[data-cy=registerModal] #name').type(inputTextValue);
    cy.get('[data-cy=registerModal] [data-cy=confirm]').click();

    cy.get('[data-cy=row]').eq(3).find('span').contains(inputTextValue);
  });

  it('1-4. [add home] save', () => {
    cy.get('[data-cy=confirmButtonBox] div button').eq(1).click();
  });

  it('2-1. add homeTask', () => {
    cy.wait(1000);
    cy.get('[data-cy=header] [data-cy=home]').click();
    cy.get('[data-cy=main] [data-cy=roundedRowButton]').eq(1).click();

    cy.get('[data-cy=row]').eq(0).find('div span').first().click();
    cy.get('[data-cy=row]').eq(1).find('div span').first().click();
    cy.get('[data-cy=row]').eq(2).find('div span').first().click();

    cy.get('[data-cy=confirmButtonBox] div button').eq(1).click();
  });

  it('2-2. delete homeTask', () => {
    cy.wait(1000);
    const day = new Date().getDate();
    cy.get('.calendar-table__item div').contains(day).click({ force: true });

    cy.wait(1000);
    cy.get('[data-cy=detail]').last().find('span').last().click();
  });
});

export {};
