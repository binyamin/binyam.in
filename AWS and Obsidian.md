# AWS + Obsidian
Sync your obsidian vault with AWS cloud storage
[As a Gist](https://gist.github.com/b3u/9f57ebdc7ed7d204e3ae57a122dc78c3)
Tagged with #note-storage, #Article-Idea

1. Create an aws account [link](https://aws.amazon.com/console/). There's a free tier.
2. Create an IAM user
3. Create an s3 bucket (navigate to s3 & click new button)
4. Install AWS CLI [link](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
5. Login to CLI with IAM keys
6. Sync Notes!
	- `aws s3 sync` #useful-command 

- #todo is this solution two way sync, or does it only copy the files from the computer? Mainly a problem when you want to download the notes.