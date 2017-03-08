/*Found this at http://javascriptplayground.com/blog/2015/02/promises/ */

let count = 0;

let http = () => {// this is a random async call that the recursive function itterates through
  if(count === 0) {
    count++;
    return Promise.resolve({ more: true, user: { name: 'jack', age: 22 } });
  } else {
    return Promise.resolve({ more: false, user: { name: 'isaac', age: 21 } });
  }
};

let fetchData = () => { // this function holds the recursive function and returns the data i want as a promise
  var goFetch = (users) => { // this isthe main recusive function
    return http().then(function(data) { //return the async function 'http'
      users.push(data.user);
      if(data.more) { // check condition to determine if i need to re-call or return
        return goFetch(users);
      } else {
        return users;
      }
    });
  }

  return goFetch([]);
};


fetchData().then((x) => { // using the recursion
  console.log(x)
});
