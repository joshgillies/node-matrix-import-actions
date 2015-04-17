# node-matrix-import-actions

Action specification for Squiz Matrix' "[Import Assets from XML Tool]".

[![Build Status](https://travis-ci.org/joshgillies/node-matrix-import-actions.svg)](https://travis-ci.org/joshgillies/node-matrix-import-actions)

## Example

```js
var Action = require('node-matrix-import-actions');

var createAction = new Action('create_asset', {
  id: 'Site_1',
  parentId: 1,
  type: 'site'
});

```

## API

### Actions

An action is a task performed against a Squiz Matrix system.

`node-matrix-import-actions` provides an Action constructor via `require('node-matrix-import-actions')`

#### Action(type, opts)

`type` is a String representing the type of action. The following types are available:

#### Action('add_path', opts)

A `add_path` Action accepts an Object as it's second argument `opts` with the following properties:

  * `opts.id`
  * `opts.path`
  * `opts.assetId`

#### Action('create_asset', opts)

A `create_asset` Action accepts an Object as it's second argument `opts` with the following properties:

  * `opts.id`
  * `opts.parentId`
  * `opts.type`
  * `opts.link`
  * `opts.value`
  * `opts.dependant`
  * `opts.exclusive`

#### Action('create_link', opts)

A `create_link` Action accepts an Object as it's second argument `opts` with the following properties:

  * `opts.to`
  * `opts.from`
  * `opts.link`
  * `opts.value`
  * `opts.dependant`
  * `opts.exclusive`
  * `opts.major`

#### Action('set_attribute', opts)

A `set_attribute` Action accepts an Object as it's second argument `opts` with the following properties:

  * `opts.id`
  * `opts.assetId`
  * `opts.attribute`
  * `opts.value`

#### Action('set_metadata_schema', opts)

A `set_metadata_schema` Action accepts an Object as it's second argument `opts` with the following properties:

  * `opts.id`
  * `opts.assetId`
  * `opts.schemaId`
  * `opts.granted`
  * `opts.cascade`

#### Action('set_metadata_value', opts)

A `set_metadata_value` Action accepts an Object as it's second argument `opts` with the following properties:

  * `opts.id`
  * `opts.assetId`
  * `opts.fieldId`
  * `opts.value`

#### Action('set_permission', opts)

A `set_permission` Action accepts an Object as it's second argument `opts` with the following properties:

  * `opts.assetId`
  * `opts.permission`
  * `opts.muteError`
  * `opts.granted`
  * `opts.userId`

## License

MIT

[Import Assets from XML Tool]: http://manuals.matrix.squizsuite.net/tools/chapters/import-assets-from-xml-tool
