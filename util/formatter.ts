// initialize our number formatter to correctly display price information
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export default formatter;