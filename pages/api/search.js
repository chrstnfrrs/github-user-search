import { $fetch } from 'ohmyfetch';

const USER_SEARCH_QUERY = `query ($username: String!) {
  user(login: $username) {
		createdAt
		name
		login
		avatarUrl
		bio
		company
		location
		websiteUrl
		twitterUsername
		followers {
			totalCount
		}
		following {
			totalCount
		}
		repositories {
			totalCount
		}
	}
}`;

const handler = async (req, res) => {
  const { data } = await $fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
    body: {
      query: USER_SEARCH_QUERY,
      variables: {
        username: req.query?.username,
      },
    },
  });

  res.status(200).json({ data, error: !data.user });
};

export default handler;
