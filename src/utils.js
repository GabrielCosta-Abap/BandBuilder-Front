export function obterIdDaRota() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}
