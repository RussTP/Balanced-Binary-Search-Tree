import { Node } from "./node.js";
import { prettyPrint } from "./prettyPrint.js";
export class Tree {
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

    }

    inOrderForEach(callback) {

    }

    postOrderForEach(callback) {

    }

    height(value) {

    }

    depth(value) {

    }

    isBalanced() {

    }

    rebalance() {

    }



}

/*const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log("Root is:", tree.root);
tree.insert(50);
tree.insert(25);
tree.delete(7);
tree.delete(23);
tree.find(67);
prettyPrint(tree.root);
*/
const tree = new Tree([5, 3, 7, 1, 9]);
console.log(tree.find(7));  // Should return the node with data: 7
console.log(tree.find(99)); // Should return null
prettyPrint(tree.root);