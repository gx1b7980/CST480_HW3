import axios from 'axios';
function ensureError(value) {
    if (value instanceof Error)
        return value;
    let stringified;
    try {
        stringified = JSON.stringify(value);
    }
    catch (_a) {
        stringified = "[Unable to stringify the thrown value]";
    }
    let error = new Error(`Thrown value was originally not an error; stringified value is: ${stringified}`);
    return error;
}
// https://axios-http.com/docs/handling_errors
// https://github.com/axios/axios/issues/3612
function getAxiosErrorMessages(err) {
    var _a;
    let error = ensureError(err);
    console.log(error);
    if (!axios.isAxiosError(error)) {
        return [error.toString()];
    }
    if (!error.response) {
        return ["Server never sent response"];
    }
    // TODO assumes API's body will be { error: <string>[] } if error
    if (!((_a = error.response.data) === null || _a === void 0 ? void 0 : _a.errors)) {
        return [error.message];
    }
    return error.response.data.errors;
}
export { ensureError, getAxiosErrorMessages };
