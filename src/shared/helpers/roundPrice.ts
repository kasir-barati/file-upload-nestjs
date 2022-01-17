export const roundPrice = (
    price: number,
    roundPrecisionAmount = 2,
    minimumSupportedPrice = 5000,
): number => {
    const p = Math.floor(price);
    const precision = p.toString().length - roundPrecisionAmount;

    if (precision === 0) {
        return minimumSupportedPrice;
    }
    return parseFloat(p.toPrecision(precision));
};
