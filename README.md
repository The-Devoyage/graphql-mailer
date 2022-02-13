# Graphql Mailer

An automated mailing micro service that your API can use to send templated and dynamically injected emails to users.

Connect Gmail/Google with Google OAuth.

Use the service out of the box, or use it as a starting point to create your own mailing micro-service.

## Features

### Listen for Webhooks

Once started, this server listens for `POST` request to a custom endpoint.

From an external service, send the POST request with the details about the email you want to send to the user.

```ts
const sent = await fetch("http://localhost:5008/send", {
  method: "POST",
  body: JSON.stringify({
    triggeredContent: {
      to: updatedAccount.email,
      trigger: "PASSWORD_RESET",
      variables: { first_name: "Nick" },
    },
    defaultContent: {
      to: updatedAccount.email,
      html: `<h3>Success!</h3><p>${first_name}, your password has been reset.`,
      plainText: `Success! ${first_name}, your password has been reset!`,
      subject: "Password Reset",
    },
  }),
});
```

Use the package `@the-devoyage/mailer-connect` to quickly POST the webhook with typed inputs. [Purchased Access](https://basetools.io/checkout/wp7QYNNO).

The following examples will mainly use this package to demonstrate.

```ts
import { TriggeredContent, DefaultContent } from "@the-devoyage/mailer-connect";

const triggeredContent: TriggeredContent = {
  // ...
};

const defaultContent: DefaultContent = {
  // ...
};

const sent = await mailer.send({ triggeredContent, defaultContent });
```

### Send Default Content from your Current API

Generate HTML from your existing API and send custom emails to your users.

```ts
const sent = await mailer.send({
  defaultContent: {
    to: updatedAccount.email,
    html: `<h3>Success!</h3><p>Hello, ${first_name}, your password has been reset.</p>`,
    plainText: `Success! Hello ${first_name}, your password has been reset.`,
    subject: `${company_name} Password Reset`,
  },
});
```

### Send Triggered Content with Variables

Share "content" between external services to easily send the same emails from different APIs.

Each "content" is referenced to a "trigger" and stored on the mailer service. Simply pass the name of the trigger to the request body to utilize the content.

```ts
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

Clone the `@the-devoyage/graphql-mailer` repo. [Purchase Access](https://basetools.io/checkout/8G2fCyXe)

Make sure you have access to the following private repositories:

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

Assign an environment variable to the Github Token locally:

```bash
export GITHUB_TOKEN=mytoken
```

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

If you want to use triggered content, you must create a content using the graphql api.

Optionally you can also pass a layout that the content will be injected into, at the time of sending.

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
      layout: "12345-must-be-valid-object-id",
    },
    defaultContent: {
      to: updatedAccount.email,
      html: `<h3>Success!</h3><p>${first_name}, your password has been reset.`,
      plainText: `Success! ${first_name}, your password has been reset!`,
      subject: "Password Reset",
      layout: "12345-must-be-valid-object-id",
    },
  }),
});
```

## Resolvers

### Layouts

Layouts are pre-designed HTML templates that are saved to the GraphQL Mailer Database. Layouts do not contain dynamic variables, but can be injected with `Content`, which is described below. Layouts MUST can contain a variable, `{{content}}` which will allow a Content to be injected into the template.

- Create Layout - Admins are able to create layouts. Requires User Role of 1.

- Get Layouts - Get a paginated and filterable list of layouts.

- Update Layout - Admins are able to update layouts. Requires user role of 1.

- Delete Layout - Admins are able to delete layouts. Requires user role of 1.

### Content

Content are pre-designed HTML that can be sent as standalone emails or be dynamically inserted into pre-designed HTML Layouts.

From the GraphQL Playground/Sandbox you can manipulate content:

- Create Content - Admin may create content.
- Update Content - Admin may update content.
- Delete Content - Admin may delete content.
- Get Contents - Returns a paginated and filterable list of content documents.

## Querying the Server

Query the server as you would any other GraphQL server. Try using the sandbox/graphql playground located at the gateway's graphql url.

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

## Recommended Services

- `@the-devoyage/graphql-gateway` - An apollo gateway server with pre-configured features such as user authorization, file routing/file upload routing, and supergraph configuration. This repo is compatible with this service and can act as the gateway for this service. [Purchase Access](https://basetools.io/checkout/XGUVNNGr)

- `@the-devoyage/graphql-accounts` - An accounts service that handles account creation, authentication, and verification. It is compatible with this service out and can handle supplying the requirements for the `account` property of the token above. [Purchase Access](https://basetools.io/checkout/v0cv56df)

- `@the-devoyage/graphql-users` - A Users Microservice to manage the members of accounts. This service is compatible with the mailer, and can handle supplying the `user` information for the token above. [Purchase Access](https://basetools.io/checkout/dQe81uv0)
