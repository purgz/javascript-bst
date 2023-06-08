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
      if (root.left == null) {
        return root.right;
      } else if (root.right == null) {
        return root.left;
      }

      //2 children, find the inorder successor and set value to root
      root.data = this.min(root.right);

      //delete the inorder successor by calling delete function again
      root.right = this.delete(root.right, root.data);
      //console.log(root);
    }

    return root;
  }

  min(root) {
    let min = root.data;
    while (root.left != null) {
      min = root.left.data;
      root = root.left;
    }
    //console.log(min);
    return min;
  }

  find(root, value) {
    if (root == null) {
      return root;
    }

    if (value < root.data) {
      return this.find(root.left, value);
    } else if (value > root.data) {
      return this.find(root.right, value);
    } else {
      return root;
    }
  }

  //breadth first traversal
  levelOrder(root) {
    const queue = [];
    const arr = [];

    if (root) queue.push(root);

    console.log(queue);
    while (queue.length) {
      const node = queue.shift();
      arr.push(node.data);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    console.log(arr);
  }

  inOrder(root, arr = []) {
    if (root == null) {
      return;
    }

    if (root.left) this.inOrder(root.left, arr);

    arr.push(root.data);

    if (root.right) this.inOrder(root.right, arr);

    return arr;
  }

  preOrder(root, arr = []) {
    if (root == null) {
      return;
    }

    arr.push(root.data);

    if (root.left) this.preOrder(root.left, arr);
    if (root.right) this.preOrder(root.right, arr);

    return arr;
  }

  postOrder(root, arr = []) {
    if (root == null) {
      return;
    }

    if (root.left) this.postOrder(root.left, arr);
    if (root.right) this.postOrder(root.right, arr);

    arr.push(root.data);
    return arr;
  }

  height(root, leftHeight = 0, rightHeight = 0) {
    if (root == null) {
      return -1;
    }

    leftHeight = this.height(root.left);
    rightHeight = this.height(root.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, root = this.root, depth = 0) {
    if (node == null) {
      return -1;
    }

    if (node.data == root.data) {
      return 0;
    } else {
      if (node.data < root.data) {
        depth = this.depth(node, root.left);
      } else if (node.data > root.data) {
        depth = this.depth(node, root.right);
      } else {
        return depth--;
      }
      return depth + 1;
    }
  }

  isBalanced(root) {
    if (root == null) {
      return true;
    }

    let leftHeight = this.height(root.left);
    let rightHeight = this.height(root.right);

    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(root.left) &&
      this.isBalanced(root.right)
    ) {
      return true;
    }

    return false;
  }

  rebalance(){
    let arr = this.inOrder(this.root);
    
    this.root = buildTree(arr);
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




tree.insert(tree.root, 7000);
tree.insert(tree.root, 6999);
tree.insert(tree.root, 6999);
tree.insert(tree.root, 7001);
tree.insert(tree.root, 7002);
tree.insert(tree.root, 7003);
tree.insert(tree.root, 7004);





//tree.delete(tree.root, 9);
prettyPrint(tree.root);

/*

*/

tree.rebalance();

console.log("================================");

prettyPrint(tree.root);

tree.levelOrder(tree.root);

console.log(tree.inOrder(tree.root));
console.log(tree.preOrder(tree.root));
console.log(tree.postOrder(tree.root));
