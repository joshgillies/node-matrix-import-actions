var helpers = require('./helpers');
var Action = require('./');
var test = require('tape');
var tests = {
  add_path: {
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
  create_link: {
    opts: {
      to: 2,
      from: 1
    },
    expected: {
      action_id: 'link_1_2_to_1',
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
  set_attribute: {
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
  set_permission: {
    opts: {
      assetId: 1,
      permission: 'read',
      granted: true,
      userId: 7
    },
    expected: {
      action_id: 'set_permission_1_read_7',
      action_type: 'set_permission',
      asset: 1,
      permission: 1,
      granted: 1,
      userid: 7
    }
  }
};

test('use shorthand helpers', function(t) {
  t.equal(helpers.keyShorthand('add_path'), 'add_web_path', 'shorthand selector');
  t.equal(helpers.keyShorthand('create_asset'), 'create_asset', 'passthrough when no shorthand is available');
  t.end();
});

test('join asset type with id', function(t) {
  t.equal(helpers.asset('Site', '1'), 'Site_1');
  t.end();
});

test('create action ids', function(t) {
  Object.keys(tests).forEach(function(test) {
    t.deepEqual(
      (Action(test, tests[test].opts)).action_id,
      tests[test].expected.action_id,
      test + ' action id'
    );
  });
  t.end();
});

test('create actions', function(t) {
  Object.keys(tests).forEach(function(test) {
    t.deepEqual(
      Action(test, tests[test].opts),
      tests[test].expected,
      'action \'' + test + '\' from Constructor object'
    );
  });
  t.end();
});
