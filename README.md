# Graphql Mailer

Easily spin up and run an automated mailing service that your API can use to send templated and dynamically injected emails with the @the-devoyage/graphql-mailer.

Uses Gmail/Google OAuth for the email service, but this can be easily changed to any service you want.

## Quick Examples

Use the npm package `@the-devoyage/mailer-connect` to quickly connect to your newly spun up mailer service.

### Send Custom Emails from your Current API

Generate HTML directly from your existing service to send custom emails to your users in response to events.

```ts
mailer.send({
  defaultContent: {
    to: updatedAccount.email,
    html: "<h3>Success!</h3><p>Your password has been reset.",
    plainText: "Success! Your password has been reset!",
    subject: "Password Reset",
  },
});
```

### Send Pre-Templated Content with Variables

Save Pre-Designed layouts/templates to the GraphQL Mailer Service so that you can use the same template across multiple services. Each template is tied to a "trigger". Simply pass the name of the trigger to the `mailer.send` function to utilize the template.

```ts
mailer.send({
  triggeredContent: {
    to: updatedAccount.email,
    trigger: "PASSWORD_RESET",
  },
});
```

### Pass Variables To Triggered Layouts

Pass variables that can be used within triggered templates to embed custom and dynamic information such as auth codes, names, and product orders inside the email.

Example Template Content (saved to the GraphQL Mailer Database)

```html
<body>
  <p>Hello {{first_name}}! You have reset your password!</p>
</body>
```

```ts
mailer.send({
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
});
```

## Usage

### Set Environment Variables

First, move the `.env.example` file to `.env` and fill in the variables. Be sure to spin up a docker instance to take advantage of `layouts` and `contents`.

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

From your current API, use your method of choice to send a post request to the GraphQL Mailer service. For example,

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

You may also use the `@the-devoyage/mailer-connect` package to streamline this process with typed methods as shown above.

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
