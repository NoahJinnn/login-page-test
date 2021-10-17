import { authMachine } from './authMachine';
import { createModel } from '@xstate/test';

describe('Test auth state transition', () => {
  test('Should reach "loading" given "unauthenticated" when the "LOGIN" event occurs', () => {
    const expectedValue = 'loading';
    const actualState = authMachine.transition('unauthenticated', { type: 'LOGIN' });

    expect(actualState.matches(expectedValue)).toBeTruthy();
  });
  test('Should reach "verify" given "unauthenticated" when the "VERIFY" event occurs', () => {
    const expectedValue = 'verify';
    const actualState = authMachine.transition('unauthenticated', { type: 'VERIFY' });

    expect(actualState.matches(expectedValue)).toBeTruthy();
  });
  test('Should reach "authenticated" given "loading" when the "LOGIN_SUCCESS" event occurs', () => {
    const expectedValue = 'authenticated';
    const actualState = authMachine.transition('loading', { type: 'LOGIN_SUCCESS' });

    expect(actualState.matches(expectedValue)).toBeTruthy();
  });
  test('Should reach "unauthenticated" given "loading" when the "LOGIN_ERROR" event occurs', () => {
    const expectedValue = 'unauthenticated';
    const actualState = authMachine.transition('loading', { type: 'LOGIN_ERROR' });

    expect(actualState.matches(expectedValue)).toBeTruthy();
  });
  test('Should reach "unauthenticated" given "authenticated" when the "LOGOUT" event occurs', () => {
    const expectedValue = 'unauthenticated';
    const actualState = authMachine.transition('authenticated', { type: 'LOGOUT' });

    expect(actualState.matches(expectedValue)).toBeTruthy();
  });
  test('Should reach "unauthenticated" given "verify" when the "LOGOUT" event occurs', () => {
    const expectedValue = 'unauthenticated';
    const actualState = authMachine.transition('verify', { type: 'LOGOUT' });

    expect(actualState.matches(expectedValue)).toBeTruthy();
  });
});

const authModel = createModel(authMachine);
