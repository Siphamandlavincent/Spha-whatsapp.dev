import { Observable } from '@nativescript/core';
import { MessageService } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';
import * as imagepicker from '@nativescript/imagepicker';

export class ChatViewModel extends Observable {
    private messageService: MessageService;
    private authService: AuthService;
    private _conversation: any;
    private _messages: any[];
    private _messageText: string = '';

    constructor(conversation: any) {
        super();
        this.messageService = MessageService.getInstance();
        this.authService = AuthService.getInstance();
        this._conversation = conversation;
        this._messages = this.messageService.getMessages(conversation.id);
    }

    get conversation() {
        return this._conversation;
    }

    get messages() {
        return this._messages;
    }

    get messageText() {
        return this._messageText;
    }

    set messageText(value: string) {
        if (this._messageText !== value) {
            this._messageText = value;
            this.notifyPropertyChange('messageText', value);
        }
    }

    get currentUser() {
        return this.authService.currentUser;
    }

    onSendMessage() {
        if (!this.messageText.trim()) return;
        
        this._messages = this.messageService.sendMessage(
            this.conversation.id,
            this.messageText,
            'text'
        );
        this.messageText = '';
        this.notifyPropertyChange('messages', this._messages);
    }

    async onCameraPress() {
        const context = imagepicker.create({
            mode: 'single'
        });

        try {
            const selection = await context.present();
            if (selection.length > 0) {
                const imageAsset = selection[0];
                // TODO: Upload image and get URL
                this._messages = this.messageService.sendMessage(
                    this.conversation.id,
                    imageAsset.android || imageAsset.ios,
                    'image'
                );
                this.notifyPropertyChange('messages', this._messages);
            }
        } catch (error) {
            console.error('Error selecting image:', error);
        }
    }

    onAttachPress() {
        // TODO: Implement file attachment
        console.log('Attach pressed');
    }
}