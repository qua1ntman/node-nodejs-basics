export const parseArgs = () => {
    process.argv.forEach(function (val, index, array) {
        console.log(`--prop${index === 0 ? '' : index+1}Name ${val}`);
    });
};
