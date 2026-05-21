export const testUsers = {
  primary: {
    email: process.env.QA_USER_EMAIL || 'TODO-primary-user',
    password: process.env.QA_USER_PASSWORD || 'TODO-primary-password',
  },
  secondary: {
    email: process.env.SECONDARY_USER_EMAIL || 'TODO-secondary-user',
    password: process.env.SECONDARY_USER_PASSWORD || 'TODO-secondary-password',
  },
};
