import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import  { SpeechRecognition, SpeechRecognitionListeningOptionsAndroid, SpeechRecognitionListeningOptionsIOS} from "@ionic-native/speech-recognition";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   speechList: Array<string> = [];
   androidOptions: SpeechRecognitionListeningOptionsAndroid;
   iosOptions: SpeechRecognitionListeningOptionsIOS;
  constructor(private platform: Platform, private speech: SpeechRecognition, public navCtrl: NavController) {

  }
       listenForSpeech():void {
          this.androidOptions={
              prompt : 'Hello krgs how are you'

          };

          this.iosOptions={
            language: 'en-Us'

          };
          if(this.platform.is('android')){
            this.speech.startListening(this.androidOptions).subscribe(data => this.speechList= data, error => console.log(error));
            console.log("k", this.speechList);

          } else if(this.platform.is('ios')){
          this.speech.startListening(this.iosOptions).subscribe(data => this.speechList= data, error => console.log(error));

       }
      }


       async getSupportedLanguages():Promise<Array<string>>{
          try{
            const languages = await this.speech.getSupportedLanguages();
            console.log(languages);
            return languages;

          } catch(e){
            console.error(e);
          }
        }


      async hasPermission():Promise<boolean>{
        try{

          const permission = await this.speech.hasPermission();
          console.log(permission);
          return permission;

        } catch(e){
          console.error(e);
        }
      }

      async getPermission(): Promise<any>{
        try{
            const permission = await this.speech.requestPermission();
            console.log(permission);
            return permission;

        } catch(e){
           console.log(e);
        }
      }

      async  isSpeechSupported():Promise<any> {
        const isAvailable = await this.speech.isRecognitionAvailable();
        console.log(isAvailable);
        return isAvailable;
      }

}
