import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private http = inject(HttpClient);

  webhook =
  'http://localhost:5678/webhook/recipe-agent';

 sendMessage(message: string, imageFile?: File){

    const formData = new FormData();


    formData.append(
      'message',
      message
    );


    if(imageFile){

      formData.append(
        'image',
        imageFile
      );

    }


    return this.http.post<any>(

      this.webhook,

      formData

    );

  }

}