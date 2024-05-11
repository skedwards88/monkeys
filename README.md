# Monkeys of the Caribbean

A crew of monkeys&mdash;with you as the captain&mdash;overthrew their pirate overlords. But it is not gold you want. Nay, **coconuts** are the bounty you seek.

Alas! There be limited space on the sea. Compete for control of sea routes to get the most coconuts.

**Players:** 2

**Time:** 15 minutes

[Play Now!](https://skedwards88.github.io/monkeys/)

![Game icon](src/images/button_icons/monkey_3.svg)

---

Do you have feedback or ideas for improvement? [Open an issue](https://github.com/skedwards88/monkeys/issues/new).

Want more games? [Check these out](https://skedwards88.github.io/).

## Development

To build, run `npm run build`.

To run locally with live reloading and no service worker, run `npm run dev`. (If a service worker was previously registered, you can unregister it in chrome developer tools: `Application` > `Service workers` > `Unregister`.)

To run locally and register the service worker, run `npm start`.

To deploy, push to `main` or manually trigger the `.github/workflows/deploy.yml` workflow.

During deployment, the prebuild script will compress png images into the webp format. You can also compress these images by running `npm run compressImages` if you have the [webp compression tool](https://developers.google.com/speed/webp/docs/precompiled) installed.
