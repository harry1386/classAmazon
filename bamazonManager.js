var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "Clue2010",
	database: "bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log(" ");
	console.log("Hello Boss-Man. You're connected as ID " + connection.threadId);
	console.log(" ");
	manager();
});

function viewProducts(){
	connection.query("SELECT * FROM products", function(err, res) {
		console.log(" ");
		console.log("------------------------------------------------------------");
		console.log("Super Awesome Store Products:");
		console.log("------------------------------------------------------------");
		for (var i = 0; i < res.length; i++) {
			console.log(" | " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + " | ");
			console.log("------------------------------------------------------------");
		};
		console.log(" ");
		anotherAct();
	});
};

function viewLowInventory(){
	connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res){
		console.log(" ");
		console.log("------------------------------------------------------------");
		console.log("Oh no Boss-man! We have less than 5 of the following items:");
		console.log("------------------------------------------------------------");
		for (var i = 0; i < res.length; i++) {
			console.log(" | " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + " | ");
			console.log("------------------------------------------------------------");
		};
		console.log(" ");
		anotherAct();
	})
};

function addToInventory(){
	console.log(" ");
	connection.query("SELECT * FROM products", function(err, res) {
		console.log(" ");
		console.log("------------------------------------------------------------");
		console.log("Super Awesome Store Products:");
		console.log("------------------------------------------------------------");
		for (var i = 0; i < res.length; i++) {
			console.log(" | " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + " | ");
			console.log("------------------------------------------------------------");
		};
	console.log(" ");
	});
	inquirer.prompt([
	{
		name: "itemID",
		type: "input",
		message: "What would you like to update Boss-Man? (type the item ID sir)",
		validate: function(value) {
			if (isNaN(value) === false){
				return true;
			}
			return false;
		}
	},
	{
		name: "quant",
		type: "input",
		message: "How many of this item would you like to add Boss-Man?",
		validate: function(value){
			if (isNaN(value) === false){
				return true;
			}
			return false;
		}
	}
	])
	.then(function(response){
		connection.query("SELECT * FROM products WHERE item_id = ?", [response.itemID], function(err, res){
			var newQuant = parseInt(res[0].stock_quantity) + parseInt(response.quant);

			connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newQuant, response.itemID], function(err, result){
				if(err) throw err;
				console.log(" ");
				console.log("Got that all update Boss-Man no problem!");
				console.log(" ");
				anotherAct();
			})
		})
	})

};

function addProduct(){
	console.log(" ");
	inquirer.prompt([
	{
		name: "itemName",
		type: "input",
		message: "What's the new products name Boss-Man?"
	},
	{
		name: "department",
		type: "input",
		message: "What Department Boss-Man?"
	},
	{
		name: "price",
		type: "input",
		message: "How much this going to cost Boss-Man?",
		validate: function(value){
			if (isNaN(value) === false){
				return true;
			}
			return false;
		}
	},
	{
		name: "quant",
		type: "input",
		message: "How much of this are we going to have Boss-Man?",
		validate: function(value){
			if (isNaN(value) === false){
				return true;
			}
			return false;
		}
	}
	])
	.then(function(response) {
		var itemInfo = [[response.itemName, response.department, response.price, response.quant]];

		connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?" [itemInfo], function(err) {
			if(err) throw err;
			console.log(" ");
			console.log("Fully Updated Boss-Man!")
			console.log(" ");
			anotherAct();
		});

	})
		
};

function anotherAct(){
	inquirer.prompt([
	{
		name: "again",
		type: "confirm",
		message: "Would you like to do something else Boss-Man?",
		default: true,
	}
	])
	.then(function(response){
		console.log(" ");
		if(response.again === true) {
			manager();
		}
		else {
			console.log(" ");
			console.log("It's always an honor to see you Boss-Man. Goodbye!");
			connection.end();
			}
		})
}

function manager(){
	inquirer.prompt([
		{
			name: "activity",
			type: "rawlist",
			message: "What would you like to do Boss-Man?",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
		}
	])
	.then(function(response) {
		console.log(" ");
		console.log("Well lets get started with " + response.activity + ". Good choice Boss-Man!");

		if(response.activity === "View Products for Sale") {
			viewProducts();
		} else if(response.activity === "View Low Inventory"){
			viewLowInventory();
		} else if(response.activity === "Add to Inventory"){
			addToInventory();
		} else if(response.activity === "Add New Product"){
			addProduct();
		}
	})
}