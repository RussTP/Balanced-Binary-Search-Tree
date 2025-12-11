import Tree from "./bst.js";
import { prettyPrint } from "./prettyPrint.js";


export function getRandomArray(size) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }
    return arr;
}

const randomArray = getRandomArray(15);
const tree = new Tree(randomArray);

const levelOrder = [];
const inOrder = [];
const preOrder = [];
const postOrder = [];

console.log("Is balanced?", tree.isBalanced());

console.log("Level order:");
tree.levelOrderForEach(val => levelOrder.push(val));
prettyPrint(tree.root);

console.log("In order:");
tree.inOrderForEach(val => inOrder.push(val));
prettyPrint(tree.root);

console.log("Pre order:");
tree.preOrderForEach(val => preOrder.push(val));
prettyPrint(tree.root);

console.log("post order:");
tree.postOrderForEach(val => postOrder.push(val));
prettyPrint(tree.root);

// this will unbalance the tree 

tree.insert(101);
tree.insert(102);


console.log("Is balanced?", tree.isBalanced());

console.log("Level order:");
tree.levelOrderForEach(val => levelOrder.push(val));
prettyPrint(tree.root);

console.log("In order:");
tree.inOrderForEach(val => inOrder.push(val));
prettyPrint(tree.root);

console.log("Pre order:");
tree.preOrderForEach(val => preOrder.push(val));
prettyPrint(tree.root);

console.log("post order:");
tree.postOrderForEach(val => postOrder.push(val));
prettyPrint(tree.root);

tree.rebalance();

console.log("Is balanced?", tree.isBalanced());

console.log("Level order:");
tree.levelOrderForEach(val => levelOrder.push(val));
prettyPrint(tree.root);

console.log("In order:");
tree.inOrderForEach(val => inOrder.push(val));
prettyPrint(tree.root);

console.log("Pre order:");
tree.preOrderForEach(val => preOrder.push(val));
prettyPrint(tree.root);

console.log("post order:");
tree.postOrderForEach(val => postOrder.push(val));
prettyPrint(tree.root);

