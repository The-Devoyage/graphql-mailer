# Graphql Mailer

Easily add and run an automated mailing service that your API can use to send templated and dynamically injected emails with the @the-devoyage/graphql-mailer.

Uses Gmail/Google OAuth for the email service, but this can be easily changed to any other service.

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

Use the package `@the-devoyage/mailer-connect` to quickly set up a typed and reusable connection to your mailer api.

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

Save Pre-Designed templates, known as "content", to the GraphQL Mailer Service. This allows you to use the same content across multiple services.

Each template is referenced to a "trigger". Simply pass the name of the trigger to the request body to utilize the content template.

```ts
mailer.send({
  triggeredContent: {
    to: updatedAccount.email,
    trigger: "PASSWORD_RESET",
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
