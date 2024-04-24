import { Routes } from '@angular/router';
import { VlanIndexComponent } from './pages/vlans/vlan-index/vlan-index.component';
import { ArchitectureIndexComponent } from './pages/architecture/architecture-index/architecture-index.component';
import { SwitchCreateComponent } from './pages/switches/switch-create/switch-create.component';
import { SwitchIndexComponent } from './pages/switches/switch-index/switch-index.component';
import { SwitchVlansComponent } from './pages/switches/switch-vlans/switch-vlans.component';
import { SwitchPortsComponent } from './pages/switches/switch-ports/switch-ports.component';
import { SwitchConfigComponent } from './pages/switches/switch-config/switch-config.component';
import { SwitchBackupComponent } from './pages/switches/switch-backup/switch-backup.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', title: 'Home', component: HomeComponent },
  { path: 'vlans', title: 'VLANs', component: VlanIndexComponent },
  {
    path: 'architecture',
    title: 'Architecture',
    component: ArchitectureIndexComponent,
  },
  {
    path: 'switches/create',
    title: 'Switches - create',
    component: SwitchCreateComponent,
  },
  {
    path: 'switches/:id',
    title: 'Switch',
    component: SwitchIndexComponent,
    children: [
      {
        path: 'vlans',
        title: 'Switch',
        component: SwitchVlansComponent,
      },
      {
        path: 'ports',
        title: 'Switch',
        component: SwitchPortsComponent,
      },
      {
        path: 'config',
        title: 'Switch',
        component: SwitchConfigComponent,
      },
      {
        path: 'backup',
        title: 'Switch',
        component: SwitchBackupComponent,
      },
    ],
  },
];
