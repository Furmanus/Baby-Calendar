export function replaceTextVariables(text, variables) {
    Object.keys(variables).forEach(key => {
        text = text.replaceAll(new RegExp('{' + key + '}', 'g'), variables[key]);
    });
    return text;
}
