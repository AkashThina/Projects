import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExploreComponent } from './components/explore/explore.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { TypingTestComponent } from './components/typing-test/typing-test.component';
import { QrCoderComponent } from './components/qr-coder/qr-coder.component';

export const routes: Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'explore',component:ExploreComponent},
    {path:'resume',component:ResumeComponent},
    {path:'projects',component:ProjectsComponent},
    {path:'calculator',component:CalculatorComponent},
    {path:'dynamicForm',component:DynamicFormComponent},
    {path:'chatboxai',component:ChatBoxComponent},
    {path:'typingtest',component:TypingTestComponent},
    {path:'qrgenerate',component:QrCoderComponent},
];
