let data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 17];

class Node {
  constructor(left, right, data) {
    this.left = left;
    this.right = right;
    this.data = data;
  }
}

class Tree {
  constructor(data) {
    this.root = buildTree(data);
  }

  insert(root, value) {
    //check if root is null
    if (root == null) {
      let root = new Node(null, null, value);
      return root;
    }

    //left
    if (value < root.data) {
      //check if left is null
      if (root.left == null) {
        root.left = new Node(null, null, value);
        return root;
      } else {
        root.left = this.insert(root.left, value);
        return root;
      }
    } else if (value > root.data) {
      //check if right is null
      if (root.right == null) {
        root.right = new Node(null, null, value);
        return root;
      } else {
        root.right = this.insert(root.right, value);
        return root;
      }
    } else {
      //if value already exists make no changes
      console.log("Value already exists");
      return root;
    }
  }

  delete(root, value) {
    if (root == null) {
      return root;
    }

    if (value < root.data) {
      root.left = this.delete(root.left, value);
    } else if (value > root.data) {
      root.right = this.delete(root.right, value);
    } else {
        if (root.left == null){
            return root.right;
        } else if (root.right == null){
            return root.left;
        }
        
        //2 children, find the inorder successor and set value to root
        root.data = this.min(root.right);

        //delete the inorder successor by calling delete function again
        root.right = this.delete(root.right,root.data);
        //console.log(root);
    }
    
    return root;
  }

  
  min(root){
    let min = root.data;
    while(root.left != null){
        min = root.left.data;
        root = root.left;
    }
    //console.log(min);
    return min;
  }

}

function buildTree(data) {
  if (data.length == 0) {
    return null;
  }

  if (data.length == 1) {
    return new Node(null, null, data[0]);
  }
  //sort
  data = data.sort((a, b) => {
    return a - b;
  });
  //remove duplicates
  data = [...new Set(data)];
  //console.log(data);

  let i = Math.floor(data.length / 2);
  //console.log(data[i]);

  let left = data.slice(0, i);
  let right = data.slice(i + 1, data.length);

  let node = new Node(buildTree(left), buildTree(right), data[i]);
  return node;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let tree = new Tree(data);
//prettyPrint(tree.root);

/*
tree.insert(tree.root, 7000);
tree.insert(tree.root, 6999);
tree.insert(tree.root, 6999);
tree.insert(tree.root, 7001);
tree.insert(tree.root, -5);
*/

prettyPrint(tree.root);

tree.delete(tree.root,9);
prettyPrint(tree.root);
