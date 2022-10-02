export default class TemporaryPasswordNotRequestedError implements Error {
	public readonly message = "Temporary password not requested";
	public readonly name = TemporaryPasswordNotRequestedError.name;
}
