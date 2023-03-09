import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { query } from '@angular/animations';

@Component({
  selector: 'app-historial-cliente',
  templateUrl: './historial-cliente.component.html',
  styleUrls: ['./historial-cliente.component.css']
})
export class HistorialClienteComponent implements OnInit {
  dataTable:any = [];
  dataTable2:any = [];
  control = new FormControl();
  result = this.control;
  valueToSearch: string = "";
  public clientes: Array<any> = [];
  public _historial: Array<any> = [];
  constructor(
    private apiService: ApiService,
    private modal: NgbModal,
  ){  }

  event(){
    this.apiService.allClientes,
    this.apiService.allHistorial
  }

  ngOnInit(): void {
      this.ObserverChangeSearch();
      this.ObserverChangeSearch2();
  }

  openFullscreen(content){
    this.modal.open(content, { fullscreen:true });
  }

  ObserverChangeSearch2(){
    this.control.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(query=> {
        console.log(query);
        this.apiService.searchClientedetail(query).subscribe(
          (res: any) =>{
            this.clientes = res;
          },
          (object) => {
            console.log(object)
          }
        )
      });
  }

  ObserverChangeSearch(){
    this.control.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(query => {
        console.log(query);
        this.apiService.searchHistorialFactura(query).subscribe(
          (res: any) => {
            this._historial = res;
          },
          (object) => {
            console.log(object)
          }
        )
      });
  }

  onDataTable(){
    this.apiService.getHistorial().subscribe(res => {
      this.dataTable = res;
      console.log(res)
    })
  }

  onDataTable2(){
    this.apiService.getClientes().subscribe(res => {
      this.dataTable2 = res;
      console.log(res)
    })
  }

}
