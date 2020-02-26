// Latest GitHub Commit
// Credits: @sindresorhus
(async () => {
	return;
	const username = "b3u";
	const email = "binyaminagreen@gmail.com";

	const url = `https://api.github.com/users/${username}/events/public`

	const response = await fetch(url);
	const json = await response.json();

	let latestCommit;

	const latestPushEvent = json.find(event => {
		if (event.type !== 'PushEvent') {
			return false;
		}

		// Ensure the commit is authored by me and I'm not just a "committer"
		latestCommit = event.payload.commits.reverse().find(commit => commit.author.email === email);
		return Boolean(latestCommit);
	});

	const {repo, created_at: createdAt} = latestPushEvent;

	const repoUrl = `https://github.com/${repo.name}`;
	const repoTitle = repo.name.replace(new RegExp(`^${username}/`), '');

	const commitUrl = `${repoUrl}/commit/${latestCommit.sha}`;
	const commitTitle = latestCommit.message.trim().split('\n')[0].trim();
	const commitDate = timeago().format(createdAt);

	console.log({
		commitUrl,
		commitTitle,
		commitDate,
		repoUrl,
		repoTitle,
	})
})();
