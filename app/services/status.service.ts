import { Observable } from '@nativescript/core';

export class StatusService extends Observable {
    private static instance: StatusService;
    private userStatus: Map<string, { isOnline: boolean; lastSeen: Date }> = new Map();

    static getInstance(): StatusService {
        if (!StatusService.instance) {
            StatusService.instance = new StatusService();
        }
        return StatusService.instance;
    }

    updateUserStatus(userId: string, isOnline: boolean) {
        this.userStatus.set(userId, {
            isOnline,
            lastSeen: new Date()
        });
        this.notifyPropertyChange('userStatus', this.userStatus);
    }

    getUserStatus(userId: string) {
        return this.userStatus.get(userId) || { isOnline: false, lastSeen: new Date() };
    }
}