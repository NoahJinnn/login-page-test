import { ActorRefFrom, createMachine } from 'xstate';

export const LOGIN_EVENT = 'LOGIN';
export const LOGIN_EVENT_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_EVENT_ERROR = 'LOGIN_ERROR';
export const VERIFY_EVENT = 'VERIFY';
export const LOGOUT_EVENT = 'LOGOUT';

export const AUTH_AUTHENTICATED_MS = 'authenticated';
export const AUTH_UNAUTHENTICATED_MS = 'unauthenticated';
export const AUTH_LOADING_MS = 'loading';
export const VERIFY_MS = 'verify';

export const authMachine = createMachine(
  {
    id: 'authentication',
    initial: 'unauthenticated',
    context: {
      userData: null,
      errorMessage: null,
    },
    states: {
      [AUTH_UNAUTHENTICATED_MS]: {
        on: {
          [LOGIN_EVENT]: AUTH_LOADING_MS,
          [VERIFY_EVENT]: {
            target: VERIFY_MS,
            actions: ['onSuccess'],
          },
        },
      },
      [AUTH_LOADING_MS]: {
        on: {
          [LOGIN_EVENT_SUCCESS]: AUTH_AUTHENTICATED_MS,
          [LOGIN_EVENT_ERROR]: {
            target: AUTH_UNAUTHENTICATED_MS,
            actions: ['onError'],
          },
        },
      },
      [AUTH_AUTHENTICATED_MS]: {
        on: {
          [LOGOUT_EVENT]: AUTH_UNAUTHENTICATED_MS,
        },
      },
      [VERIFY_MS]: {
        on: {
          [LOGOUT_EVENT]: AUTH_UNAUTHENTICATED_MS,
        },
      },
    },
  },
  {
    actions: {
      onSuccess: (context, event) => {
        context.userData = event.userData;
      },
      onError: (context, event) => {
        context.errorMessage = event.errorMessage;
      },
    },
  }
);

export type AuthService = ActorRefFrom<typeof authMachine>;
