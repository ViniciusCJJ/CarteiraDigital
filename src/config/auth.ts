export const jwt_config = {
  secret: process.env.API_SECRET || 'default',
  expiresIn: '1d',
};

export const refreshToken_config = {
  expiresIn: (15 * 86400).toString(),
  prefix: 'session-token-',
};
