var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "RogerRabbit",
    database: "bamazon"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("\nProducts for Sale\n");
    queryAllProducts();
});

function queryAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item Id: " + res[i].item_id + " | " + "Name: " + res[i].product_name + " | " + "Price: " + "$" + res[i].price);
            console.log("--------------------------------------------------------------------------------------");
        }
    });
}
