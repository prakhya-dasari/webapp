const userService = require('../Services/user_service');
const db = require('../Database/db');
const basicAuth = require('basic-auth');
const bcrypt = require('bcryptjs');
module.exports = authorize;

async function authorize (req,res,next){
  const data = basicAuth(req);
  if (!data || !data.name || !data.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  console.log(data)
  const user = await db.User.findOne({where:{username:data.name}})
  if(!user){
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    console.log("user not found")
    res.status(404).send("User not found")
    return
  }
  if(req.params.pid){
    const product = await db.Product.findOne({where:{id:req.params.pid}})
    if(!product){
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      console.log("product not found")
      // res.sendStatus(400);
      res.status(404).send("Product not found")
      // res.message = "Product not found";
      return
    }

  if (req.params.pid && user.id !=product.owner_user_id ) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(403);
    return
  }
}

  if (req.params.id && user.id !=req.params.id ) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(403).send("Forbidden-user id");
    return
  }


  if (!(await bcrypt.compare(data.pass, user.password)))
  {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401).send("wrong password");
    return
  }
  console.log("authentication user details")
  console.log(user) 
  req.ctx={};
  req.ctx.user = data;
  req.ctx.user.id = user.id;
  next()
}