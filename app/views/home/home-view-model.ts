import { Observable } from '@nativescript/core';

export class HomeViewModel extends Observable {
    private _conversations: any[];
    private _friends: any[];

    constructor() {
        super();

        // Sample data
        this._conversations = [
            {
                id: 1,
                name: 'Sarah Wilson',
                avatar: 'https://i.pravatar.cc/150?img=1',
                lastMessage: 'See you tomorrow! 👋'
            },
            {
                id: 2,
                name: 'Mike Johnson',
                avatar: 'https://i.pravatar.cc/150?img=2',
                lastMessage: 'Thanks for the photos!'
            }
        ];

        this._friends = [
            {
                id: 1,
                name: 'Sarah Wilson',
                avatar: 'https://i.pravatar.cc/150?img=1'
            },
            {
                id: 2,
                name: 'Mike Johnson',
                avatar: 'https://i.pravatar.cc/150?img=2'
            },
            {
                id: 3,
                name: 'Emma Davis',
                avatar: 'https://i.pravatar.cc/150?img=3'
            }
        ];
    }

    get conversations() {
        return this._conversations;
    }

    get friends() {
        return this._friends;
    }

    onNewMessage() {
        // TODO: Implement new message functionality
        console.log('New message tapped');
    }

    onConversationTap(args: any) {
        // TODO: Navigate to conversation
        const conversation = this._conversations[args.index];
        console.log(`Tapped conversation with ${conversation.name}`);
    }
}