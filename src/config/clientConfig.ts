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
    primary: '#2B3D8B',   
    secondary: '#7089C4', 
    background: '#F5F3ED' 
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

// --- THE MISSING LINK (FIXES THE BUILD ERROR) ---
export const getClientConfig = (): ClientConfig => {
  return CLIENT_CONFIG;
};

export const FALLBACK_CLIENT_CONFIG = CLIENT_CONFIG;
