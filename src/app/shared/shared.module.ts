import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconGithubComponent } from "./icons/github-icon.component";
import { IconBallComponent } from "./icons/ball-icon.component";

@NgModule({
    imports: [ 
        CommonModule
    ],
    declarations: [
        IconGithubComponent,
        IconBallComponent
    ],
    providers: [
    ],
    exports: [
        IconGithubComponent,
        IconBallComponent
    ],
})

export class SharedCommonModule { }