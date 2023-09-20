// 4. What gets logged?
// setTimeout(() => console.log(1));
// Promise.resolve().then(() => console.log(2));
// Promise.resolve().then(() => setTimeout(() => console.log(3)));
// new Promise(() => console.log(4));
// setTimeout(() => console.log(5));
// OUTPUT: 4, 2, 1, 5,3

// 6. What's the output?
// const member = {
//   name: "Jane",
//   address: { street: "101 Main St" },
// };
// const member2 = { ...member };
// member.address.street = "102 Main St";
// member.name = "Sarah";

// console.log(member2);
// { name: 'Jane', address: { street: '102 Main St' } }

// 9. What statements are true about this code block?
// function addMember(name) {
//   return { name, createdAt: Date.now() };
// }

// let obj1 = addMember("John");
// let obj2 = addMember("Sarah");

// obj1.friend = obj2;
// obj2.friend = obj1;

// obj1 = null;
// obj2 = null;
