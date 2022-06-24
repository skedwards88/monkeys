- Dependabot

- Add undo function or add end turn button and make tile draggable until clicked
- More tests
- Force landscape mode if screen width is below certain size
- images are slow. Make smaller? Cache? SVG tiles???
- would be cool to change color of route to indicate owner
- make rules swipe-able on mobile
- check color accessibility

thoughts about reducer

- easier to test than a custom hook because don't set state under the hood
- suprised that calls dispatch twice--this only happens in dev mode (to make side effects more apparent)

ref

- placed in the component where was needed instead of at the top level

uselocal

- had to pass force option to init function
- had a getter on a class, but that got dropped when json.stringified. ended up making it a separate function.

clean up the styling and code with new learnings

---

minimize images

all deploy workflows--use npm ci instead of npm install? may be faster

**\*Get tests working again. Also add tests back to workflow**

WARNING in webpack performance recommendations:
You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
For more info visit https://webpack.js.org/guides/code-splitting/

WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets:
assets/apple-touch-startup-image-1242x2208.png (280 KiB)
assets/apple-touch-startup-image-1242x2688.png (283 KiB)
assets/apple-touch-startup-image-1536x2048.png (387 KiB)
assets/apple-touch-startup-image-1668x2224.png (441 KiB)
assets/apple-touch-startup-image-1668x2388.png (441 KiB)
assets/apple-touch-startup-image-2048x2732.png (609 KiB)
assets/apple-touch-startup-image-2160x1620.png (425 KiB)
assets/apple-touch-startup-image-1620x2160.png (420 KiB)
assets/apple-touch-startup-image-2436x1125.png (247 KiB)
assets/apple-touch-startup-image-2208x1242.png (284 KiB)
assets/apple-touch-startup-image-2688x1242.png (290 KiB)
assets/apple-touch-startup-image-2048x1536.png (390 KiB)
assets/apple-touch-startup-image-2224x1668.png (444 KiB)
assets/apple-touch-startup-image-2388x1668.png (447 KiB)
assets/apple-touch-startup-image-2732x2048.png (615 KiB)
