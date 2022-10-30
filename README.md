# Graphql Mailer

A Federated GraphQL API featuring triggered emails and email templating.

- Save and reuse custom HTML templates
- Send emails with webhooks.

## Docs

[The Devoyage - GraphQL Mailer](https://www.thedevoyage.com/mailer/intro)

## Quick Start

### Clone and Install Deps

Clone the `@the-devoyage/graphql-mailer` repo.

### Install Dependencies

1. Login to the Github registry with NPM.

```
npm login --registry=https://npm.pkg.github.com
```

2. Install Dependencies

```
npm install
```

If you are using docker to build and run this server, you will need to pass the github token along to the build process.

For docker, you can run:

```bash
docker build -t --build-arg GTIHUB_TOKEN=${GITHUB_TOKEN} .
```

3. Configure Environment Variables

All environment variables are saved in the root of this repo in a file called `.env.example`. Move this file to `.env` and fill in the variables.

4. Start the server:

In Development:

```
npm run dev
```

In Production:

```
npm start
```
