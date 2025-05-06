
select FirstName, LastName from employees left join orders on employees.EmployeeID = orders.employeeID where orders.orderid is null ;