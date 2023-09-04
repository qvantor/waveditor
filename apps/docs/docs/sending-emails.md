---
sidebar_position: 5
label: Sending emails
---

# Sending emails

### How to send email?

To send emails, you can use a special GraphQL query called `sendEmail`,
which expects the following input data structure:

```json
{
  "templateId": 0, // id of the template,
  "subject": "Email from waveditor", // email subject
  "to": [
    "some@email.com"
  ], // array of emails
  "variables": {}, // variables for template rendering
  "from": null, // Optional. from email
  "fromName": null, // Optional. from name
  "providerId": null // Optional. Provider ID for sending emails, to overwrite the default provider.
}
```

This method does not require any authorization currently, but it will be secured with an S2S token in the future.

### GraphQL playground

Check this method
in [playground](https://api.qvantor.space/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMrJgCicAhgJYA2AFACRjUrXqnlV30DCEJADNaAcwCEASiLAAOkiJEAzjxoNGbDl1btqUhQF8QAGhAA3anlrUARvQTKMIeYqJzwej11dKlHlAQ4AAd6dgQASTBvIgBGEwU-dxBlGFsAKwQoFBiPXgYiYTwIOCIAd2pzBDBaFAg8DwS3fxA6mIBtRKTkgggYPAABdXoAOigSjy6lAF0mpI9LazsHZRjgQy6NpGNDIA).
