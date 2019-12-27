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
    console.log("connected as id" + connection.threadid);
});

function displayInventory() {
    connection.query('SELECT * FROM Products', function (err, res) {
        if (err) { console.log(err) };
        var theDisplayTable = new Table({
            head: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity'],
            colWidths: [10, 25, 25, 10, 14]
        });
        for (i = 0; i < res.length; i++) {
            theDisplayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(theDisplayTable.toString());
        inquirerForUpdates();
    });
};

function inquirerForUpdates() {
    inquirer.prompt([{
        name: "action",
        type: "list",
        message: "Choose an option below to manage current inventory:",
        choices: ["Restock Inventory", "Add New Product", "Remove An Existing Product"]
    }]).then(function (answers) {
        switch (answers.action) {
            case 'Restock Inventory':
                restockRequest();
                break;
            case 'Add New Product':
                addRequest();
                break;
            case 'Remove An Existing Product':
                removeRequest();
                break;
        }
    });
};

function restockRequest() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What is the item number of the item you would like to restock?"
        },
        {
            name: "quantity",
            type: "input",
            message: "What is the quantity you would like to add?"
        },
    ]).then(function (answers) {
        var quantityNeeded = answers.Quantity;
        var idProduct = answers.id;
        restockInventory(idProduct, quantityNeeded);
    });
};

function restockInventory(id, quant) {
    connection.query('SELECT * FROM Products WHERE item_id = ' + id, function (err, res) {
        if (err) { console.log(err) };
        connection.query('UPDATE Products SET stock_quantity = stock_quantity + ' + stock_quantity + 'WHERE item_id =' + item_id);

        displayInventory();
    });
};

function addRequest() {
    inquirer.prompt([

        {
            name: "id",
            type: "input",
            message: "add id number"

        },
        {
            name: "name",
            type: "input",
            message: "What is name of product you would like to stock?"
        },
        {
            name: "category",
            type: "input",
            message: "What is the category for product?"
        },
        {
            name: "price",
            type: "input",
            message: "What is the price for item?"
        },
        {
            name: "quantity",
            type: "input",
            message: "What is the quantity you would like to add?"
        },

    ]).then(function (answers) {
        var id = answers.Id;
        var name = answers.Name;
        var category = answers.Category;
        var price = answers.Price;
        var quantity = answers.Quantity;
        buildNewItem(id, name, category, price, quantity);
    });
};

function buildNewItem(name, category, price, quantity) {
    connection.query('INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) VALUES("' + id + '","' + name + '","' + category + '",' + price + ',' + quantity + ')');
    displayInventory();
};

function removeRequest() {
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "What is the item number of the item you would like to remove?"
    }]).then(function (answer) {
        var id = answers.id;
        removeInventory(id);
    });
};

function removeInventory(id) {
    connection.query('DELETE FROM Products WHERE item_id = ' + id);
    displayInventory();
};

displayInventory();