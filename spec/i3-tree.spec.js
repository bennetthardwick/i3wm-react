const i3tree = require('../dist/services/i3tree.service');
const Tree = i3tree.Tree;
const expect = require('chai').expect;

describe('Tree backbone', () => {

  let tree = new Tree();
  var current_id;

  it("creates a tree instance", () => {
    expect(tree instanceof Tree).to.equal(true)
  });

  it("Is initialised with one leaf", () => {
    expect(Object.keys(tree.getLeaves()).length == 1).to.equal(true);
  }); 

  it("adds a new leaf", () => {
    current_id = tree.addLeaf({ parent: "root", type: "terminal" });
    expect(Object.keys(tree.getLeaves()).length == 2).to.equal(true);
  });

  it("removes a leaf", () => {
    tree.removeLeafById(current_id);
    expect(Object.keys(tree.getLeaves()).length == 1 && tree.getLeaves()["root"].children.length == 0).to.equal(true);
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
    tree = new Tree();
    tree.addLeaf({ parent: "root", type: "terminal" });
    tree.addLeaf({ parent: "root", type: "terminal" });
    tree.addLeaf({ parent: "root", type: "terminal" });
    tree.addLeaf({ id: "sub", parent: "root", type: "terminal" });
    tree.addLeaf({ parent: "sub", type: "terminal" });
    tree.addLeaf({ parent: "sub", type: "terminal" });
    tree.addLeaf({ parent: "sub", type: "terminal" });
    tree.removeLeafChildrenById("root");

    expect(JSON.stringify(tree.getLeaves()) == 
      JSON.stringify({ root: { id: 'root', type: 'root', children: [], parent: 'root' } }))
      .to.equal(true);

  });

  describe('remove from array utility', () => {
    it('removes an element from an array', () => {
      let array = [ "a", "b", "c" ];
      i3tree.removeElement(array, "b");
      expect(JSON.stringify(array)).to.equal(JSON.stringify(["a", "c"]));
    });

    it('returns the same index if another fills it\'s place', () => {
      let array = [ "a", "b", "c", "d" ];
      let index = i3tree.removeElement(array, "b");
      expect(index).to.equal(1);
    });

    it('returns -1 if there is no available index', () => {
      let array = [ "a" ];
      let index = i3tree.removeElement(array, "a");
      expect(index).to.equal(-1);
    });

    it('returns -1 if there is no member of that array', () => {
      let array = [ "a" ];
      let index = i3tree.removeElement(array, "b");
      expect(index).to.equal(-1);
    });

  })

});