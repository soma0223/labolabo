#!/bin/sh
# うたラボ：claude.ai 用の app/uta-lab.html を、ホーム画面に追加できるブラウザ版 uta/index.html に包む
set -e
cd "$(dirname "$0")/.."
{
  printf '<!doctype html><html lang="ja"><head><meta charset="utf-8">\n'
  printf '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
  printf '<link rel="manifest" href="manifest.webmanifest">\n'
  printf '<link rel="icon" href="icon-192.png">\n'
  printf '<link rel="apple-touch-icon" href="apple-touch-icon.png">\n'
  printf '<meta name="theme-color" content="#0b7a80">\n'
  printf '<meta name="apple-mobile-web-app-capable" content="yes">\n'
  printf '<meta name="mobile-web-app-capable" content="yes">\n'
  printf '<meta name="apple-mobile-web-app-title" content="うたラボ">\n'
  printf '<meta name="apple-mobile-web-app-status-bar-style" content="default">\n'
  printf '<style>:root{padding-top:env(safe-area-inset-top,0px)}</style>\n'
  printf '</head><body>\n'
  cat app/uta-lab.html
  printf '<script>if("serviceWorker" in navigator&&location.protocol==="https:"){navigator.serviceWorker.register("sw.js").catch(function(){});}</script>\n'
  printf '</body></html>\n'
} > uta/index.html
V=$(sha1sum uta/index.html | cut -c1-10)
sed "s/__VERSION__/$V/" tools/uta-sw.template.js > uta/sw.js
echo "built uta/index.html ($V)"
