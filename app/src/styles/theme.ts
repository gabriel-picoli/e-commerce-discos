const theme = {
  colors: {
    // base
    primary: '#d0ab6bff',
    primaryHover: '#b69259ff',

    white: '#FFFFFF',
    black: '#262323FF',

    // estados
    red: '#DC3545',
    redHover: '#C82333',

    green: '#28a745',
    greenHover: '#218838',

    yellow: '#ffc107',
    yellowHover: '#e0a800',

    // fundo e superficies
    background: '#F9F9F9', // fundo geral (app, paginas)
    surface: '#FFFFFF', // cartoes, modais, paineis
    border: '#E5E5E5', // linhas sutis

    // texto
    blackText: '#262323FF', // cor preta principal
    whiteText: '#FFFFFF', // cor branca principal

    textSecondary: '#d3d3d3ff', // texto secundario, descriçoes
    textDisabled: '#adb5bd' // campos desabilitados
  },

  // tipografia (escalas de tamanho/peso)
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: { size: '2.5rem', weight: 700, lineHeight: 1.2 },
    h2: { size: '2rem', weight: 600, lineHeight: 1.3 },
    h3: { size: '1.5rem', weight: 600, lineHeight: 1.4 },
    body: { size: '1rem', weight: 400, lineHeight: 1.5 },
    small: { size: '0.875rem', weight: 400, lineHeight: 1.4 }
  },

  // sombras (minimo para depth)
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.15)'
  },

  // bordas
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px'
  }
}

export default theme
