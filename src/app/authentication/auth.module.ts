import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { authComponent } from "./auth.component";
import { AuthResolver } from "./auth.resolver";

@NgModule({
    declarations :[authComponent],

    imports: [
        SharedModule,
        RouterModule.forChild([
            {path:'' , component:authComponent,resolve:[AuthResolver]}

        ])
    ]
})

export class AuthMoudle {

}