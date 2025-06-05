describe('Рабочее пространство потребности', () => {
    beforeEach(() => {
        cy.loginAsEmployer();
        cy.createWorkspace();
        cy.visit('/workspace/1');
    });

    it('Просмотр рабочего пространства', () => {
        cy.contains('Рабочее пространство').should('be.visible');
        cy.contains('Статус: Открыт').should('be.visible');
        cy.get('[data-testid="comment-list"]').should('exist');
    });

    it('Добавление комментария', () => {
        cy.get('[data-testid="comment-input"]').type('Тестовый комментарий');
        cy.get('[data-testid="send-comment"]').click();

        cy.contains('Тестовый комментарий').should('be.visible');
        cy.contains('Комментарий добавлен').should('be.visible');
    });

    it('Добавление комментария с вложением', () => {
        cy.get('[data-testid="comment-input"]').type('Комментарий с файлом');
        cy.get('[data-testid="file-upload"]').attachFile('test-file.pdf');
        cy.get('[data-testid="send-comment"]').click();

        cy.contains('Комментарий с файлом').should('be.visible');
        cy.get('[data-testid="attachment"]').should('exist');
    });

    it('Негативный сценарий: пустой комментарий', () => {
        cy.get('[data-testid="send-comment"]').click();
        cy.contains('Комментарий не может быть пустым').should('be.visible');
    });

    it('Изменение статуса рабочего пространства на "Потребность выполнена"', () => {
        cy.get('[data-testid="status-select"]').select('completed');
        cy.contains('Статус изменен на "Потребность выполнена"').should('be.visible');
        cy.contains('Статус: Потребность выполнена').should('be.visible');
    });

    it('Изменение статуса рабочего пространства на "Потребность не выполнена"', () => {
        cy.get('[data-testid="status-select"]').select('not_completed');
        cy.contains('Статус изменен на "Потребность не выполнена"').should('be.visible');
        cy.contains('Статус: Потребность не выполнена').should('be.visible');
    });

    it('Блокировка студента в рабочем пространстве', () => {
        cy.get('[data-testid="student-list"]').first().find('[data-testid="block-button"]').click();
        cy.contains('Студент заблокирован').should('be.visible');
        cy.get('[data-testid="student-status"]').should('contain', 'Заблокирован');
    });

    it('Негативный сценарий: добавление комментария в заблокированном пространстве', () => {
        cy.changeWorkspaceStatus('completed');
        cy.get('[data-testid="comment-input"]').should('be.disabled');
    });
});