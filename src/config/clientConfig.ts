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

export const CLIENT_CONFIG: ClientConfig = {
  chaletName: 'Al Malak Chalet',
  logoPath: '/assets/brand/logo.png',
  theme: {
    primary: '#2B3D8B',
    secondary: '#7089C4',
    background: '#F5F3ED',
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

export const getClientConfig = (): ClientConfig => CLIENT_CONFIG;

export const whatsappHref = (number: string): string => {
  const digits = (number || '').replace(/\D/g, '');
  return `https://wa.me/${digits}`;
};

export const applyTheme = (theme: ClientTheme): void => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--secondary', theme.secondary);
  if (theme.background) {
    root.style.setProperty('--background', theme.background);
  }
};

export const FALLBACK_CLIENT_CONFIG: ClientConfig = CLIENT_CONFIG;
