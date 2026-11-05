import express from "express";

const router = express.Router();

router.get("/hello",(req,res)=>{
    res.json({message: "hello world"});
})

router.get("/all", (req, res) => {
    res.json({
        movies: ["Inception", "Interstellar", "Batman"]
    });
});

router.get("/", (req,res)=>{
    res.json({httpMethod: "get"});
})

router.post("/", (req,res)=>{
    res.json({httpMethod: "post"});
})

router.put("/", (req,res)=>{
    res.json({httpMethod: "put"});
})
router.delete("/", (req,res)=>{
    res.json({httpMethod: "delete"});
})





export default router;