export default class EntryNotFoundError implements Error {
	public readonly name = EntryNotFoundError.name;
	public readonly message = "Unable to find entry in database";
}
