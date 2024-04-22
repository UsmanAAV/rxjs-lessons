import { Observable, debounceTime, distinctUntilChanged, fromEvent, map } from "rxjs";

const search$ = new Observable<Event>(observer => {
    const searchInput = document.getElementById('search');

    if (!searchInput) {
        return observer.error('Element does not exist on the page')
    }

    searchInput?.addEventListener('input', (event) =>  {
        // @ts-ignore
        observer.next(event);
    })
});

const searchFromEvent$ = fromEvent<Event>(
    document.getElementById('search')!,
    'input',
)

searchFromEvent$
    .pipe(
        debounceTime(300),
        map(event => (event.target as HTMLInputElement).value),
        distinctUntilChanged(),
    )
    .subscribe({
        next: value => {
            console.log('SUB:', value)
        },
        error: console.log,
        complete: ()  => {
            console.log('Event completed')
        }
    })
