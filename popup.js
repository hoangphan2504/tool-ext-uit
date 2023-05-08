module.exports = {
    popup: function (selectionText, answer)  {
        return `
            <label for="">
                Input: 
                <span>${selectionText}</span>
            </label>

            <label for="">
                Output:
                <span>${answer}</span>
            </label>
        `
    }
} 