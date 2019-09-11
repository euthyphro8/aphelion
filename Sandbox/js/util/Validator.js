

class Validator {

    static StringIsEmail(candidate) {
        let match = candidate.matches(/ [\d\w._-]+@[\d\w._-]+[.]com /gsi);
        return match && match.length === 1;
    }

    static StringIsValidPass(candidate) {
        let match = candidate.matches(/ [\d\w._-]+@[\d\w._-]+[.]com /gsi);
        return match && match.length === 1;
    }

}

module.exports = Validator;