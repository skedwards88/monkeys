/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./service-worker.js",['./workbox-718aa5be'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "031efdf4229499ba3487.png",
    "revision": null
  }, {
    "url": "03215ebbb451f1c24856.png",
    "revision": null
  }, {
    "url": "06fe3333648ae3570114.png",
    "revision": null
  }, {
    "url": "078d72e4d5536300c277.png",
    "revision": null
  }, {
    "url": "09d29243bd38242f6b89.png",
    "revision": null
  }, {
    "url": "0abc447cc80220a8e62f.png",
    "revision": null
  }, {
    "url": "0c5952959c2651ca796f.png",
    "revision": null
  }, {
    "url": "0c994cb9289b91f2cb85.png",
    "revision": null
  }, {
    "url": "105840c4fe87260cbce5.svg",
    "revision": null
  }, {
    "url": "16bc6b596cd9e053984e.png",
    "revision": null
  }, {
    "url": "16c9ac48d6b79cd918ce.png",
    "revision": null
  }, {
    "url": "17b9b5dccf963af1ce08.svg",
    "revision": null
  }, {
    "url": "187c69d8e4c09d886811.png",
    "revision": null
  }, {
    "url": "242a2435a1cadeb57bc5.png",
    "revision": null
  }, {
    "url": "2493c80cede224e36ea7.png",
    "revision": null
  }, {
    "url": "2b46f21b592fc995b060.png",
    "revision": null
  }, {
    "url": "2d219d8f56f2cb0e083b.png",
    "revision": null
  }, {
    "url": "342d16572df38e19d186.png",
    "revision": null
  }, {
    "url": "349884c608e0dda00a79.svg",
    "revision": null
  }, {
    "url": "36c575010ef4250d6725.png",
    "revision": null
  }, {
    "url": "380e48e0c7794eb0e2fe.svg",
    "revision": null
  }, {
    "url": "383cfbf7129e10341107.png",
    "revision": null
  }, {
    "url": "3dc62100702dc6f3ab8f.png",
    "revision": null
  }, {
    "url": "3dd45ffb07ae72caf094.png",
    "revision": null
  }, {
    "url": "3e2f7b41382ee898d8b0.png",
    "revision": null
  }, {
    "url": "40333c6de421f480c85d.png",
    "revision": null
  }, {
    "url": "48f8595c71614683f1ab.png",
    "revision": null
  }, {
    "url": "4aacc5bd29f03896e746.png",
    "revision": null
  }, {
    "url": "4b784c323101cac97497.png",
    "revision": null
  }, {
    "url": "4c42ec0a58982519ab77.png",
    "revision": null
  }, {
    "url": "4f21744cfe39e02a4053.png",
    "revision": null
  }, {
    "url": "50028a0fbed1dc1fcd2f.svg",
    "revision": null
  }, {
    "url": "502d298d68b7c6af2b89.png",
    "revision": null
  }, {
    "url": "50ef42309e91a522c158.png",
    "revision": null
  }, {
    "url": "51c33cac0e077b355aad.png",
    "revision": null
  }, {
    "url": "52f5c91568b6b50052dc.png",
    "revision": null
  }, {
    "url": "5562a60fe403e61feffb.png",
    "revision": null
  }, {
    "url": "57116fc4bf1be47d019f.png",
    "revision": null
  }, {
    "url": "576f86eee99a8fc59621.png",
    "revision": null
  }, {
    "url": "5834d6b38b8d6a593be0.svg",
    "revision": null
  }, {
    "url": "586f25b570d81911e256.png",
    "revision": null
  }, {
    "url": "5ad7630c15367fcd66e3.png",
    "revision": null
  }, {
    "url": "5b87f978b7fb2c93f973.png",
    "revision": null
  }, {
    "url": "5bb9e4679032795ab4ee.png",
    "revision": null
  }, {
    "url": "5bc4c7fa6742937ac2e2.png",
    "revision": null
  }, {
    "url": "5d63d42e270ff9357514.svg",
    "revision": null
  }, {
    "url": "5dc4ee78c9d1999be44c.png",
    "revision": null
  }, {
    "url": "63d3f1b5376b5b21e4e9.png",
    "revision": null
  }, {
    "url": "69ca61273ffa52d3389b.svg",
    "revision": null
  }, {
    "url": "71745ccd64609f354e28.png",
    "revision": null
  }, {
    "url": "72949d3e124d8ae8d1cb.png",
    "revision": null
  }, {
    "url": "74249fdc9e6d9f2431d7.png",
    "revision": null
  }, {
    "url": "7708b5941e82e04f5481.png",
    "revision": null
  }, {
    "url": "77d3405b00fcb32ececa.png",
    "revision": null
  }, {
    "url": "77d5a2612c52f26f1426.png",
    "revision": null
  }, {
    "url": "781d540dbb759166736f.png",
    "revision": null
  }, {
    "url": "78c4c90ce40b46ecf56e.png",
    "revision": null
  }, {
    "url": "79d0b045e6746c14cc48.png",
    "revision": null
  }, {
    "url": "7ad6039d7f17f2211830.png",
    "revision": null
  }, {
    "url": "81c7522c8577952d5a26.png",
    "revision": null
  }, {
    "url": "8336bc22fe362607c20b.png",
    "revision": null
  }, {
    "url": "85bd53eb3d99122ed7b6.png",
    "revision": null
  }, {
    "url": "889e1cd0b0540d309903.png",
    "revision": null
  }, {
    "url": "8d1061ac7a9cb52d6e82.png",
    "revision": null
  }, {
    "url": "91c16833774caa3fb205.png",
    "revision": null
  }, {
    "url": "92809b74679f0dba572a.png",
    "revision": null
  }, {
    "url": "93d1087e9827a8f50874.png",
    "revision": null
  }, {
    "url": "98a3b89109cf7b7add36.png",
    "revision": null
  }, {
    "url": "9d54729ab60ade207545.png",
    "revision": null
  }, {
    "url": "9e1a78259afe7e683da9.png",
    "revision": null
  }, {
    "url": "9e2971661bc0d74b367c.png",
    "revision": null
  }, {
    "url": "a02843945d5d3a26e76e.png",
    "revision": null
  }, {
    "url": "a0c8e5ba0cea893c4853.png",
    "revision": null
  }, {
    "url": "a0e1a27f2679a8a11744.png",
    "revision": null
  }, {
    "url": "a16d883701bb23ac91a3.png",
    "revision": null
  }, {
    "url": "a2de952f9edb9d4b12db.png",
    "revision": null
  }, {
    "url": "a5c3c48f8cc1b6f016f9.png",
    "revision": null
  }, {
    "url": "a6216af9a93846187319.png",
    "revision": null
  }, {
    "url": "a682485fbccd0a18eeb9.svg",
    "revision": null
  }, {
    "url": "a8bcc6638b13565abacf.png",
    "revision": null
  }, {
    "url": "a908968f82040ce9188b.png",
    "revision": null
  }, {
    "url": "a98693888cbd51c43c93.png",
    "revision": null
  }, {
    "url": "a9dc9cf42b4bc05711ce.png",
    "revision": null
  }, {
    "url": "ab976546452fb3991e82.png",
    "revision": null
  }, {
    "url": "assets/android-chrome-144x144.png",
    "revision": "11354354627f8cb138452dcdbe9022fa"
  }, {
    "url": "assets/android-chrome-192x192.png",
    "revision": "a3017b897b33f109a2fe45bb7854b468"
  }, {
    "url": "assets/android-chrome-256x256.png",
    "revision": "547dbc879aab05d6821ddb5d6fdfb33c"
  }, {
    "url": "assets/android-chrome-36x36.png",
    "revision": "6b612d80b35ac672d70fc60f1b082919"
  }, {
    "url": "assets/android-chrome-384x384.png",
    "revision": "3ef5092e57ab1fa3f7473b79995d1fc0"
  }, {
    "url": "assets/android-chrome-48x48.png",
    "revision": "2cf31cab4a3670457c7e2a8cdecd30cc"
  }, {
    "url": "assets/android-chrome-512x512.png",
    "revision": "3d69dcf114653c23f8813e4aec67db89"
  }, {
    "url": "assets/android-chrome-72x72.png",
    "revision": "1c39082cd330955e3f0d34d50d21fafd"
  }, {
    "url": "assets/android-chrome-96x96.png",
    "revision": "64456d9d0fe6b9182a2c06a2e96f3ac1"
  }, {
    "url": "assets/apple-touch-icon-1024x1024.png",
    "revision": "37f3c8c8c804fa8ebb4eff640927329d"
  }, {
    "url": "assets/apple-touch-icon-114x114.png",
    "revision": "fc3c6c17f84bb67ca96448e5f79bd655"
  }, {
    "url": "assets/apple-touch-icon-120x120.png",
    "revision": "a1aa378ded13d7fd1b8233b45219308c"
  }, {
    "url": "assets/apple-touch-icon-144x144.png",
    "revision": "8443e9f1876c2e47c142a19d45e9eeef"
  }, {
    "url": "assets/apple-touch-icon-152x152.png",
    "revision": "61338981cd746fb225c299b265336c28"
  }, {
    "url": "assets/apple-touch-icon-167x167.png",
    "revision": "cca8a8f934311d9aea6867ddacf3abe6"
  }, {
    "url": "assets/apple-touch-icon-180x180.png",
    "revision": "a54978a7631e354df4a3f65eb9a22b4a"
  }, {
    "url": "assets/apple-touch-icon-57x57.png",
    "revision": "c3444f6e0128d0785520fd25bf9cafaf"
  }, {
    "url": "assets/apple-touch-icon-60x60.png",
    "revision": "df00a91fc53984932e28b00d0e68b788"
  }, {
    "url": "assets/apple-touch-icon-72x72.png",
    "revision": "2f9ba6d0a002b5a5fb6cc9f721249327"
  }, {
    "url": "assets/apple-touch-icon-76x76.png",
    "revision": "e1c272edc1213ef72af1ee3505f67496"
  }, {
    "url": "assets/apple-touch-icon-precomposed.png",
    "revision": "a54978a7631e354df4a3f65eb9a22b4a"
  }, {
    "url": "assets/apple-touch-icon.png",
    "revision": "a54978a7631e354df4a3f65eb9a22b4a"
  }, {
    "url": "assets/apple-touch-startup-image-1125x2436.png",
    "revision": "2bfcffb9866b0efd0d39af93cf687cae"
  }, {
    "url": "assets/apple-touch-startup-image-1136x640.png",
    "revision": "6047d890ebfafe955cd91ca54ed32c9f"
  }, {
    "url": "assets/apple-touch-startup-image-1242x2208.png",
    "revision": "f9d834a4dc4c8361139133b062d05e98"
  }, {
    "url": "assets/apple-touch-startup-image-1242x2688.png",
    "revision": "bdb469b2f620c374fef1b3fdd7c37b82"
  }, {
    "url": "assets/apple-touch-startup-image-1334x750.png",
    "revision": "cbbc4f34faff7a0fa96aee9c1fb9a261"
  }, {
    "url": "assets/apple-touch-startup-image-1536x2048.png",
    "revision": "cc6bc46820879eded703f26d4ebb50d2"
  }, {
    "url": "assets/apple-touch-startup-image-1620x2160.png",
    "revision": "a2272182cf6b4a93b99cab920d6f026e"
  }, {
    "url": "assets/apple-touch-startup-image-1668x2224.png",
    "revision": "93d1ed16a7ad065cd1a90cd73483e6aa"
  }, {
    "url": "assets/apple-touch-startup-image-1668x2388.png",
    "revision": "82f27ecc976172c0086b2fc33880106b"
  }, {
    "url": "assets/apple-touch-startup-image-1792x828.png",
    "revision": "3e858f7c4a28a6d1c7a3cecd37ce39ae"
  }, {
    "url": "assets/apple-touch-startup-image-2048x1536.png",
    "revision": "91f173d8bdf2718604654e0185a32644"
  }, {
    "url": "assets/apple-touch-startup-image-2048x2732.png",
    "revision": "411ef3525defd94c515744b03ea676d0"
  }, {
    "url": "assets/apple-touch-startup-image-2160x1620.png",
    "revision": "b2c85622de7c9edb35898da89438a8cd"
  }, {
    "url": "assets/apple-touch-startup-image-2208x1242.png",
    "revision": "e8e8b92df481332ea122974076c716eb"
  }, {
    "url": "assets/apple-touch-startup-image-2224x1668.png",
    "revision": "8746901f637987ddef6695a1fcc336c4"
  }, {
    "url": "assets/apple-touch-startup-image-2388x1668.png",
    "revision": "8ef6c5261c735269b72e26b73b5e52c6"
  }, {
    "url": "assets/apple-touch-startup-image-2436x1125.png",
    "revision": "10daea60e3441082efa1eee6b92242ec"
  }, {
    "url": "assets/apple-touch-startup-image-2688x1242.png",
    "revision": "d222b788d792c32c34aa8cf96ab4e491"
  }, {
    "url": "assets/apple-touch-startup-image-2732x2048.png",
    "revision": "89ff8e607e4bc98411138d9c55383571"
  }, {
    "url": "assets/apple-touch-startup-image-640x1136.png",
    "revision": "bed3dad3df53a254e17813ee593e9e29"
  }, {
    "url": "assets/apple-touch-startup-image-750x1334.png",
    "revision": "29376e2918db3395652749e44d1c0ba4"
  }, {
    "url": "assets/apple-touch-startup-image-828x1792.png",
    "revision": "cdf7847cbf1153f3931b5abb4c5d40c9"
  }, {
    "url": "assets/browserconfig.xml",
    "revision": "aacc0cdb9901cf7feeedeab44b3e2d14"
  }, {
    "url": "assets/favicon-16x16.png",
    "revision": "af906214796488ec8c7a7d434afb543a"
  }, {
    "url": "assets/favicon-32x32.png",
    "revision": "dc2546402cef92f37854843e5606d7e1"
  }, {
    "url": "assets/favicon-48x48.png",
    "revision": "2cf31cab4a3670457c7e2a8cdecd30cc"
  }, {
    "url": "assets/favicon.ico",
    "revision": "3589c390b6c70e707e277c4be4c16a05"
  }, {
    "url": "assets/firefox_app_128x128.png",
    "revision": "528b7486ae6bde5fa4422c01ac0aa2af"
  }, {
    "url": "assets/firefox_app_512x512.png",
    "revision": "ea05bf9048708b44d1f4225c954b0162"
  }, {
    "url": "assets/firefox_app_60x60.png",
    "revision": "5e2aeb9694dc69234790dbba4a9a04ab"
  }, {
    "url": "assets/manifest.json",
    "revision": "4492846a97d9146398804f2776ca1d5c"
  }, {
    "url": "assets/manifest.webapp",
    "revision": "31fefba6e08f041b9e592c9ad925d113"
  }, {
    "url": "assets/mstile-144x144.png",
    "revision": "11354354627f8cb138452dcdbe9022fa"
  }, {
    "url": "assets/mstile-150x150.png",
    "revision": "c57bf87681ae3a3f07b0bf850e0cf1a1"
  }, {
    "url": "assets/mstile-310x150.png",
    "revision": "3ee4cb3ccc5fb8e1530ebb9cad8d4b60"
  }, {
    "url": "assets/mstile-310x310.png",
    "revision": "306cc30828e163069ce489239510f29e"
  }, {
    "url": "assets/mstile-70x70.png",
    "revision": "9c11d41197f8ca2c2df15219de5f1b5e"
  }, {
    "url": "b4421f2bd33548a2ba01.png",
    "revision": null
  }, {
    "url": "b595afc58215489e1c37.png",
    "revision": null
  }, {
    "url": "b60f29729bb258cb0d2f.png",
    "revision": null
  }, {
    "url": "b84bed64bc4aa2f6e323.png",
    "revision": null
  }, {
    "url": "ba5c7e3626a05acb89de.png",
    "revision": null
  }, {
    "url": "bundle.js",
    "revision": "0a9082101f3a0be37be2148cf0b7ac6c"
  }, {
    "url": "c431ac6cbcd5a2b6f45e.png",
    "revision": null
  }, {
    "url": "c50b6f54da973bc71a62.png",
    "revision": null
  }, {
    "url": "c8252a82288a255fc3df.png",
    "revision": null
  }, {
    "url": "c86179cf544fa6e63673.png",
    "revision": null
  }, {
    "url": "c97cded512e08cbebecd.png",
    "revision": null
  }, {
    "url": "cbeb70ab7b2fc37d977d.png",
    "revision": null
  }, {
    "url": "cbf9913770104880147f.png",
    "revision": null
  }, {
    "url": "cc242c7307310d4dfe75.png",
    "revision": null
  }, {
    "url": "cd52f6ab5e7f5c608420.png",
    "revision": null
  }, {
    "url": "ce2278c7a1ee0099f434.png",
    "revision": null
  }, {
    "url": "d103e94da2b4939721a5.png",
    "revision": null
  }, {
    "url": "d7cf098ed2ca0bbefabe.png",
    "revision": null
  }, {
    "url": "daa2ea69559fd54ca69f.png",
    "revision": null
  }, {
    "url": "dd762c8b7f4585cc0d89.png",
    "revision": null
  }, {
    "url": "df2934f228b851eed89c.png",
    "revision": null
  }, {
    "url": "df4d3322e4e28a1fa457.svg",
    "revision": null
  }, {
    "url": "e0847d135a424ee5a0c7.png",
    "revision": null
  }, {
    "url": "e215cea87dc3635bc032.png",
    "revision": null
  }, {
    "url": "e25c6496f59aa7a1f65b.png",
    "revision": null
  }, {
    "url": "e329ca8ad71c4b6c3db2.png",
    "revision": null
  }, {
    "url": "e3e53b180f9cbf7943cb.png",
    "revision": null
  }, {
    "url": "e8744b2440ee592279ef.png",
    "revision": null
  }, {
    "url": "e98a25fe9f452f6e2a04.png",
    "revision": null
  }, {
    "url": "ebc421637e45ffcf160f.png",
    "revision": null
  }, {
    "url": "f39ce5c776fa392e2e89.svg",
    "revision": null
  }, {
    "url": "f5d1917bb59f93fb745b.png",
    "revision": null
  }, {
    "url": "f75fa59cf6edd73f3ccc.png",
    "revision": null
  }, {
    "url": "f8a72a2530a5569f6076.png",
    "revision": null
  }, {
    "url": "index.html",
    "revision": "5bb93cea67b91f3433efb2bae304be48"
  }], {});

}));