import { Node } from "./node.js";
export default class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array, start, end) {


    if (start === undefined) {
        array = [...new Set(array)].sort((a, b) => a - b);
        console.log("sorted array:", array)
        start = 0;
        end = array.length - 1;
    }

    if (start > end) return null;
    
    let mid = Math.floor((start + end) / 2);
    let root = new Node(array[mid])

    root.left = this.buildTree(array, start, mid -1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
    }

    insert(value) {
        this.root = this.insertNode(this.root, value);
    }
    
    insertNode(node, value) {
        if (node === null) return new Node(value);

        if (value < node.data) {
            node.left = this.insertNode(node.left, value);
        } else {
            node.right = this.insertNode(node.right, value);
        }
        return node;
    }

    getSuccessor(curr) {
        curr = curr.right;
        while (curr !== null && curr.left !== null)
            curr = curr.left;
        return curr;
    }

    delete(value) {
        this.root = this.deleteItem(this.root, value);
    }

    deleteItem(node, value) {
        if (node === null) return node;

        if (value < node.data) {
            node.left = this.deleteItem(node.left, value);
        } else if (value > node.data) {
            node.right = this.deleteItem(node.right, value);
        } else {
            if (node.left === null)
                return node.right;
            if (node.right === null)
                return node.left;

            const succ = this.getSuccessor(node);
            node.data = succ.data;
            node.right = this.deleteItem(node.right, succ.data);
        }

        return node;

    }

    find(value) {
        return this.findNode(this.root, value);
    }


    findNode(node, value) {
        if (node === null) return node;

        if (value === node.data) return node;

        if (value < node.data) {
            return this.findNode(node.left, value);
        } else {
            return this.findNode(node.right, value);
        }

    }

    levelOrderForEach(callback) {
        if (!callback) {
              throw new Error("No callback has been given an argument");
        }

        if (this.root === null) return; 

        const queue = [this.root];

        while (queue.length > 0) {
            const node = queue.shift();
            callback(node.data);

            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            } 
        }
    }

    inOrderForEach(callback) {
        if (!callback) {
            throw new Error("No callback has been given an argument");
        }
        function traverse(node) {
            if (node === null) return;

            traverse(node.left);
            callback(node.data);
            traverse(node.right);
        }
        traverse(this.root);



    }

    preOrderForEach(callback) {
        if (!callback) {
            throw new Error("No callback has been given an argument");
        }
            function traverse(node) {
                if (node === null) return;

                callback(node.data);
                traverse(node.left);
                traverse(node.right);
            }
            traverse(this.root);

        }


    postOrderForEach(callback) {
            if (!callback) {
                throw new Error("No callback has been given an argument");
        }
        function traverse(node) {
            if (node === null) return;

            traverse(node.left);
            traverse(node.right);
            callback(node.data);
        }
        traverse(this.root);
    }

    height(value) {
        if (value === null) return;

        const node = this.find(value);
        return this.calcHeight(node);
    }

    calcHeight(node) {
        if (node === null) return -1;

        const leftHeight = this.calcHeight(node.left);
        const rightHeight = this.calcHeight(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(value) {
        if (value === null) return;
        return this.calcDepth(this.root, value, 0);
    }

    calcDepth(node, value, currentDepth) {
        if (node === null) return -1;
        if (node.data === value) return currentDepth;

        const leftResult = this.calcDepth(node.left, value, currentDepth + 1);
        if (leftResult !== -1) return leftResult;

        const rightResult = this.calcDepth(node.right, value, currentDepth + 1);
        return rightResult; 
        


    }

    isBalanced() {
      return this.checkBalance(this.root);

    }

    checkBalance(node) {
        if (node === null) return true;
        const leftHeight = this.calcHeight(node.left);
        const rightHeight = this.calcHeight(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) return false;
       
        return this.checkBalance(node.left) && this.checkBalance(node.right);
    }

    rebalance() {
        const newArr = [];
        this.inOrderForEach(value => newArr.push(value));

        this.root = this.buildTree(newArr);
    }
}


