https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/6655748#questions/10803252

@Component({
    templateUrl: './servers.component.html' // or whatever, versus:
    template: <app-server></app-server> <app-server></app-server>
})

Can also use `` for multi-line
template: `
<app-server>
<more-stuff>
</app-server>
`

Templates must be present, otherwise no Component

Can do styles: [`
h3: blue;
`]

With selector, not limited by element. Can also do: '[app-servers]`
 Selectors here seem to mean handles by which other components can reference the 
 component with the given selector. So, app.component.html can reference the app-servers
 component using a div with "app-servers" attribute.
 can access by class using '.app-servers'

Can pass class attribute myBool = true
then in string interpolation, use to conditionally render text: {{ myBool ? 'isTrue' : 'isFalse'}}