const ranges = [100,10, 20, 50, 80, 5, 1];
const result = [];
const totalSum = 100;


function getSum(total, num) {
    return total + Math.round(num);
}

function generator(ranges, totalSum) {
    let currenSum = 0;
    let totalRangeLeft = ranges.reduce(getSum);
    let totalLeft = totalSum - currenSum;

    function getMin(range) {
        totalRangeLeft -= range;
        let r = totalLeft - totalRangeLeft;
        return r < 0 ? 0 : r;
    }

    function getMax(range) {
        return totalLeft < range ? totalLeft : range;
    }

    function getVal(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function displayResult(val, index) {
        console.log(ranges[index], val);
    }

    ranges.forEach((element, index) => {
        const min = getMin(element);
        const max = getMax(element);
        const val = getVal(min, max);
        currenSum += val;
        totalLeft = totalSum - currenSum;
        result.push(val);
        displayResult(val, index);
        
    });
    
    console.log('Tot Range:', ranges.reduce(getSum));
    console.log('Tot Generated:', result.reduce(getSum));
}

if (ranges.reduce(getSum) < totalSum) {
    console.log("Total sum is too big");
    return;
}

generator(ranges, totalSum);
