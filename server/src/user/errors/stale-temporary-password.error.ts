export default class StaleTemporaryPasswordError implements Error {
	public readonly name = StaleTemporaryPasswordError.name;
	public readonly message = "Temporary password is too old. User must request a new one.";
}
