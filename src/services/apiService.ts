import { UserProfile } from '../types';
import { StorageService } from './storageService';

const TOKEN_KEY = 'byteread_auth_token';
const API_BASE_URL = '/api';

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    token: string;
    user: UserProfile;
  };
}

export const apiService = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Helper for requests with fallback
  async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> || {})
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
      });

      const json = await response.json();
      return json;
    } catch (err) {
      console.warn(`[API] Server unreachable on ${endpoint}, activating local fallback:`, err);
      return null;
    }
  },

  // 1. REGISTER
  async register(name: string, email: string, password: string, username?: string): Promise<AuthResponse> {
    const serverResult = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, username })
    });

    if (serverResult) {
      if (serverResult.success && serverResult.data?.token) {
        this.setToken(serverResult.data.token);
      }
      return serverResult;
    }

    // Local Fallback
    const fallbackUser: UserProfile = {
      ...StorageService.loadUserProfile(),
      id: `user-${Date.now()}`,
      name,
      username: username || `@${email.split('@')[0]}`,
      xp: 0,
      level: 1,
      levelTitle: 'Level 1: Page Novice 📖',
      totalMinutesRead: 0,
      totalHoursSaved: 0,
      completedBookIds: [],
      inProgressBookIds: [],
      bookmarkedBookIds: [],
      savedQuotes: []
    };

    this.setToken(`local-token-${Date.now()}`);
    StorageService.saveUserProfile(fallbackUser);

    return {
      success: true,
      message: 'Pendaftaran akun berhasil (Mode Lokal)',
      data: {
        token: `local-token-${Date.now()}`,
        user: fallbackUser
      }
    };
  },

  // 2. LOGIN
  async login(email: string, password: string): Promise<AuthResponse> {
    const serverResult = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (serverResult) {
      if (serverResult.success && serverResult.data?.token) {
        this.setToken(serverResult.data.token);
      }
      return serverResult;
    }

    // Local Fallback
    const localUser = StorageService.loadUserProfile();
    this.setToken(`local-token-${Date.now()}`);
    return {
      success: true,
      message: 'Login berhasil (Mode Lokal)',
      data: {
        token: `local-token-${Date.now()}`,
        user: localUser
      }
    };
  },

  // 3. DEMO LOGIN (1-Click Instant)
  async demoLogin(): Promise<AuthResponse> {
    const serverResult = await this.request('/auth/demo-login', {
      method: 'POST'
    });

    if (serverResult) {
      if (serverResult.success && serverResult.data?.token) {
        this.setToken(serverResult.data.token);
      }
      return serverResult;
    }

    // Local Fallback
    const demoUser = StorageService.loadUserProfile();
    this.setToken('local-demo-token');
    return {
      success: true,
      message: 'Login demo berhasil!',
      data: {
        token: 'local-demo-token',
        user: demoUser
      }
    };
  },

  // 4. GET CURRENT PROFILE
  async getMe(): Promise<UserProfile | null> {
    if (!this.getToken()) return null;

    const serverResult = await this.request('/auth/me');
    if (serverResult && serverResult.success && serverResult.data?.user) {
      return serverResult.data.user;
    }

    return StorageService.loadUserProfile();
  },

  // 5. SYNC USER PROFILE
  async syncUserProfile(user: UserProfile): Promise<void> {
    StorageService.saveUserProfile(user);

    if (this.getToken()) {
      await this.request('/user/sync', {
        method: 'PUT',
        body: JSON.stringify(user)
      });
    }
  },

  // 6. LOGOUT
  logout(): void {
    this.removeToken();
  }
};
