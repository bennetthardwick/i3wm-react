const I3Tree = require('../dist/services/i3tree.service').i3Tree;
const Tree = require('../dist/services/tree').Tree;

const expect = require('chai').expect;

describe('i3tree', () => {

  var i3Tree;

  beforeEach(() => {
    i3Tree = new I3Tree();
  });

  afterEach(() => {
    delete i3Tree;
  });

  it('creates an i3Tree instance', () => {
    expect(i3Tree instanceof I3Tree).to.equal(true);
  });

  it('returns a primitive instance of tree', () => {
    expect(i3Tree.getTree() instanceof Tree).to.equal(true);
  });

  it('creates a new terminal', () => {
    i3Tree.newTerminal();
    expect(Object.keys(i3Tree.getTree().getLeaves()).length).to.equal(2);
  });

  it('returns the current window (no terminals)', () => {
    expect(i3Tree.getCurrentWindow()).to.equal("root");
  });

  it('returns the current focused terminal', () => {
    i3Tree.newTerminal();
    expect(i3Tree.getCurrentWindow() == "root").to.equal(false);
  }); 


});