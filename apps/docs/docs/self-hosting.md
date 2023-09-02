---
sidebar_position: 2
label: Self hosting
---

# Self hosting

For an easy setup and deployment, you can use Docker containers for
the [frontend](https://hub.docker.com/r/waveditor/frontend)
and [backend](https://hub.docker.com/r/waveditor/backend).
Additionally, a Docker Compose file for convenient startup is provided.

## Start with docker-compose file

:::info

Recommended system spec: at least 1-core CPU and 2 GB RAM.

:::

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker-Compose](https://docs.docker.com/compose/install/)

In your working directory, run the following commands to make a directory named waveditor and
download `docker-compose` and `.env.example` files:

```bash
mkdir waveditor && cd waveditor
curl -O -O https://raw.githubusercontent.com/qvantor/waveditor/main/{docker-compose.yml,.env.example}
```

### Configuration

Afterward edit `.env.example` file. And rename it to `.env`

Here are some specific details regarding the variables in the `.env` file:

- `NX_BACKEND_URL`: This is the URL of the backend. If you're using the default docker-compose.yml,
  you can leave it untouched.

- `NX_GOOGLE_OAUTH_CLIENT`: Adding support for Google Auth requires this. You can generate it in
  the [Google Console](https://console.cloud.google.com/apis/credentials).

- `POSTGRES_`: These credentials are for the PostgreSQL database. By default, it will create a
  'waveditor' database in a separate Docker container.

- `JWT_SECRET`: This is required for JWT Token generation. It's recommended to use a 64-character
  hexadecimal string. If you have Node.js installed, you can use the following command:  
  `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`  
  and use the result as your secret.

- `ADMIN_EMAILS`: This is a list of users' emails, separated by commas, who will be granted the Admin role.

- `DEMO_MATERIALS`: Set this to 0 if you don't want to see demo templates.

### Deploy

You can start the entire application using the following command:

```bash
docker compose --profile with-frontend up
```

After starting the application, you can access it at [http://localhost:4000](http://localhost:4000)
and the GraphQL explorer at [http://localhost:5555](http://localhost:5555).
