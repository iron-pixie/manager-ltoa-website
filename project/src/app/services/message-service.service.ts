import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { timeout } from 'q';
 
@Injectable()
export class MessageService {
    private subject;
 
    constructor(){
        this.subject=null;
    }

    sendMessage(type,message) {
        this.subject=[type,{ text: message }];
    }

    clearMessage() {
        this.subject = null;
    }
 
    getMessage(): Object {
        return this.subject;
    }
}
