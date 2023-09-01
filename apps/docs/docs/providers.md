---
sidebar_position: 3
label: Providers
---

# Providers

An email service provider is required to send emails from templates. It can be used for sending emails over SMTP or HTTP
requests. Currently, you can add a provider for your own hosted SMTP server or use SendGrid. In the future, we plan to
offer the possibility to connect to various popular email sending providers.

![Providers](/img/providers.png)

:::info
Providers management possible only with Admin permission.
:::

### How to add SendGrid provider?

On the providers screen, click the "Add" button. Give it a name, and then select `SEND_GRID` from the type
selector. In the 'Config' field, you need to provide a JSON configuration in the following format:

```json
{
  "key": "", // Your SendGrid API key with Send email permission
  "url": "https://api.sendgrid.com/v3/mail/send", // SendGrid send api (keep this value)
  "defaultFrom": "some@email.com", // email for default sender (should be verified sender on SendGrid)
  "defaultName": "Some Name" // name of default sender
}
```

### How to add SMPT provider?

On the providers screen, click the "Add" button. Give it a name, and then select `SMTP` from the type
selector. In the 'Config' field, you need to provide a JSON configuration in the following format:

```json
{
  "host": "", // SMTP Host
  "port": 0, // SMTP Port
  "user": "", // SMTP User
  "password": "", // SMTP Password
  "defaultFrom": "some@email.com", // email for default sender
  "defaultName": "Some Name" // name of default sender
}
```

:::tip
With SMTP, you can send emails using a variety of different email providers.
For example, [Brevo SMTP](https://developers.brevo.com/docs/smtp-integration)
:::
