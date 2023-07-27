import connectdb from "../../Middleware/mongoose";
import Order from "../../Models/Order";

export default async (req , res) => 
{
    await connectdb();
    console.log("body is: ",req.body.email);
    const { userId } = req.query;

    try 
    {
        const data = await Order.find({ userId: userId });
        return res.status(201).send(data);
    }
    catch(error)
    {
        console.log('error in getting product data by id (server) => ')
        return res.status(408).json({error : 'cannot get product data'})
    }
    
}