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
	console.log("Welcome! You're connected as ID " + connection.threadId);
	allProducts();
});

function allProducts() {
	connection.query("SELECT * FROM products", function(err, res) {
		console.log("Super Awesome Store Products:");
		console.log("------------------------------------------------------------");
		for (var i = 0; i < res.length; i++) {
			console.log(" | " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + " | ");
			console.log("------------------------------------------------------------");
		};
		order();
	});
};

function order() {
	inquirer.prompt([
		{
			name: "itemID",
			type: "input",
			message: "What would you like to purchase on this fine day? Please enter the appropriate ID: ",
			validate: function(value) {
				if(isNaN(value) === false) {
					return true;
				}
				return false;
			}
		},
		{
			name: "quant",
			type: "input",
			message: "How many would you like to purchase?",
			validate: function(value) {
				if(isNaN(value) === false) {
					return true;
				}
				return false;
			}
		}
	])
	.then(function(answer) {
		connection.query("SELECT * FROM products WHERE item_id = ?", [answer.itemID], function(err,res){
			if(res[0].stock_quantity < answer.quant){
				console.log("Sorry my good Sir, we are all out of that!");
				inquirer.prompt([
					{
						name: "again",
						type: "confirm",
						message: "Would you like to continue shopping today?",
						default: true,
					}
					])
					.then(function(response){
						if(response.again) {
							console.log("Take your time! I'm a program, I'm here all day!");
							allProducts();
						}
						else {
							console.log("Come back again sometime soon!");
							connection.end();
						}
					})
			}
			else{
				var updatedQ = parseInt(res[0].stock_quantity) - parseInt(answer.quant);
				connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [updatedQ, answer.itemID], function(err, result){
					if(err) throw err;
					var ammount = res[0].price * answer.quant;
					console.log("You are now in debt to me for $" + ammount);

					inquirer.prompt([
					{
						name: "again",
						type: "confirm",
						message: "Would you like to continue shopping today?",
						default: true,
					}
					])
					.then(function(response){
						if(response.again === true) {
							console.log("Take your time! I'm a program, I'm here all day!");
							allProducts();
						}
						else {
							console.log("Come back again sometime soon!");
							connection.end();
						}
					})
				})
			}
		})
	})
};