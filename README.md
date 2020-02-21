National impact fee survey

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To start run

### `npm start`

To create the production version

### `npm run build`

or with docker

```bash
docker build . -t reactIF
docker create -ti --name tempBuildIF reactIF
docker cp tempBuildIF:/usr/src/app/build .
docker rm -f tempBuildIF
open build/index.html
```

To redeploy to github pages
`npm run deploy`
