import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class ChatComponent {

  constructor(
    private chatService: ChatService,
      private cd: ChangeDetectorRef
  ) {}

  imageFile?: File;


  onFileSelected(event:any){

    this.imageFile = event.target.files[0];

  }

  loading = false;
  input = '';

  messages:any[] = [];

  send(){

  if(!this.input){
    return;
  }


  const text = this.input;


  this.messages.push({

    sender:'user',

    text:text

  });


  this.input='';

  this.loading=true;



this.chatService.sendMessage(
  text,
  this.imageFile
)
  .subscribe({

    next:(response)=>{

      console.log(response);

      this.messages.push({

        sender:'bot',

        text:response.response

      });


      this.loading=false;
      this.cd.detectChanges();


    },


    error:(err)=>{

  console.error("n8n Fehler:", err);

  this.messages.push({

    sender:'bot',

    text:'Fehler: ' + err.message

  });

  this.loading=false;

}


  });


}
}