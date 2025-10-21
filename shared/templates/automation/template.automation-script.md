# Template: Script de Automação E2E

<!-- 
  PROPÓSITO: Template para gerar scripts de automação E2E com Playwright
  USADO POR: maker.automation.md
  OUTPUT: vibes/automations/domain/[feature_id]/script.[nome].js
-->

**Criado**: 2025-01-17
**Versão**: 1.0.0

## Estrutura do Script

```javascript
import { test, expect } from '@playwright/test';
import { [FEATURE_NAME]Page } from './page-objects/[feature-name].page';
import { [HELPER_NAME] } from '../commons/helpers/[helper-name]';
import testData from './test.data.json';
import selectors from './selectors.json';
import environment from './environment.json';

test.describe('[FEATURE_NAME]', () => {
  let page;
  let [featureName]Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    [featureName]Page = new [FEATURE_NAME]Page(page);
    await page.goto(environment.baseUrl);
  });

  test('[SCENARIO_NAME]', async () => {
    // Arrange
    const testDataItem = testData.[scenarioName];
    
    // Act
    await [featureName]Page.[action1]();
    await [featureName]Page.[action2](testDataItem.[field1]);
    
    // Assert
    await expect(page.locator(selectors.[element])).toBeVisible();
    await expect(page.locator(selectors.[element2])).toHaveText(testDataItem.[expectedValue]);
  });

  test('[SCENARIO_NAME_WITH_ERROR]', async () => {
    // Arrange
    const testDataItem = testData.[scenarioWithError];
    
    // Act
    await [featureName]Page.[action1]();
    await [featureName]Page.[action2](testDataItem.[invalidField]);
    
    // Assert
    await expect(page.locator(selectors.[errorMessage])).toBeVisible();
    await expect(page.locator(selectors.[errorMessage])).toContainText(testDataItem.[expectedError]);
  });

  test.afterEach(async () => {
    await page.close();
  });
});
```

## Seções do Template

### 1. Imports e Configuração *(obrigatório)*

```javascript
import { test, expect } from '@playwright/test';
import { [FEATURE_NAME]Page } from './page-objects/[feature-name].page';
import { [HELPER_NAME] } from '../commons/helpers/[helper-name]';
import testData from './test.data.json';
import selectors from './selectors.json';
import environment from './environment.json';
```

**Orientação**:
- Importar test e expect do Playwright
- Importar Page Objects criados para a feature
- Importar Helpers necessários de commons
- Importar dados de teste, seletores e configuração

### 2. Test Suite Setup *(obrigatório)*

```javascript
test.describe('[FEATURE_NAME]', () => {
  let page;
  let [featureName]Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    [featureName]Page = new [FEATURE_NAME]Page(page);
    await page.goto(environment.baseUrl);
  });
```

**Orientação**:
- Criar describe block para agrupar testes relacionados
- Declarar variáveis de instância
- Configurar beforeEach para inicialização
- Navegar para URL base antes de cada teste

### 3. Test Case - Cenário Positivo *(obrigatório)*

```javascript
test('[SCENARIO_NAME]', async () => {
  // Arrange
  const testDataItem = testData.[scenarioName];
  
  // Act
  await [featureName]Page.[action1]();
  await [featureName]Page.[action2](testDataItem.[field1]);
  
  // Assert
  await expect(page.locator(selectors.[element])).toBeVisible();
  await expect(page.locator(selectors.[element2])).toHaveText(testDataItem.[expectedValue]);
});
```

**Orientação**:
- Usar padrão AAA (Arrange-Act-Assert)
- Arrange: Preparar dados de teste
- Act: Executar ações do fluxo
- Assert: Validar resultados esperados
- Usar Page Objects para ações
- Usar seletores centralizados
- Usar dados de teste parametrizados

### 4. Test Case - Cenário com Erro *(opcional - incluir se há casos de erro)*

```javascript
test('[SCENARIO_NAME_WITH_ERROR]', async () => {
  // Arrange
  const testDataItem = testData.[scenarioWithError];
  
  // Act
  await [featureName]Page.[action1]();
  await [featureName]Page.[action2](testDataItem.[invalidField]);
  
  // Assert
  await expect(page.locator(selectors.[errorMessage])).toBeVisible();
  await expect(page.locator(selectors.[errorMessage])).toContainText(testDataItem.[expectedError]);
});
```

**Orientação**:
- Testar casos de erro esperados
- Validar mensagens de erro
- Validar comportamento de validação
- Documentar erros esperados

### 5. Cleanup *(obrigatório)*

```javascript
test.afterEach(async () => {
  await page.close();
});
```

**Orientação**:
- Limpar estado após cada teste
- Fechar páginas abertas
- Resetar dados se necessário
- Limpar cookies/localStorage se aplicável

## Helpers e Utilitários *(opcional - incluir se há lógica reutilizável)*

```javascript
// Helper para aguardar elemento
async function waitForElement(page, selector, timeout = 5000) {
  await page.waitForSelector(selector, { timeout });
}

// Helper para fazer screenshot
async function takeScreenshot(page, name) {
  await page.screenshot({ path: `screenshots/${name}.png` });
}

// Helper para validar URL
async function validateUrl(page, expectedUrl) {
  await expect(page).toHaveURL(expectedUrl);
}
```

**Orientação**:
- Criar helpers para operações repetitivas
- Extrair lógica complexa em funções
- Documentar propósito de cada helper
- Reusar helpers em múltiplos testes

## Error Handling *(obrigatório)*

```javascript
test('[SCENARIO_NAME]', async () => {
  try {
    // Arrange
    const testDataItem = testData.[scenarioName];
    
    // Act
    await [featureName]Page.[action1]();
    
    // Assert
    await expect(page.locator(selectors.[element])).toBeVisible();
  } catch (error) {
    console.error('Erro durante execução do teste:', error);
    await page.screenshot({ path: 'error-screenshot.png' });
    throw error;
  }
});
```

**Orientação**:
- Usar try-catch para capturar erros
- Logar erros com contexto
- Tirar screenshot em caso de erro
- Re-throw para falhar o teste

## Logging e Debugging *(opcional - incluir se necessário)*

```javascript
test('[SCENARIO_NAME]', async () => {
  console.log('Iniciando teste: [SCENARIO_NAME]');
  
  // Arrange
  const testDataItem = testData.[scenarioName];
  console.log('Dados de teste:', testDataItem);
  
  // Act
  await [featureName]Page.[action1]();
  console.log('Ação 1 executada');
  
  // Assert
  await expect(page.locator(selectors.[element])).toBeVisible();
  console.log('Teste concluído com sucesso');
});
```

**Orientação**:
- Adicionar logs em pontos estratégicos
- Logar dados de teste
- Logar progresso de ações
- Facilitar debugging

## Checklist de Qualidade

Antes de considerar o script completo:

- [ ] Todos os imports necessários presentes
- [ ] Test suite configurado com beforeEach
- [ ] Cenários positivos implementados
- [ ] Cenários de erro implementados (se aplicável)
- [ ] Cleanup configurado com afterEach
- [ ] Error handling presente
- [ ] Logging adequado (se necessário)
- [ ] Helpers criados para lógica reutilizável
- [ ] Page Objects usados para abstrações
- [ ] Seletores centralizados (não hardcoded)
- [ ] Dados de teste parametrizados
- [ ] Padrão AAA seguido
- [ ] Assertions claras e específicas
- [ ] Timeouts configurados adequadamente
- [ ] Screenshots em caso de erro

