export function scrollPageToBottom() {
    const docElement = document.documentElement;

    if (window.scrollY < docElement.scrollHeight - docElement.clientHeight) {
        window.scrollBy(0, 4);
        window.setTimeout(() => {
            scrollPageToBottom();
        }, 1);
    }
}