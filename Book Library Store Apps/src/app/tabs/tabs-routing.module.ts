import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from '../tabs/tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: () => import('../search/search.module').then( m => m.SearchPageModule)
          }
        ]
      },
      {
        path: 'inbox',
        children: [
          {
            path: '',
            loadChildren: () => import('../inbox/inbox.module').then( m => m.InboxPageModule)
          }
        ]
      },
      {
        path: 'contact',
        children: [
          {
            path: '',
            loadChildren: () => import('../contact/contact.module').then( m => m.ContactPageModule)
          }
        ]
      },
      {
        path: 'setting',
        children: [
          {
            path: '',
            loadChildren: () => import('../setting/setting.module').then( m => m.SettingPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}