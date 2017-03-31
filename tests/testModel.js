var assert  = require('assert');
var Model   = require('../models/model.js')
// node


describe('Model', function() {
  describe('fill()', function() {
    it('should store all given attributes directly on the object', function() {
        model = new Model()

        model.fill({id:1, name: 'John Doe', number: 2})

        assert.equal(model.id, 1);
        assert.equal(model.name, 'John Doe');
        assert.equal(model.number, 2);
    });
    it('should store all given attributes within the attributes attribute', function() {
        assert.equal(model.attributes['id'], 1);
        assert.equal(model.attributes['name'], 'John Doe');
        assert.equal(model.attributes['number'], 2);
    });
  });

  describe('setAttribute()', function() {
    it('should store the given attribute directly on the object', function() {
        sa = new Model()

        sa.setAttribute('id', 1);
        sa.setAttribute('name', 'John Doe');
        sa.setAttribute('number', 2);

        assert.equal(sa.id, 1);
        assert.equal(sa.name, 'John Doe');
        assert.equal(sa.number, 2);
    });
    it('should store the given attribute within the attributes attribute', function() {
        assert.equal(model.attributes['id'], 1);
        assert.equal(model.attributes['name'], 'John Doe');
        assert.equal(model.attributes['number'], 2);
    });
  });

  describe('getAttribute()', function() {
    it('should get the given attribute from the attributes attribute', function() {
        assert.equal(sa.getAttribute('id'), 1);
        assert.equal(sa.getAttribute('name'), 'John Doe');
        assert.equal(sa.getAttribute('number'), 2);
    });
  });

});