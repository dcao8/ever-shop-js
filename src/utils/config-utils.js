require('dotenv').config({
    path: `env/.env.${process.env.TEST_ENV ?? 'local'}`
});

export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
export const APP_URL = `${HOST}:${PORT}`;
export const EMAIL_ADMIN = process.env.EMAIL_ADMIN;
export const PASSWORD_ADMIN = process.env.PASSWORD_ADMIN;
export const LOGIN_PATH = '/admin/login';
export const NEW_CATEGORY_PATH = '/admin/categories/new';
export const PRODUCT_PATH = '/admin/products';