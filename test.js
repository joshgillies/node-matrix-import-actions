var Action = require('./')
var test = require('tape')
var tests = {
  add_web_path: {
    opts: {
      id: 'Site_1',
      path: 'test-site',
      assetId: '1'
    },
    expected: {
      action_id: 'add_Site_1_path',
      action_type: 'add_web_path',
      asset: '1',
      path: 'test-site'
    }
  },
  create_asset: {
    opts: {
      id: 'Site_1',
      parentId: 1,
      type: 'site'
    },
    expected: {
      action_id: 'create_Site_1',
      action_type: 'create_asset',
      type_code: 'site',
      parentid: 1,
      value: '',
      link_type: 1,
      is_dependant: 0,
      is_exclusive: 0
    }
  },
  create_file_asset: {
    opts: {
      id: 'Image_1',
      parentId: 1,
      type: 'image',
      file: '/images/pic.jpg'
    },
    expected: {
      action_id: 'create_Image_1',
      action_type: 'create_file_asset',
      type_code: 'image',
      file_path: '/images/pic.jpg',
      parentid: 1,
      value: '',
      link_type: 1,
      is_dependant: 0,
      is_exclusive: 0
    }
  },
  create_link: {
    opts: {
      to: 2,
      from: 1
    },
    expected: {
      action_id: 'link_type_1_2_to_1',
      action_type: 'create_link',
      asset: 1,
      assetid: 2,
      is_dependant: 0,
      is_exclusive: 0,
      is_major: 0,
      link_type: 1,
      value: ''
    }
  },
  set_attribute_value: {
    opts: {
      id: 'Site_1',
      assetId: 1,
      attribute: 'html',
      value: 'Test Site'
    },
    expected: {
      action_id: 'set_Site_1_html',
      action_type: 'set_attribute_value',
      asset: 1,
      attribute: 'html',
      value: 'Test Site'
    }
  },
  set_design_parse_file: {
    opts: {
      id: 'Design_1',
      assetId: 1,
      file: '/test.txt'
    },
    expected: {
      action_id: 'set_Design_1_parse_file',
      action_type: 'set_design_parse_file',
      asset: 1,
      file_path: '/test.txt'
    }
  },
  set_metadata_schema: {
    opts: {
      id: 'Site_1',
      assetId: 1,
      schemaId: 2,
      granted: 1,
      cascade: 1
    },
    expected: {
      action_id: 'set_Site_1_metadata_schema_2',
      action_type: 'set_metadata_schema',
      asset: 1,
      schemaid: 2,
      granted: 1,
      cascades: 1
    }
  },
  set_metadata_value: {
    opts: {
      id: 'Site_1',
      assetId: 1,
      fieldId: 2,
      value: 'Test metadata'
    },
    expected: {
      action_id: 'set_Site_1_metadata_field_2',
      action_type: 'set_metadata_value',
      asset: 1,
      fieldid: 2,
      value: 'Test metadata'
    }
  },
  set_permission: {
    opts: {
      assetId: 1,
      permission: 'read',
      muteError: true,
      granted: true,
      userId: 7
    },
    expected: {
      action_id: 'set_permission_1_read_7',
      action_type: 'set_permission',
      asset: 1,
      permission: 1,
      mute_error: 1,
      granted: 1,
      userid: 7
    }
  }
}

test('create action ids', function (t) {
  Object.keys(tests).forEach(function (test) {
    t.deepEqual(
      (Action(test, tests[test].opts)).action_id,
      tests[test].expected.action_id,
      test + ' action id'
    )
  })
  t.end()
})

test('create actions', function (t) {
  Object.keys(tests).forEach(function (test) {
    t.deepEqual(
      Action(test, tests[test].opts),
      tests[test].expected,
      'action \'' + test + '\' from Constructor object'
    )
  })
  t.end()
})
