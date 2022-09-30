import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  empleados: Empleado[] = [];

  constructor(
    private empleadoServicio: EmpleadoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerEmpleados();
  }
  
  private obtenerEmpleados() {
     this.empleadoServicio.obtenerListaDeEmpleados().subscribe(
      dato => {
        this.empleados = dato;
      });
  }

  actualizarEmpleado(id:number) {
    this.router.navigate(['actualizar-empleado', id]);
  }

  eliminarEmpleado(id:number) {
    swal({
      title: '¿Estás seguro?',
      text: 'Confirma si deseas eliminar el empleado',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-succes',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true
    }).then((result) => {
      if(result.value) {
        this.empleadoServicio.eliminarEmpleado(id).subscribe(
          dato => {
            console.log(dato);
            this.obtenerEmpleados();
            swal(
              'Empleado eliminado',
              'El empleado ha sido eliminado con éxito',
              'success')
          }
        )
      }        

    })

   
  }

  verDetallesEmpleado(id:number) {

    this.router.navigate(['empleado-detalle', id]);

  }

}
