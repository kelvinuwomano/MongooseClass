const express = require("express");
const app = express();

const port = 4300;

app.use(express.json());

let products = [];

app.get("/", (req, res) => {
    res.status(200).json(products);
});

app.post("/", (req, res) => {
    const { name, price, rate} = req.body;
    if (name && price && rate) {
        products.push({
            id: products.length + 1,
            name,
            price,
            rate
        });
        res.status(200).json({message: "Product successfully added", products:{ name, price, rate} });
    } else {
        res.status(404).json({message: "All field required"});
    }
});

app.patch("/:id", (req, res) => {
    let {id} = req.params;
    id = parseInt(id);
    const {name, price, rate} = req.body;
    const updateProduct = products.find((e) => e.id === id);
    if (updateProduct) {
        if(name) updateProduct.name = name;
        if(price) updateProduct.price = price;
        if(rate) updateProduct.rate = rate;
        res.status(200).json({message: "Updated successfully", data: req.body});
    } else{
        res.status(404).json({message: "Route not found"});
    }
});

app.delete("/:id", (req, res) => {
    let {id} = req.params;
    id = parseInt(id);
    const findTodo = products.find((e) => e.id === id);
    if (findTodo) {
        const deleteTodo = products.filter((e) => e.id !== id);
        products = deleteTodo;
        res.status(200).json({message: "Deleted successfully"});
    } else {
        res.status(400).json({message: "Route not found"})
    }
});

app.get("/:rate", (req, res) => {
    let {rate} = req.body;
    const getRate = products.filter((e) => e.rate === rate);
    res.status(200).json({message: "Success gotten rate"});
});

app.delete("/", (req, res) => {
    products = [];
    res.status(200).json({message: "Deleted all items successfully", data: products })
});

app.all("*", (req, res) => {
    res.status(404).json({message: "Route does not exist"});
});

app.listen(port, () => {
    console.log(`App is listening to http://localhost:${port}`);
});