import { Observable } from '@nativescript/core';

export class AuthService extends Observable {
    private static instance: AuthService;
    private _currentUser: any = null;

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(email: string, password: string): Promise<boolean> {
        // TODO: Implement real authentication
        this._currentUser = {
            id: '1',
            email,
            name: 'Test User',
            avatar: 'https://i.pravatar.cc/150?img=4'
        };
        this.notifyPropertyChange('currentUser', this._currentUser);
        return true;
    }

    get currentUser() {
        return this._currentUser;
    }

    get isAuthenticated(): boolean {
        return !!this._currentUser;
    }
}