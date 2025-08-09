import {create} from 'zustand';
import {User} from '../../../domain/entities/user';
import {AuthStatus} from '../../../infrastructure/interfaces/auth.status';
import {
  authCheckStatus,
  authLogin,
  authRegister,
} from '../../../actions/auth/auth';
import {StorageAdapter} from '../../../config/api/adapters/storage-adapter';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<boolean>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (email, password) => {
    const response = await authLogin(email, password);
    if (!response) {
      set({status: 'unauthenticated', token: undefined, user: undefined});
      return false;
    }
    // Save token in storage
    await StorageAdapter.setItem('token', response.token);

    set({
      status: 'authenticated',
      token: response.token,
      user: response.user,
    });
    return true;
  },

  checkStatus: async () => {
    const resp = await authCheckStatus();
    if (!resp) {
      set({status: 'unauthenticated', token: undefined, user: undefined});
      return;
    }
    await StorageAdapter.setItem('token', resp.token);
    set({status: 'authenticated', token: resp.token, user: resp.user});
  },

  logout: async () => {
    await StorageAdapter.removeItem('token');
    set({status: 'unauthenticated', token: undefined, user: undefined});
  },

  register: async (email, password, fullName) => {
    const response = await authRegister(email, password, fullName);
    if (!response) {
      return false;
    }
    return true;
  },
}));
