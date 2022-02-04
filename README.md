# Graphql Mailer

An easy to add and run automated mailing service that your API can use to send templated and dynamically injected emails to users.

Uses Gmail/Google OAuth for the email service, but this can be easily changed to any other service.

Use the service out of the box, or use it as a starting point to customize to your own needs.

## Features and Highlights

### Trigger Emails with a simple POST Request

Once started, simply send a simple `POST` request to `http://yourserver:port/send` to send a customized email which sends a pre-configured/reusable template -- if available, if not it uses the default content provided.

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

Avoid having to write numerous `POST` request with the package `@the-devoyage/mailer-connect`, which can be [purchased here](https://basetools.io/checkout/wp7QYNNO), to quickly set up a typed and reusable connection to an external mailer service from your current API.

```ts
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

### Send Pre-Templated Content with Variables

Save Pre-Designed templates, known as "content", to the GraphQL Mailer Service. This allows you to utilize the same "content" across multiple services.

Each "content" is referenced to a "trigger". Simply pass the name of the trigger to the request body to utilize the associated content.

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
mailer.send({
  triggeredContent: {
    to: updatedAccount.email,
    trigger: "PASSWORD_RESET",
    variables: { first_name: "Nick" },
  },
  defaultContent: {
    to: updatedAccount.email,
    html: `<body><p>Hello ${first_name}! You have reset your password!</p></body>`,
    plainText: `Hello ${first_name}! You have reset your password!`,
    subject: "Password Reset",
  },
});
```

## Usage

### Set Environment Variables

First, move the `.env.example` file to `.env` and fill in the variables to match your accounts/project. Be sure to spin up a mongo instance to take advantage of `layouts` and `contents`.

### Run The Application

In Development:

```
npm run dev
```

In Production:

```
npm start
```

### Send Automated Emails

From your current API, use your method of choice to send a post request to the Mailer service which accepts a POST request at `/send`.

```ts
const sendMail = await fetch("http://localhost:5008/send", {
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

Check out the `@the-devoyage/mailer-connect` package to avoid having to write `POST` request. This package provides a typed function to send the arguments to the mailer server.

### Layouts

Layouts are pre-designed HTML templates that are saved to the GraphQL Mailer Database. Layouts do not contain dynamic variables, but can be injected with a `Content`, which is described below. Layouts MUST can contain a variable, `{{content}}` which will allow a Content to be dynamically injected into the layout.

Available GraphQL Calls:

- `createLayout`
- `getLayouts`
- `updateLayout`
- `deleteLayout`

Every email sent that utilizes the following example layout will contain the h1 element, with dynamically custom content.

```ts
<html>
  <h1>Hello and welcome!</h1>
  <body>{{ content }}</body>
</html>
```

### Content

Content are pre-designed HTML that can be sent as standalone emails or be dynamically inserted into pre-designed HTML Layouts.

From the GraphQL Playground/Sandbox you can manipulate content:

- `createContent`
- `updateContent`
- `deleteContent`
- `getContents`

Content can contain dynamic and custom variables.

```html
<body>
  <p>
    Hello {{name}}, welcome to The Devoyage - Your verification code is {{code}}
  </p>
</body>
```

## Security

### Connecting To The Mailer Server

This server should only be exposed to your current api and should never be exposed to the public in production.

### Authorization and Authentication

**Built In Auth**

The `/send` route is for internal use only and does not require authentication or authorization.

All `GraphQL` requests require Authorization and Authentication. Authentication should be completed by an external service such as a Gateway.

Once the Gateway Authenticates the user, it should pass the following `request headers` to the Mailer Server.

```ts
interface RequiredHeaders {
  token: DecodedToken; // Must be stringified to send as a request header.
  isAuth: boolean; // Must be stringified to send as a request header.
}

interface DecodedToken {
  account?: { _id: string; email: string };
  user?: { _id: string; role: number; email: string };
}
```

All GraphQL queries require an `account`. All mutations require both `account` and `user`. Since this is most likely an Admin Level API, the user role must be equal to the integer 1, the default admin level role.

**Can I Modify These To Fit My Current Authorization Server?**

Of course, you are welcome to change any of this for your own needs!

Types can be edited from within the `types` directory. 

Generate types based on GraphQL TypeDefs by running `npm run generate`. These are saved in `types/generated`.

Context and authorization are parsed from within the `server.ts` file.

The `helpers` directory contains the `auth` helpers.

Auth Checks and Role Checks are done at the Resolver Level.
