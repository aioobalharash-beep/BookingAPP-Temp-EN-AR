// --- THE BLUEPRINT (Don't change these) ---
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
    secondary: '#7089C4', // Soft Blue for UI depth
    background: '#F5F3ED' // Cream Background for a premium feel
  },
  admin: {
    email: 'nooralmalak901@gmail.com',
    name: 'Al Malak Admin', // You can update this to the owner's actual name later
  },
  social: {
    whatsapp: '96871919666', // Properly formatted for wa.me links
    instagram: 'https://www.instagram.com/almalak_chalet/',
  },
};

// Safety net for the app
export const FALLBACK_CLIENT_CONFIG = CLIENT_CONFIG;
