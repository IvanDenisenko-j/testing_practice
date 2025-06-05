describe('просмотр страницы с потребностями (с поиском и фильтром)', () => {


    it('просмотр страницы с потребностями (с поиском и фильтром)', () => {
        cy.viewport(1920, 1080)
        cy.log('Вход на страницу под аккаунтом работодателя')
        cy.visit('https://dev.profteam.su/login');
        cy.get('input[type="text"]').type('testerEmployer');
        cy.get('input[type="password"]').type('Password1');
        cy.get('#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button').click()

        cy.log('Переход во вкладку с потребностями для просмотра')
        cy.contains('#app > div.page > header:nth-child(1) > nav > a:nth-child(2) > span > div > svg').click({timeout: 1000})

        cy.log('Выбор типа занятости')
        cy.get('#app > div.page > div > section > div > div.needs-block__needs-filters-wrapper > div.needs-block__filters-wrapper > div > div.filters-block__filter-list > div.form-select.form-select--responsive > div > div')
            .click({timeout: 1000})
        cy.get('#app > div.page > div > section > div > div.needs-block__needs-filters-wrapper > div.needs-block__filters-wrapper > div > div.filters-block__filter-list > div.form-select.form-select--responsive > div > div.form-select__items > div:nth-child(4)')
            .click({timeout: 1000})

        cy.log('Выбор типа заработной платы')
        cy.get('#app > div.page > div > section > div > div.needs-block__needs-filters-wrapper > div.needs-block__filters-wrapper > div > div.filters-block__filter-list > div.salary-field > div:nth-child(3) > div:nth-child(2) > div > input')
            .click().type('50000')

        cy.log('Нажатие на кнопку "подробнее" ')
        cy.get('#app > div.page > div > section > div > div.needs-block__needs-filters-wrapper > div.infinite-loader.need-list > div:nth-child(1) > div.need-item__info-wrapper > div.need-item__footer-wrapper > div > div.need-footer__button-wrapper > button')
            .click({timeout: 1000})
    })
})


