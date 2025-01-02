import { Observable, Frame } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';

export class LoginViewModel extends Observable {
    private authService: AuthService;
    private _email: string = '';
    private _password: string = '';

    constructor() {
        super();
        this.authService = AuthService.getInstance();
    }

    get email() {
        return this._email;
    }

    set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notifyPropertyChange('email', value);
        }
    }

    get password() {
        return this._password;
    }

    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChange('password', value);
        }
    }

    async onLogin() {
        if (!this.email || !this.password) return;

        try {
            const success = await this.authService.login(this.email, this.password);
            if (success) {
                Frame.topmost().navigate({
                    moduleName: 'views/home/home-page',
                    clearHistory: true
                });
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    }
}