import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { PblNgridRegistryService } from '@pebula/ngrid';
import { SharedModule, ExampleGroupRegistryService, PublicExampleGroupRegistryServiceId } from '@pebula/apps/ngrid/shared';
import { FeaturesHomePageComponent } from './components';

const TABLE_EXAMPLES = [
  FeaturesHomePageComponent,
];

const ROUTES = [
  { path: '', loadChildren: () => import('./modules/table-demo/table-table-demo.module').then(m => m.TableTableDemoModule) },
  { path: '', loadChildren: () => import('./modules/column-features/column-features-demo.module').then(m => m.ColumnFeaturesDemoModule) },
  { path: '', loadChildren: () => import('./modules/plugins-demo/table-plugins-demo.module').then(m => m.TablePluginsDemoModule) },
  { path: '', loadChildren: () => import('./modules/sticky-plugin-demo/table-sticky-plugin-demo.module').then(m => m.TableStickyPluginDemoModule) },
];

@NgModule({
  declarations: TABLE_EXAMPLES,
  imports: [
    RouterModule.forChild([
      { path: '', component: FeaturesHomePageComponent, children: ROUTES },
    ]),
    SharedModule,
  ],
  providers: [
    PblNgridRegistryService,
    { provide: PublicExampleGroupRegistryServiceId, useValue: 'ngrid-features' },
    ExampleGroupRegistryService
  ],
})
export class FeaturesModule {
  constructor(registry: ExampleGroupRegistryService) {
    registry.registerGroup({ id: 'columns', title: 'Columns' });
    registry.registerGroup({ id: 'table', title: 'Table' });
    registry.registerGroup({ id: 'plugins', title: 'Plugins' });
  }
}

declare module '@pebula/apps/ngrid/shared/src/lib/example-group/example-group-registry.service' {
  interface ExampleGroupMap {
    columns: ExampleGroupMetadata;
    datasource: ExampleGroupMetadata;
    table: ExampleGroupMetadata;
    plugins: ExampleGroupMetadata;
  }
}
