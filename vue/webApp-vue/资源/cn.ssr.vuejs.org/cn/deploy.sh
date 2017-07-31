rm -rf _book
gitbook install
gitbook build
mkdir _book
cd _book
git init
git add -A
git commit -m 'update book'
git push -f git@github.com:sunpeijun/vue-ssr-doc.git master:gh-pages