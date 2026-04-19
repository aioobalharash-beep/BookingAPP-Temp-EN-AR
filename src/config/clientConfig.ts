// --- THE BLUEPRINT ---
export interface ClientTheme {
  primary: string;
  secondary: string;
  background?: string;
}

export interface ClientAdmin {
  email: string;
  name: string;
}

export interface ClientSocial {
  whatsapp: string;
  instagram?: string;
}

export interface ClientConfig {
  chaletName: string;
  logoPath: string | null;
  theme: ClientTheme;
  admin: ClientAdmin;
  social: ClientSocial;
}

// --- AL MALAK CHALET DATA ---
export const CLIENT_CONFIG: ClientConfig = {
  chaletName: 'Al Malak Chalet',
  logoPath: '/assets/brand/logo.png',
  theme: {
    primary: '#2B3D8B',   // Deep Navy from Logo
    secondary: '#7089C4', // Soft Blue
    background: '#F5F3ED' // Cream Background
  },
  admin: {
    email: 'nooralmalak901@gmail.com',
    name: 'Al Malak Admin',
  },
  social: {
    whatsapp: '96871919666',
    instagram: 'https://www.instagram.com/almalak_chalet/',
  },
};

// --- THE ENGINES (FIXES ALL BUILD ERRORS) ---

// 1. Returns the data to the components
export const getClientConfig = (): ClientConfig => {
  return CLIENT_CONFIG;
};

// 2. Injects the colors into the website's CSS
export const applyTheme = (theme: ClientTheme) => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    if (theme.background) {
      root.style.setProperty('--background', theme.background);
    }
  }
};

export const FALLBACK_CLIENT_CONFIG = CLIENT_CONFIG;
