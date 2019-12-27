var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
});

var displayProducts = function () {
    var query = "Select * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        var displayTable = new Table({
            head: ["item_id", "product_name", "department_name", "price", "stock_quantity"],
            colWidths: [10, 25, 25, 10, 14]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(displayTable.toString());
        purchasePrompt();
    });
}

function purchasePrompt() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "enter item id you would like to purhcase.",
            filter: number
        },
        {
            name: "quantity",
            type: "input",
            message: "How many items do you wish to purchase?",
            filter: number
        },

    ]).then(function (answers) {
        var IDrequested = answers.ID;
        var quantityNeeded = answers.Quantity;
        purchaseOrder(IDrequested, quantityNeeded);
    });
};

function purchaseOrder(ID, totalNeeded) {
    connection.query('Select * FROM products WHERE item_id =' + ID, function (err, res) {
        if (err) { console.log(err) };
        if (totalNeeded <= res[0].stock_quantity) {
            var totalPrice = res[0].price * totalNeeded;
            console.log("Good news your order is in stock!");
            console.log("Your total cost for " + totalNeeded + " " + res[0].product_name + " is " + totalPrice + " Thank you!");

            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + totalNeeded + "WHERE item_id = " + ID);
        } else {
            console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + "to complete your order.");
        };
        displayProducts();
    });
};
displayProducts();

