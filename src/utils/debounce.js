export const debounceClickBtn = (fn, delay) => {
    delay = delay || 0;
    let timerId;

    return () => {

        if(timerId) {
            clearTimeout(timerId);
            timerId = null;
        }

        timerId = setTimeout(() => {
            fn();
        }, delay);
    };
}