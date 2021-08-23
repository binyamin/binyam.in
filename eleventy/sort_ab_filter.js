function alphabetaSort (left, right) {
    // Thanks to Sindre Sorhus for the logic here

    const collator = new Intl.Collator();
    const compare = (left, right) => left === right ? 0 : collator.compare(left, right);

    function caselessCompare(left, right) {
        const lowercaseComparison = compare(left.toLowerCase(), right.toLowerCase());
        return lowercaseComparison === 0 ? compare(left, right) : lowercaseComparison;
    }

    function articleCompare(left, right) {
        const articleComparison = caselessCompare(left.replace(/^(a|an|the)\s/i, ""), right.replace(/^(a|an|the)\s/i, ""));
        return articleComparison === 0 ? caselessCompare(left, right) : articleComparison;
    }

    return articleCompare(left, right);
}

module.exports = {
    sort_ab: function(arr, key) {
        return arr.sort((a,b) => alphabetaSort(a[key], b[key]));
    }
}