const { EMAIL_ADDRESS, EMAIL_NAME } = process.env;

interface IMailConfig {
  driver: 'ethereal' | 'ses' | 'sandinblue';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

const mailConfig = {
  defaults: {
    from: {
      email: EMAIL_ADDRESS || 'suporte@carteiradigital.io',
      name: EMAIL_NAME || 'Equipe Carteira Digital',
    },
  },
} as IMailConfig;

export { mailConfig };
