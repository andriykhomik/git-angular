import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersBlockComponent} from "./components/users-block/users-block.component";
import {UsersTableComponent} from "./components/users-table/users-table.component";
import {DetailsComponent} from "./components/details/details.component";

const routes: Routes = [
  {path: '', children: [
      {path: 'blocks', component: UsersBlockComponent},
      {path: 'table', component: UsersTableComponent},
      {path: 'details/:username', component: DetailsComponent},
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
