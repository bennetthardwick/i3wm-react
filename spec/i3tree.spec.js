const I3Tree = require('../dist/services/i3tree.service').i3Tree;
const Tree = require('../dist/services/tree').Tree;
const _ = require('lodash');

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
    expect(i3Tree.getCurrentWindow()).to.not.equal("root");
  }); 

  it('deletes all windows in order', () => {
    try {
      i3Tree.newTerminal();
      i3Tree.newTerminal();
      i3Tree.newTerminal();
      i3Tree.newTerminal();

      i3Tree.closeWindow();
      i3Tree.closeWindow();
      i3Tree.closeWindow();
      i3Tree.closeWindow();
    } catch (e) {
      expect(e).to.equal(null);
    }
  });

  it('deletes all windows out of order', () => {
    try {
      let windows = [];

      for (let i = 0; i < 10; i++) {
        windows.push(i3Tree.newTerminal());
      }

      _.shuffle(windows).forEach(x => { i3Tree.setWindow(x); i3Tree.closeWindow() });

    } catch (e) {
      expect(e).to.equal(null);
    }
  });


});