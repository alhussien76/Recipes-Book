import { CommonModule } from "@angular/common";

import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdwon.directive";
import { LoadingSpinnersComponent } from "./loading-spinners/loading-spinners.component";
import { Placeholder } from "./placeholder.directive";


@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnersComponent,
        DropdownDirective,
        Placeholder
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ],
    exports: [
        AlertComponent,
        LoadingSpinnersComponent,
        DropdownDirective,
        Placeholder,
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
    ]

})
export class SharedModule {

}