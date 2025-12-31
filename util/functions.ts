export function rng(max: number, min: number) {
    return Math.round(Math.random() * (max - min)) + min;
}
