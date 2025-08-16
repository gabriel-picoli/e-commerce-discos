module.exports = {
  parser: '@typescript-eslint/parser', // parser do ts
  parserOptions: {
    ecmaVersion: 'latest', // permite a  sintaxe moderna do ECMAScript
    sourceType: 'module', // permite usar import/export
    ecmaFeatures: {
      jsx: true // habilita suporte a jsx
    }
  },
  settings: {
    react: {
      version: 'detect' // detecta versao do react de forma automatica
    }
  },
  env: {
    browser: true, // roda no navegador
    es2021: true, // suporte ao ES2021
    node: true // permite variaveis globais do node
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended', // regras recomendadas do eslint
    'plugin:react/recommended', // regras recomendadas do react
    'plugin:react-hooks/recommended', // regras para hooks
    'plugin:@typescript-eslint/recommended', // regras typescript
    'plugin:prettier/recommended' // integra eslint + prettier
  ],
  rules: {
    // configs do prettier (override)
    'prettier/prettier': [
      'error',
      {
        semi: false, // remove ; no final das linhas
        singleQuote: true, // usa aspas simples em vez de duplas
        printWidth: 100, // quebra de linha quando passar de 100 colunas
        tabWidth: 2, // identação com 2 espaços
        trailingComma: 'none', // remove virgula no último item em objetos/arrays
        endOfLine: 'auto' // ajusta automaticamente para o sistema operacional
      }
    ],

    // regra do react 17+ (nao precisa importar react em cada arquivo jsx)
    'react/react-in-jsx-scope': 'off'
  }
}
