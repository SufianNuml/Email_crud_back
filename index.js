const express=require("express");
require("./db/config");
const test=require("./db/user")
const cors=require("cors");

const app=express();
app.use(express.json());
app.use(cors());

app.post("/login",async(req,resp)=>
{
    let data=new test(req.body);
    let result=await data.save();
    
    resp.send(result);

})
app.get("/products",async(req,resp)=>
    {
        let data=await test.find();
        if(data.length>0)
        {
            resp.send(data);
        }
        else
        {
            resp.send({data:"No result found"});
        }
    })
    app.get("/search/:key",async(req,resp)=>
        {
            let result=await test.find({
                "$or":[
                    { email: { $regex: req.params.key}}
                   
                ]
            });
            resp.send(result);
        })
    app.delete("/delete/:id",async(req,resp)=>
    {
        const result=await test.deleteOne({_id:req.params.id});
        resp.send(result);
    })

    app.get("/product/:id",async(req,resp)=>
        {
            let result=await test.findOne({_id:req.params.id});
            if(result)
            {
                resp.send(result);
            }
            else
            {
                resp.send({result:"no data"});
            }
        })
        
        app.put("/produc/:id",async(req,resp)=>
        {
            let result=await test.updateOne({_id:req.params.id},{$set:req.body});
            resp.send(result);
        })
app.listen(5000);