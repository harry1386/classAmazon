# classAmazon

# Overview

The puporse of this application is to replicate the experience of a shopper on an Amazon like website, as well as the role of the manager dealing with the inventory, through node.js.

This application is split into two exicutable files: bamazonCustomer.js and bamazonManager.js.  Photos demonstrating the use of both files through node.js are included in the demoPhotos folder found within this repository.

# bamazonCustomer.js

This is a simple aplication which allows a "customer" to shop for various items.  These items are displayed by accessing the proper mySQL table.  Once the customer selects an item and quantity, the price is presented.  However, if the item is no longer in stock, the customer is notified.  In both instances, the customer is given the opportunity to continue shopping or leave the application.

# bamazonManager.js

This application allows a "manager" to, not surprisingly, manage the inventory.  When accessing the application, the manager is presented with four options.  The first option displays the current inventory to the manager.  The second option displays all items with an inventory of less than 5 items.  The third option allows the manager to restock items.  The fourth option allows the manager to add an entirely new product for the customers to purchase.  At the end of each activity, the manager is presented with the option to choose another activity, or to leave the application all together.

I hope you enjoy this product as much as I enjoyed building it (no sarcasam, databases rule!).
