# Alexa Skill: 27eat

[![License](https://img.shields.io/github/license/onebytegone/alexa-27eat.svg)](./LICENSE)
[![Build Status](https://travis-ci.com/onebytegone/alexa-27eat.svg?branch=master)](https://travis-ci.com/onebytegone/alexa-27eat)
[![Coverage Status](https://coveralls.io/repos/github/onebytegone/alexa-27eat/badge.svg?branch=master)](https://coveralls.io/github/onebytegone/alexa-27eat?branch=master)
[![Dependency Status](https://david-dm.org/onebytegone/alexa-27eat.svg)](https://david-dm.org/onebytegone/alexa-27eat)
[![Dev Dependency Status](https://david-dm.org/onebytegone/alexa-27eat/dev-status.svg)](https://david-dm.org/onebytegone/alexa-27eat#info=devDependencies&view=table)

## What?

A simple Alexa skill that reads your daily menu to you.

## Why?

Because knowing "what's for lunch" is highly important.

## Setup

1. Create new skill at https://developer.amazon.com/alexa/
2. Copy the ID for your skill to the `menu-skill` variables

    ```
    $ cp services/menu-skill/vars/example.yml services/menu-skill/vars/dev.yml
    $ vi services/menu-skill/vars/dev.yml # and edit `skillID`
    ```

3. Deploy the skill's CloudFormation stack

   ```
   $ cd services/menu-skill/
   services/menu-skill $ sls deploy --stage dev
   ```

3. Copy the ARN for the created Lambda function to the "Endpoint" config in the Alexa developer console

   ```
   services/menu-skill $ sls info --verbose | grep 'MenuSkillLambdaFunctionQualifiedArn' | sed -E 's/^.*: (.*):[0-9]+$/\1/' | pbcopy
   ```

## License

This software is released under the MIT license. See [the license
file](LICENSE) for more details.

