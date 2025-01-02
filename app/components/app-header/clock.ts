import { Observable } from '@nativescript/core';

export class ClockViewModel extends Observable {
    private _time: string = '';
    private timer: number;

    constructor() {
        super();
        this.updateTime();
        this.startTimer();
    }

    get time(): string {
        return this._time;
    }

    private updateTime() {
        const now = new Date();
        this._time = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        this.notifyPropertyChange('time', this._time);
    }

    private startTimer() {
        this.timer = setInterval(() => {
            this.updateTime();
        }, 1000);
    }

    public dispose() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}