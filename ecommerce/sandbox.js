const Redis = require("ioredis");
const redis = new Redis();

redis.set("foo", "bar");

// redis.get("foo", function (err, result) {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(result); // Promise resolves to "bar"
//     }
//   });


//   const itemsCache = redis.get("carts1")
//   await redis.set(`carts${userId}`, JSON.stringify(findProduct));
//   console.log(itemsCache);

  redis.get("carts2", function (err, result) {
    if (err) {
      console.error(err);
    } else {
      console.log(JSON.parse(result)); // Promise resolves to "bar"
    }
  });