const theme = {
  colors: {
    // brand
    primary: '#d0ab6bff',
    primaryHover: '#b69259ff',

    // estados
    red: '#DC3545',
    redHover: '#C82333',

    green: '#28a745',
    greenHover: '#218838',

    yellow: '#ffc107',
    yellowHover: '#e0a800',

    // escala neutra (fundo, bordas, textos)
    neutral_50: '#F9F9F9', // fundo geral (app, páginas)
    neutral_100: '#F4F4F4', // superfícies claras
    neutral_200: '#E5E5E5', // bordas, divisores
    neutral_300: '#D3D3D3', // texto secundário claro
    neutral_400: '#ADB5BD', // texto desabilitado
    neutral_500: '#6C757D', // texto secundário
    neutral_900: '#262323', // texto/preto principal

    // utilitárias
    white: '#FFFFFF',
    black: '#000000'
  },

  // tipografia
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: { size: '2.5rem', weight: 700, lineHeight: 1.2 },
    h2: { size: '2rem', weight: 600, lineHeight: 1.3 },
    h3: { size: '1.5rem', weight: 600, lineHeight: 1.4 },
    body: { size: '1rem', weight: 400, lineHeight: 1.5 },
    small: { size: '0.875rem', weight: 400, lineHeight: 1.4 }
  },

  // sombras
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
