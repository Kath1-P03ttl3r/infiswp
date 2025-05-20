
select customers.CustomerName, COUNT (Orders.orderID) as OrderCount from Customers
 left join orders on customers.CustomerID = orders.customerid group by customers.customername;