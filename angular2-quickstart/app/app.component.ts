import { Component } from '@angular/core';

export class StarWarsCharacter {
    name: string;
    height: number;
}

@Component({
    selector: 'my-app',
    template: `
    <h1>Star Wars Character</h1>
    <h2>{{character.name}} Details:</h2>
    <p>Name: <input [(ngModel)]="character.name"></p>
    <p>Height: {{character.height}}</p>
    `
})
export class AppComponent {
    character: StarWarsCharacter = {
        name: 'C-3PO',
        height: 123
    }
}
