# reslide

```powershell
mkdir reslide
cd reslide
git init
New-Item .gitignore
New-Item README.md
npm init
npm install --save-dev webpack webpack-dev-server
npm install --save-dev babel-loader babel-core
npm install --save-dev babel-preset-react babel-preset-es2015
New-Item webpack.config.js
New-Item .babelrc
mkdir public
New-Item public/index.html
mkdir src
New-Item src/index.js
npm install --save react react-dom
```