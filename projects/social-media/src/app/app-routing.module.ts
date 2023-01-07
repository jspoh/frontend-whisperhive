import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoggedInGuard } from './guards/user-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('./features/feed/feed.module').then((m) => m.FeedModule),
    canActivate: [UserLoggedInGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
