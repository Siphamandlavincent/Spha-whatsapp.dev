import { Observable } from '@nativescript/core';
import { AuthService } from './auth.service';

export class MessageService extends Observable {
    private static instance: MessageService;
    private messages: Map<string, any[]> = new Map();

    static getInstance(): MessageService {
        if (!MessageService.instance) {
            MessageService.instance = new MessageService();
        }
        return MessageService.instance;
    }

    getMessages(conversationId: string): any[] {
        return this.messages.get(conversationId) || [];
    }

    sendMessage(conversationId: string, content: string, type: 'text' | 'image' | 'video' = 'text') {
        const messages = this.getMessages(conversationId);
        const currentUser = AuthService.getInstance().currentUser;
        
        messages.push({
            id: Date.now().toString(),
            senderId: currentUser.id,
            content,
            type,
            timestamp: new Date()
        });
        
        this.messages.set(conversationId, messages);
        this.notifyPropertyChange('messages', messages);
        return messages;
    }
}