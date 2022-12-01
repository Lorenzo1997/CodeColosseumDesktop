import { WebSocketSubject } from 'rxjs/webSocket';
import { Packets } from './packets';
//import { isText, isBinary, getEncoding } from 'istextorbinary'

export namespace CoCoSockets{
  /*
  export class CoCoSocket{
    public url: string;
    public ws?:WebSocketSubject<string>;
    public resultError?:(error:string)=>void;
    public resultClosed?:()=>void;
    
    constructor(url:string){
      this.url = url;
    }
  
    public connect():boolean{
  
      if (!this.ws || this.ws.closed ){
        this.ws = new WebSocketSubject(this.url);
      }
      
      this.ws.subscribe({
        error: (err) => { // Called whenever there is a message from the server.
          let errorMsg = JSON.stringify(err);
          if (this.resultError) {this.resultError(errorMsg );}
        },
        complete: () => {
          if (this.resultClosed) {this.resultClosed();}
        }
      });
      
      return !this.ws.closed;
    }
    
    public send<T extends Packets.Reply.Message>(
      request:Packets.Request.Message, 
      reply: new ()=>T, 
      recieved?:(message:T)=>void){
      
      if (this.ws == null) {return false}
      
      this.ws.subscribe({
        next: (payload) => { // Called whenever there is a message from the server.
          let msg = new reply();
          let success = msg.fromPacket(payload);
          if (success && recieved){ recieved(msg); }
        } 
      });
  
  
      let packet = request.toPacket();
      this.ws.next(packet);
  
      return this.ws;
    }
  }
  */
  
  export class CoCoSocket{
    public url = 'ws://localhost:8088';
    public ws?:WebSocketSubject<MessageEvent<any>>;
    public resultError?:(error:string)=>void;
    public resultClosed?:()=>void;
    
    //public recieved?: (payload: string, msgClasses: Array<string>) => void;
    public msgClasses = Array<string>();
    
    constructor(url:string){
      this.url = url;
    }
  
    public connect():boolean{
  
      if (!this.ws || this.ws.closed ){
        this.ws = new WebSocketSubject(
          {
            url: this.url,
            binaryType: "arraybuffer",
            deserializer: msg => msg,
          });
      }
      
      this.ws.subscribe({
        error: (err) => { // Called whenever there is a message from the server.
          let errorMsg = JSON.stringify(err);
          if (this.resultError) {this.resultError(errorMsg );}
        },
        complete: () => {
          if (this.resultClosed) {this.resultClosed();}
        }
      });
      
      return !this.ws.closed;
    }
    
    public send<T extends Packets.Message>(
      request: Packets.Request.Message, 
      recieved?:(payload: string, msgClasses: Array<string>) => void,
      //recievedBinary?:(payload: string) => void,
      ...msgClasses: Array<string>){
        
      if (this.ws == null) {return false} 
  
      this.ws.subscribe({
        next: (payload) => { // Called whenever there is a message from the server.
          console.log(typeof payload.data);
          
          if(typeof payload.data === "object") {
            var enc = new TextDecoder("utf-8");
            console.log(enc.decode(payload.data));
            //if(recievedBinary){recievedBinary( enc.decode(payload.data)); }
          } else {
            if (recieved){ recieved(payload.data, msgClasses); }
          }
        } 
      });
  
      let packet = request.toPacket();
      this.ws.next(packet);
  
      return this.ws;
    }
  }
}