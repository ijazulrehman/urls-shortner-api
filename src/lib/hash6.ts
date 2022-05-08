
export const hash6 = (): string => {
    return (Date.now() + 1).toString(36).substr(2, 6);
}