# Graphql Mailer

An automated mailing micro service that your API can use to send templated and dynamically injected emails to users.

Connect Gmail/Google with Google OAuth.

Use the service as is in production, or use it as a starting point to create your own mailing micro-service.

## License

This repository provides a GPL License by default. If you want to use this product in a private commercial setting, you may purchase the MIT Licensed Version [Here!](https://thedevoyage.gumroad.com/l/graphql-mailer)

## Features

### Listen for Webhooks From Your API

After an event happens in your API, simply POST to the `/send` endpoint of this server to send a templated email.

```ts
// Accounts API
// User successfully resets password...
// Send POST Request to the mailer service to trigger email using fetch.

const sent = await fetch("http://localhost:5008/send", {
  method: "POST",
  body: JSON.stringify({
    defaultContent: {
      to: updatedAccount.email,
      html: `<h3>Success!</h3><p>${first_name}, your password has been reset.`,
      plainText: `Success! ${first_name}, your password has been reset!`,
      subject: "Password Reset",
    },
  }),
});
```

Use the [`@the-devoyage/mailer-connect` package](https://github.com/The-Devoyage/mailer-connect/packages/1234394) to quickly POST the webhook with typed inputs parameters.

### Default Content

HTML and Variables are provided from the source of the triggering event allowing you to use HTML and Variables from the origin source. 

```ts
// Accounts API
// User successfully resets password...
// Send POST Request to the mailer service to trigger email using @the-devoyage/mailer-connect library.

const sent = await mailer.send({
  defaultContent: {
    to: updatedAccount.email,
    html: `<h3>Success!</h3><p>Hello, ${first_name}, your password has been reset.</p>`,
    plainText: `Success! Hello ${first_name}, your password has been reset.`,
    subject: `${company_name} Password Reset`,
  },
});
```

### Triggered Content - Reusable Templates

HTML and Variables are stored on the Mailer Service, allowing you to reuse content.

1. Create `Content`

   Use the GraphQL Resolver, `createContent` to create a new `content` object. Each `content` is tied to a `trigger`. This will save an HTML template to the connected mongo db instance that you can later reference by `trigger`.

2. Send a post request from the external service. This time, use `triggeredContent` and pass the `trigger` name. Now, the server will use the HTML located on the Mailer Server instead of the HTML located within the external service.

```ts
// Accounts API
// User successfully updates email.
// Send POST Request to the mailer service to trigger email using @the-devoyage/mailer-connect library.

mailer.send({
  triggeredContent: {
    to: updatedAccount.email,
    trigger: "PASSWORD_RESET",
  },
  defaultContent: {
    // The Default Content Arg is Required, as if the triggered content can not be found on the server, it will fall back to the default content.
  },
});
```

### Pass Custom Variables To Triggered Content

Pass variables to triggered content to send custom and dynamic information such as auth codes, names, and receipt information inside automated emails.

Example Content Pre-Made on the Mailer Server:

```html
<body>
  <p>Hello {{first_name}}! You have reset your password!</p>
</body>
```

Below, the triggered content accepts variables to generate the same dynamic content as the custom default content. The difference is, the triggered content is reusable while the default content needs to be written each time the request is called.

```ts
// Accounts API
// User successfully updates email.
// Send POST Request to the mailer service to trigger email using @the-devoyage/mailer-connect library.

const varibales = { first_name: "nick" };

mailer.send({
  triggeredContent: {
    to: updatedAccount.email,
    trigger: "PASSWORD_RESET",
    variables,
  },
  defaultContent: {
    to: updatedAccount.email,
    html: `<body><p>Hello ${variables.first_name}! You have reset your password!</p></body>`,
    plainText: `Hello ${variables.first_name}! You have reset your password!`,
    subject: "Password Reset",
  },
});
```

## Usage

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

4. Configure Environment Variables

All environment variables are saved in the root of this repo in a file called `.env.example`. Move this file to `.env` and fill in the variables.

### Start the server:

In Development:

```
npm run dev
```

In Production:

```
npm start
```

### Create Layout and Content

If you want to use triggered content, you must create a content using the graphql api on this server.

### Send Automated Emails

From your current API, use your method of choice to send a post request to the Mailer service which accepts a POST request at `/send` (default).

```ts
const sendMail = await fetch("http://localhost:5008/send", {
  method: "POST",
  body: JSON.stringify({
    triggeredContent: {
      to: updatedAccount.email,
      trigger: "PASSWORD_RESET",
      variables: { first_name: "Nick" },
      layout: "12345", // must be valid object id
    },
    defaultContent: {
      to: updatedAccount.email,
      html: `<h3>Success!</h3><p>${first_name}, your password has been reset.`,
      plainText: `Success! ${first_name}, your password has been reset!`,
      subject: "Password Reset",
      layout: "12345", // must be valid object id
    },
  }),
});
```

## Resolvers

### Content

Content are pre-designed HTML that can be sent as standalone emails or be dynamically inserted into pre-designed HTML `Layout`s.

From the GraphQL Playground/Sandbox you can manipulate content:

- Create Content
- Update Content
- Delete Content
- Get Content

### Layouts

Layouts are pre-designed HTML templates that are saved to the GraphQL Mailer Database. Layouts do not contain dynamic variables, but can be injected with `Content`, which is described below. Layouts MUST can contain a variable, `{{content}}` which will allow a Content to be injected into the template.

- Create Layout - Admins are able to create layouts. Requires User Role of 1.

- Get Layouts - Get a paginated and filterable list of layouts.

- Update Layout - Admins are able to update layouts. Requires user role of 1.

- Delete Layout - Admins are able to delete layouts. Requires user role of 1.

## Querying the Server

Query the server as you would any other GraphQL server. Try using the sandbox/graphql playground located at the gateway's graphql url. The webhook route should only be accessed from inside the API with a POST request directly to this server.

**Required Headers**

All GraphQL resolvers within this service require a `context` header to be passed with the request. The `context` header should be stringified JSON of the type Context. Be sure to include the `auth` property.

```ts
interface Context extends Record<string, any> {
  auth: {
    account: { _id: string; email: string } | null;
    user: {
      _id: string;
      role: number;
      email: string;
    } | null;
    isAuth: boolean;
  };
  // ...context
}
```

