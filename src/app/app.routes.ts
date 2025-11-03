import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio/inicio.component';
import { ContactoComponent } from './pages/contacto/contacto/contacto.component';
import { ProductoComponent } from './pages/producto/producto/producto.component';
import { NosotrosComponent } from './pages/nosotros/nosotros/nosotros.component';

export const routes: Routes = [

    {
        path: '',
        component: InicioComponent,
    },
    {
        path: 'servicios/:id',
        component: ProductoComponent,
    },
    {
        path: 'nosotros',
        component: NosotrosComponent,
    },
    {
        path: 'contacto',
        component: ContactoComponent,
    },
    {
        path: '**',
        redirectTo: '',
    },

];
