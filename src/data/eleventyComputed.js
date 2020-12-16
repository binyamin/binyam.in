module.exports = {
    isPost: (data) => {
        return ['micro', 'article'].includes(data.category);
    }
}
