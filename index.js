var helpers = require('./helpers')
var actionId = helpers.actionId
var keyShorthand = helpers.keyShorthand

var ACTIONS = {
  add_web_path: actionId('add_{0}_path'),
  create_asset: actionId('create_{0}'),
  create_file_asset: actionId('create_{0}'),
  create_link: actionId('link_{0}_{1}_to_{2}', 3),
  set_attribute_value: actionId('set_{0}_{1}', 2),
  set_design_parse_file: actionId('set_{0}_parse_file'),
  set_metadata_schema: actionId('set_{0}_metadata_schema_{1}', 2),
  set_metadata_value: actionId('set_{0}_metadata_field_{1}', 2),
  set_permission: actionId('set_permission_{0}_{1}_{2}', 3)
}

var LINKS = {
  TYPE_1: 1,
  TYPE_2: 2,
  TYPE_3: 4,
  NOTICE: 8,
  1: 'type_1',
  2: 'type_2',
  4: 'type_3',
  8: 'notice'
}

var PERMISSIONS = {
  READ: 1,
  WRITE: 2,
  ADMIN: 3
}

var PUBLIC_USER = 7

function setActionId (type) {
  return function actionId () {
    var args = Array.prototype.slice.call(arguments)
    var action = ACTIONS[type]
    return action.apply(null, args)
  }
}

function Action (type, opts) {
  if (!(this instanceof Action)) {
    return new Action(type, opts)
  }

  var DEFAULTS = {
    action_id: setActionId(keyShorthand(type)),
    action_type: keyShorthand(type),
    asset: opts.assetId || opts.from, // id of asset performing action against
    assetid: opts.to, // id of asset linking to
    attribute: keyShorthand(opts.attribute),
    cascades: opts.cascade ? 1 : 0,
    fieldid: opts.fieldId,
    file_path: opts.file || '',
    granted: opts.granted ? 1 : 0,
    is_dependant: opts.dependant ? 1 : 0,
    is_exclusive: opts.exclusive ? 1 : 0,
    is_major: opts.major ? 1 : 0, // ???
    link_type: typeof opts.link === 'string' ?
      LINKS[opts.link.toUpperCase()] ?
        LINKS[opts.link.toUpperCase()] : LINKS['TYPE_1']
      : opts.link || 1,
    mute_error: opts.muteError ? 1 : 0, // ???
    parentid: opts.parentId || 1,
    path: opts.path, // web path
    permission: typeof opts.permission === 'string' ?
      PERMISSIONS[opts.permission.toUpperCase()] ?
        PERMISSIONS[opts.permission.toUpperCase()] : PERMISSIONS['READ']
      : opts.permission || 1,
    schemaid: opts.schemaId,
    type_code: opts.type,
    userid: opts.userId || PUBLIC_USER,
    value: opts.value || ''
  }

  var properties = ['action_type']

  switch (DEFAULTS.action_type) {
    case 'add_web_path':
      this.action_id = DEFAULTS.action_id.call(null, opts.id)
      properties.push('asset', 'path')
      break
    case 'create_asset':
      this.action_id = DEFAULTS.action_id.call(null, opts.id)
      properties.push('type_code', 'parentid', 'value', 'link_type', 'is_dependant', 'is_exclusive')
      break
    case 'create_file_asset':
      this.action_id = DEFAULTS.action_id.call(null, opts.id)
      properties.push('file_path', 'type_code', 'parentid', 'value', 'link_type', 'is_dependant', 'is_exclusive')
      break
    case 'create_link':
      this.action_id = DEFAULTS.action_id.call(null, LINKS[DEFAULTS.link_type], opts.to, opts.from)
      properties.push('asset', 'value', 'link_type', 'is_dependant', 'is_exclusive', 'assetid', 'is_major')
      break
    case 'set_attribute_value':
      this.action_id = DEFAULTS.action_id.call(null, opts.id, opts.attribute)
      properties.push('asset', 'attribute', 'value')
      break
    case 'set_design_parse_file':
      this.action_id = DEFAULTS.action_id.call(null, opts.id)
      properties.push('asset', 'file_path')
      break
    case 'set_metadata_schema':
      this.action_id = DEFAULTS.action_id.call(null, opts.id, opts.schemaId)
      properties.push('asset', 'schemaid', 'granted', 'cascades')
      break
    case 'set_metadata_value':
      this.action_id = DEFAULTS.action_id.call(null, opts.id, opts.fieldId)
      properties.push('asset', 'fieldid', 'value')
      break
    case 'set_permission':
      this.action_id = DEFAULTS.action_id.call(null, opts.assetId, opts.permission, opts.userId)
      properties.push('asset', 'permission', 'mute_error', 'granted', 'userid')
      break
    default:
      throw new Error('Unknown action type of \'' + type + '\'')
  }

  properties.forEach(function assignDefaults (value) {
    this[value] = DEFAULTS[value]
  }, this)
}

module.exports = Action
