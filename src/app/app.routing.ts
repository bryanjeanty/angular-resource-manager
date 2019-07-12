import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './signin';
import { SignupComponent } from './signup';
import { ResourceComponent } from './resource';
import { ProjectComponent } from './project';
import { FormulaComponent } from './formula';
import { TemplateComponent } from './template';
import { ErrorComponent } from './error'

const routes: Routes = [
    { path: 'signin' , component: SigninComponent },
    { path: 'signup' , component: SignupComponent },
    { path: 'resource' , component: ResourceComponent },
    { path: 'project' , component: ProjectComponent },
    { path: 'formula' , component: FormulaComponent },
    { path: 'template' , component: TemplateComponent },
    
    // no homepage -> redirect to signin page
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    // default to error page if route unknown
    { path: '**' , component: ErrorComponent }
]

export const appRoutingModule = RouterModule.forRoot(routes);