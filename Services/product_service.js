const bcrypt = require('bcryptjs');
const db = require('../Database/db'); 
const sss = require('../s3');
const logger = require('../logger');

module.exports = {
    create_Newproduct,
    update_ProductDetails,
    getProductById,
    getProduct,
    patch,
    deleteProduct
}
async function  create_Newproduct(params, req, res) {
    logger.info("Please here me prod service");
    if (await db.Product.findOne({ where: { sku: params.sku } })) {
        res.status(400).send("SKU already exists");
        throw 'SKU "' + params.sku + '" already exists, please enter a different SKU';
    }

const userId = req.ctx.user.id;
let date_ob = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
params.date_added = date_ob;
params.date_last_updated = date_ob;
params.owner_user_id = userId;

if (!(Number.isInteger(params.quantity) && params.quantity >= 0 && params.quantity <= 100)){
   throw 'Enter a valid quantity';
}

//creating a record in the database using the create library (sequalize)
const product = await db.Product.create(params);
let {id,name,description,sku,manufacturer,quantity,date_added,date_last_updated,owner_user_id} = product.get();
return {id,name,description,sku,manufacturer,quantity,date_added,date_last_updated,owner_user_id} ;

}

async function update_ProductDetails(req,res){
    const updateProduct = req.body;
    const product = await getProduct(req.params.pid);

    let date_ob = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    updateProduct.date_last_updated = date_ob
     const userId = req.ctx.user.id;
    if(userId != product.dataValues.owner_user_id){
        res.sendStatus(403);
        throw 'You are forbidden to update this product';
    }

    if (!(Number.isInteger(updateProduct.quantity) && (updateProduct.quantity >= 0 && updateProduct.quantity<=100))){
        throw 'Enter a valid quantity';
    }
    // console.log(req.params.productId);
    const new_data = await db.Product.findOne({ where: { id: req.params.pid } });
    // console.log(new_data.dataValues.sku);
    if(new_data.dataValues.sku != updateProduct.sku){
        res.status(400).send("SKU already exists");
    if (await db.Product.findOne({ where: { sku: updateProduct.sku } })) {
        throw 'SKU "' + updateProduct.sku + '" already exists, please enter a different SKU';
    }
    }

    Object.assign(product, updateProduct);
    //saving the user object to the db
    await product.save();
    //To omit password in the response 
    return (product.get());
}



async function getProductById(pid) {
   const product = await getProduct(pid);
   if(!product){ 
    throw 'Product is not present in the database';
   }
    let {id,name,description,sku,manufacturer,quantity,date_added,date_last_updated,owner_user_id} = product;
    return {id,name,description,sku,manufacturer,quantity,date_added,date_last_updated,owner_user_id} ;
    
}



async function patch(productId, params, req, res) {
    //we get this user object from the db
    const product = await getProduct(productId);
    logger.info(product+"Product");

    let date_ob = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
     params.date_last_updated = date_ob
     const userId = req.ctx.user.id;
    if(userId != product.dataValues.owner_user_id){
        res.sendStatus(403);
        throw 'You are forbidden to update this product';
    }
    if (req.body.hasOwnProperty('quantity')){
    if (!(Number.isInteger(params.quantity) && (params.quantity >= 0 && params.quantity <=100))){
       
        res.status(400).send("Enter a valid quantity");
        throw 'Enter a valid quantity';
    }
}

    // if(req.body.hasOwnProperty('date_added')){
    //     res.status(400).send("added date can\'t be modified");
    // }   
    // if(req.body.hasOwnProperty('date_last_updated')){
    //     res.status(400).send("updated date can\'t be modified");
    // }     


    // console.log(req.params.productId);
    if (req.body.hasOwnProperty('sku')){
    const new_data = await db.Product.findOne({ where: { id: req.params.pid } });
    // console.log(new_data.dataValues.sku);
    if(new_data.dataValues.sku != params.sku){
    if (await db.Product.findOne({ where: { sku: params.sku } })) {
        throw 'SKU "' + params.sku + '" already exists, please enter a different SKU';
    }
}
}
    Object.assign(product, params);
    //saving the user object to the db
    await product.save();
    //To omit password in the response 
    return (product.get());
}


async function deleteProduct(productId, req) {
    const product = await db.Product.findByPk(productId);
    if (!product) throw 'Product is not present in the database';

    const userId = req.ctx.user.id;
    if(userId != product.dataValues.owner_user_id){
        throw 'You cannot delete this product!'
    } else {
    db.Product.destroy({ where: { id: productId } })

    const getAllImages = await db.Image.findAll({
        attributes: ['image_id', 'product_id', 'file_name', 'date_created', 's3_bucket_path'],
        where: {
            product_id: productId
        }
    });

    console.log(getAllImages);
    if( getAllImages.length > 0){
    for (let i = 0; i < getAllImages.length; i++) {
        const image = getAllImages[i];
        const Key = image.s3_bucket_path;
        console.log("Key",Key);
        await sss.deleteFile(Key);
    }

    db.Image.destroy({ where: { product_id: productId } });
    }
}
    return product;
}


async function getProduct(productId) {
    const product = await db.Product.findByPk(productId);
    if (!product) throw 'Product is not present in the database';
    return product;
   }

    













