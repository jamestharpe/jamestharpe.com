export function forHumans(tag: string) {
	return tag
		.split("-")
		.map((word) =>
			word
				.split("/")
				.map((word) => word[0].toUpperCase() + word.substr(1))
				.join(" / ")
		)
		.join(" ");
}
