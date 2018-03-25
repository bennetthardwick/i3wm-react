const TreeUtil = require('../dist/services/tree');
const Tree = TreeUtil.Tree;
const expect = require('chai').expect;

describe('Tree backbone', () => {

  var tree;
  var current_id;

  beforeEach(() => {
    tree = new Tree;
  });

  afterEach(() => {
    delete tree;
    current_id = null;
  })

  it("creates a tree instance", () => {
    expect(tree instanceof Tree).to.equal(true)
  });

  it("Is initialised with one leaf", () => {
    expect(Object.keys(tree.getLeaves()).length).to.equal(1);
  }); 

  it("adds a new leaf", () => {
    current_id = tree.addLeaf({ parent: "root", type: "terminal" });
    expect(Object.keys(tree.getLeaves()).length).to.equal(2);
  });

  it("removes a leaf", () => {
    current_id = tree.addLeaf({ parent: "root", type: "terminal" });
    tree.removeLeafById(current_id);
    expect(Object.keys(tree.getLeaves()).length == 1 && tree.getLeaves()["root"].children.length).to.equal(0);
  });

  it("appends a leaf between two leafs", () => {
    tree.addLeaf({ parent: "root", id: "john", type: "terminal" });
    tree.appendLeaf("john", { id: "middle", type: "v_split" });

    let tree_data = tree.getLeaves();
    expect(tree_data["john"].children.length === 0
        && tree_data["middle"].children[0] === "john" 
        && tree_data["root"].children[0] === "middle")
        .to.equal(true);
  });

  it("recursively removes all children", () => {
    tree.addLeaf({ parent: "root", type: "terminal" });
    tree.addLeaf({ parent: "root", type: "terminal" });
    tree.addLeaf({ parent: "root", type: "terminal" });
    tree.addLeaf({ id: "sub", parent: "root", type: "terminal" });
    tree.addLeaf({ parent: "sub", type: "terminal" });
    tree.addLeaf({ parent: "sub", type: "terminal" });
    tree.addLeaf({ parent: "sub", type: "terminal" });
    tree.removeLeafChildrenById("root");

    expect(JSON.stringify(tree.getLeaves()))
      .to.equal(JSON.stringify({ root: { id: 'root', type: 'root', children: [], parent: 'root' } }));
  });
});

describe('Remove from array utility', () => {

  it('removes an element from an array', () => {
    let array = [ "a", "b", "c" ];
    TreeUtil.removeElement(array, "b");
    expect(JSON.stringify(array)).to.equal(JSON.stringify(["a", "c"]));
  });

  it('returns the same index if another fills it\'s place', () => {
    let array = [ "a", "b", "c", "d" ];
    let index = TreeUtil.removeElement(array, "b");
    expect(index).to.equal(1);
  });

  it('returns -1 if there is no available index', () => {
    let array = [ "a" ];
    let index = TreeUtil.removeElement(array, "a");
    expect(index).to.equal(-1);
  });

  it('returns -1 if there is no member of that array', () => {
    let array = [ "a" ];
    let index = TreeUtil.removeElement(array, "b");
    expect(index).to.equal(-1);
  });

});