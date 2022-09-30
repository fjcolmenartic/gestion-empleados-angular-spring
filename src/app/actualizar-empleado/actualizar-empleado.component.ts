import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-actualizar-empleado',
  templateUrl: './actualizar-empleado.component.html',
  styleUrls: ['./actualizar-empleado.component.css']
})
export class ActualizarEmpleadoComponent implements OnInit {

  id: number;
  empleado: Empleado;

  constructor(
    private empleadoServicio: EmpleadoService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.empleado = new Empleado();
    this.empleadoServicio.obtenerEmpleadoPorId(this.id)
      .subscribe(
        dato => {
          this.empleado = dato;
        }
      )
  }

  irALaListaDeEmpleados() {
    this.router.navigate(['/empleados']);
    swal('Empleado actualizado', `El emplado ${this.empleado.nombre} ha sido actualizado.`, 'success');
  }

  onSubmit() {
    this.empleadoServicio.actualizarEmpleado(this.id, this.empleado)
      .subscribe(
        dato => {
          this.irALaListaDeEmpleados();
        }
      )
    
  }

}
