# GitHub Actions with MongoDB

## Information
This website has been made for the [GitHub + DEV Hackathon](https://dev.to/devteam/announcing-the-github-dev-2023-hackathon-4ocn).

It is an example of how you can connect MongoDB to GitHub Actions and use it as a reward system for a repo's contributors.

## Seeing the template in action

[Contribute](CONTRIBUTING.md) here to earn some tokens and see this template in action!

## Using this template

To use this template you must generate:
- A MongoDB URI
- A url to deploy this website on
- A secret for NextAuth
- A GitHub OAuth App ID
- A GitHub OAuth App Secret

To make the GitHub Action run, you will need to set the `MONGODB_URI` as a repository secret for the action.

When deploying this template as a website, you must have the environment variables:
- `MONGODB_URI`
- `NEXAUTH_URL`
- `NEXTAUTH_SECRET`
- `GITHUB_ID`
- `GITHUB_SECRET`

---

Thanks for checking out this template! Make sure to star it and follow [VulcanWM](https://github.com/VulcanWM) for more content like this.
