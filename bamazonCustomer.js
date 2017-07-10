var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "63BigFos88",
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
        console.log("\n");
        purchase();
    });
}
function purchase() {
    inquirer
        .prompt([{
            name: "id",
            type: "input",
            message: "Please enter the ID of the item that you would like to purchase: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }, {
            name: "quantity",
            type: "input",
            message: "How many would you like?: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }])
        .then(function(answer) {
        	var item = " '" + answer.item + "'";
            var query = "SELECT ?? FROM products WHERE item_id = ?";
            connection.query(query, ["*", answer.id], function(err, res) {
                    
                    let total = parseFloat(res[0].price) * parseInt(answer.quantity);
                    let stock = parseInt(res[0].stock_quanity) - parseInt(answer.quantity)
                    let update = "UPDATE products SET stock_quanity = ? WHERE item_id = ?"

                    if (parseInt(res[0].stock_quanity) >= parseInt(answer.quantity)) {
                    	connection.query(update, [stock, answer.id], function(err, res) {
	    				console.log("\nYour total purchase amount is: $" + total + "\n \n \n \n \n");
    });
                    }
                    else{
                    	console.log("\nInsufficient stock!\n \n \n \n \n")
                    }
                  
                queryAllProducts();
            });
        });
}
