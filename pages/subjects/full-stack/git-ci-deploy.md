# Full-stack webprogramozás -- Automate tests and deployment with a CI pipeline

## Resources

- https://blog.frankel.ch/travis-ci-tutorial-for-java-projects/
- https://medium.com/referminds/git-travisci-heroku-ci-cd-60daacd9c661
- https://docs.travis-ci.com/user/languages/java/
- https://docs.travis-ci.com/user/languages/javascript-with-nodejs/
- https://devcenter.heroku.com/articles/getting-started-with-java
- https://docs.travis-ci.com/user/deployment/heroku/
- https://medium.com/@shalandy/deploy-git-subdirectory-to-heroku-ea05e95fce1f


## Git

How and why using git should not be a new topic, but if you would like to go through the basics again, then there is a [Hungarian description about git](#!/subjects/full-stack/git).

In this section we would like to recommend you an easy-to-follow git workflow. Of course, there are many git workflows out there, and you can choose any of those, but usually they are aligned to specific needs of teams and projects. In the most basic workflow only one branch is used, the `main` branch. This branch is where all the good and experimental commits go, and it is hard to decide which commit should be considered to be ready to deploy. You can use other branches to add features to your application not affecting the `main` branch. In the simplest case use separate `dev` branch to develop your ideas, and when you are ready, you migrate your changes to the `main` branch by merging or rebasing. Consider using neutral namings, and [rename your `master` branch to `main`](https://www.git-tower.com/learn/git/faq/git-rename-master-to-main/).

```
git init
git branch -m master main
touch README.md
echo "hello" > README.md
git add .
git commit -m"initial commit"

git checkout -b dev
echo " world" >> README.md
git add .
git commit -m"new feature 1"

echo "!" >> README.md
git add .
git commit -m"new feature 2"

git checkout main
git merge dev
git push origin main
```

## Heroku

The Heroku platform can be used to deploy your application to the cloud. It has a free plan to do this with some reasonable restrictions.

First, you have to create an account. After that you can create a new application on the dashboard, by giving a unique name for your application, and selecting a region for it (Europe). At this point your application is ready and can be run.

For further operations you will need the Heroku CLI. Install it, and you can deploy your application with these commands:

```sh
# Login to Heroku
heroku login

# One time setup: create a git remote to heroku
heroku git:remote -a <APPNAME>

# Deploying your selected application from a subfolder
# The current folder must be the main directory
git subtree push --prefix server-java-issuetracker-restapi heroku main

# You can trace problems by viewing the logs
heroku logs --tail -a <APPNAME>
```

Your application will be accessible on `<APPNAME>.herokuapp.com`.

Common problems:
- Heroku will install your dependencies with `npm install --production`, i.e. it will install everything from `dependencies`, but nothing from `devDependencies` in the `package.json` file. Put all the necessary dependencies into `dependencies`.
- Read your server port from environmental variables, e.g.
  ```js
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}.`);
  });
  ```

## Continous integration

We will use Travis to add a continous integration service to our development pipeline. In short, Travis will watch our Github repository, and on every change in the `main` branch it will start a building process by allocating a virtual environment for us, cloning our repository, building, testing and deploying it according to our needs. The heart of this process is the `.travis.yml` file which should be located in the root folder of our repository. Here you can set the language of the project which will affect the default build and test commands, which can be overridden. You can read more about [the parts of the building process](https://docs.travis-ci.com/user/for-beginners/#builds-stages-jobs-and-phases) and [a job lifecycel](https://docs.travis-ci.com/user/job-lifecycle/) in the documentation. There are two main phases: the `install` and the `script` phase. `install` will install the necessary dependencies for our application and build it, and `script` is used for running tests. At the end of the process you can ask Travis to deploy your application to a specific provider.

But first you need to set up your Travis account and your repository. You need to sign up to Travis (e.g. with a Github account), and then you need to give access to Travis to watch and read all or the selected repsoitories. This can be set in the Account settings, and the press the "Activate" button. Then on the left panel you can search for your repository and select it. At this point you have to add a `.travis.yml` file to your project, commit it and push it to Github. Travis will percieve the changes, and will start its build process, which you can follow on the console.

### Java project

For our Java project we can use the following `.travis.yml` configuration file:

```yml
language: java

# we have to override the default version 11
jdk: openjdk8

# speeding up later downloads
cache: 
  directories:
    - $HOME/.m2

# our Java project resides in a subfolder, so before any important script runs
# we change to this directory
before_install: cd server-java-issuetracker-restapi
# In a Maven project we do not need to separately install the dependencies, 
# because it will install it as a part of the testing process automatically,
# so we can skip this step
install: true

# Here we override the default test script, which is: ./mvnw -B test
script: mvn -B test  # mvn clean install would work, too
```

### TypeScript project

```yml
language: node_js

# Use the most up-to-date version of Node.js
node_js: node

# our TypeScript project resides in a subfolder, so before any important script runs
# we change to this directory
before_install: cd server-typescript-issuetracker-restapi

# The default install script is perfect: npm install

# The default script is also perfect: npm test
```

### Deploying to Heroku

```yml
deploy:
  # do not change the working directory
  skip_cleanup: true

  # use Heroku
  provider: heroku

  # Read below
  api_key:
    secure: <SECURE HEROKU KEY KERE>
  
  # App name on Heroku
  app: fswp-java-restapi-issuetracker

  # Deploy if there were changes on the main branch
  on: main
```

The only critical part of the above configuration is generating the secured key. Here we have to put our personal Heroku API key, which can be found among Heroku personal account settings. But before we need to encrypt it with Travis. So we need the Heroku CLI, and the Travis CLI as well, but this latter depends on Ruby. If we successfully install the two CLIs, we have to log in to Heroku and Travis, and can [use the following command to generate the key](https://docs.travis-ci.com/user/deployment/heroku/):

```sh
# Check your Heroku token
heroku auth:token

# Generate the secured key
travis encrypt $(heroku auth:token) --pro
```

Or you can use `travis setup heroku` command to set up Heroku deployment.

### Multi-lingual project

```yml
# we need two different jobs
jobs:
  include:

  - language: java
    jdk: openjdk8
    cache:
      directories:
        - $HOME/.m2

    before_install: cd server-java-issuetracker-restapi
    install: true

    script: mvn -B test

    deploy:
      skip_cleanup: true
      provider: heroku
      api_key:
        secure: <SECURE HEROKU KEY KERE>
      app: fswp-java-restapi-issuetracker
      on: main

  - language: node_js
    node_js: node
    before_install: cd server-typescript-issuetracker-restapi
    deploy:
      skip_cleanup: true
      provider: heroku
      api_key:
        secure: <SECURE HEROKU KEY KERE>
      app: fswp-ts-restapi-issuetracker
      on: main
```
