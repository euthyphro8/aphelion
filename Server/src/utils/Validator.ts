

class Validator {
    public static IsUuid(candidate: string): boolean {
        const matches = candidate.match(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/);
        return matches !== null && matches.length === 1;
    }
}
export default Validator;
