import { authMachine } from './authMachine';
import { createModel } from '@xstate/test';
import { createMachine, Machine } from 'xstate';
import {
  act,
  cleanup,
  fireEvent,
  queryByText,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import Login from '../pages/login';
import supabase from '../libs/supabase';

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

describe('Login', () => {
  const loginMachine = createMachine({
    id: 'login',
    initial: 'blank',
    states: {
      blank: {
        on: {
          LOGIN: 'login',
        },
        meta: {
          test: ({ getByText }) => {
            expect(getByText("Let's go!")).not.toBeNull();
          },
        },
      },
      login: {
        meta: {
          test: ({ queryByText }) => {
            expect(queryByText("Let's go!")).not.toBeInTheDocument();
          },
        },
      },
    },
  });
  const loginModel = createModel(loginMachine).withEvents({
    LOGIN: ({ getByText, getByPlaceholderText }) => {
      const emailInput = getByPlaceholderText('Your email address');
      fireEvent.change(emailInput, { target: { value: 'tcdnguyen1997@gmail.com' } });
      fireEvent.click(getByText("Let's go!"));
    },
  });
  const testPlans = loginModel.getSimplePathPlans();
  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      afterEach(cleanup);
      plan.paths.forEach((path) => {
        it(path.description, () => {
          const rendered = render(<Login />);
          return path.test(rendered);
        });
      });
    });
  });

  it('coverage', () => {
    loginModel.testCoverage();
  });
});
