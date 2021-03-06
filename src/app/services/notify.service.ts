import { Injectable } from '@angular/core';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor() { }

  showNetworkFailerAlert() {
    $.notify({
      message: "Please check your netwrok connection"
      },{
      type: 'danger',
      timer: 4000,
      placement: {
      from: 'top',
      align: 'right'
      }
      });
  }
  
operationPassed(message: string){
  $.notify({
    message: message ? message : "Operation completed successfully"
    },{
    type: 'success',
    timer: 4000,
    placement: {
    from: 'top',
    align: 'right'
    }
    });
  }
}
