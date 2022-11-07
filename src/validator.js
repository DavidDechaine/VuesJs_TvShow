// ---------------Message Error Validator----------
const USERNAME_EMPTY = 'Please enter a username';
const EMAIL_EMPTY = 'Please enter an email';
const PASSWORD_EMPTY = 'Please enter a password';
const CONFIRM_MATCH = 'The password confirmation doesn\'t match the password';
const USERNAME_CREDENTIAL = 'The username length must be between 5 and 20 characters. '
                            + 'The characters permitted are: a-z, A-Z, numbers and \'_\'';
const PASSWORD_CREDENTIAL = 'The password length must be between 6 and 30 characters';
// ---------------Regex error validator----------
function UsernameValidator(str) {
    return /^\w{5,20}$/.test(str);
}
function PasswordValidator(str) {
    return /^.{6,30}$/.test(str);
}
function PasswordConfirmation(pwd1, pwd2) {
    return pwd1 === pwd2;
}
export {
    UsernameValidator,
    PasswordValidator,
    PasswordConfirmation,
    USERNAME_EMPTY,
    EMAIL_EMPTY,
    PASSWORD_EMPTY,
    CONFIRM_MATCH,
    USERNAME_CREDENTIAL,
    PASSWORD_CREDENTIAL,
};
