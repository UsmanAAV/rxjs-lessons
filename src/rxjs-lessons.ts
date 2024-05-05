import { Observable, debounceTime, distinctUntilChanged, filter, fromEvent, map, takeUntil } from "rxjs";

// const search$ = new Observable<Event>(observer => {
//     const searchInput = document.getElementById('search');
//     const stopButton = document.getElementById('stop');

//     if (!searchInput || !stopButton) {
//         return observer.error('Element does not exist on the page')
//     }

//     const clear = () => {
//         searchInput.removeEventListener('input', handleSearch);
//         stopButton.removeEventListener('click', handleStop);
//     }

//     const checkSubscription = () => {
//         if (observer.closed) {
//             clear();
//         }
//     }

//     const handleSearch = (event: Event) =>  {
//         checkSubscription();
//         console.log(123);
//         // @ts-ignore
//         observer.next(event);
//     };

//     const handleStop = () => {
//         checkSubscription();
//         observer.complete();
//         clear();
//     }

//     searchInput.addEventListener('input', handleSearch);
//     stopButton.addEventListener('click', handleStop);
// });

const searchFromEvent$ = fromEvent<Event>(
    document.getElementById('search')!,
    'input',
);

const stopFromEvent$ = fromEvent<Event>(
    document.getElementById('stop')!,
    'click',
);

const subscription = searchFromEvent$
    .pipe(
        takeUntil(stopFromEvent$),
        debounceTime(300),
        map(event => (event.target as HTMLInputElement).value),
        filter(value => value.length > 3 || !value),
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
    });

// const stopSubscription = stopFromEvent$.subscribe(() => {
//     subscription.unsubscribe();
//     stopSubscription.unsubscribe();
// });

// setTimeout(() => {
//     console.log('unsubscribed');
//     subscription.unsubscribe();
// }, 10000);