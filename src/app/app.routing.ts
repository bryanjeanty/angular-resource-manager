import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './signin';
import { SignupComponent } from './signup';
import { ResourceComponent } from './resource';
import { ProjectComponent } from './project';
import { FormulaComponent } from './formula';
import { TemplateComponent } from './template';
import { ErrorComponent } from './error';

import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: 'signin' , component: SigninComponent },
    { path: 'signup' , component: SignupComponent },
    { path: 'resource' , component: ResourceComponent, canActivate: [AuthGuard] },
    { path: 'project' , component: ProjectComponent, canActivate: [AuthGuard] },
    { path: 'formula' , component: FormulaComponent, canActivate: [AuthGuard] },
    { path: 'template' , component: TemplateComponent, canActivate: [AuthGuard] },
    
    // no homepage -> redirect to signin page
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    // default to error page if route unknown
    { path: '**' , component: ErrorComponent }
]

export const appRoutingModule = RouterModule.forRoot(routes);