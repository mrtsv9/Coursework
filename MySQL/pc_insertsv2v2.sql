insert into clients (first_name, last_name, email, phone_number, `password`) 
		values("Максим", "Сущиков", "mail1", "123", "pass1"), ("Максим", "Фамилия", "mail2", "456", "pass2");
    
insert into delivery_methods (`delivery_type`)
	values("by car"), ("by nogi");
    
insert into payment_methods (`payment_type`) 
	values("by card"), ("by nal");
    
insert into orders (address, client_id, delivery_method_id, payment_method_id) 
	values("address", 1, 2, 1), ("address2", 2, 1, 2);
    
 insert into assembly_types (`type`) 
	values("готовая сборка"), ("выбор комплектующих");
    
insert into positions (`name`) 
	values("admin"), ("ne admin");
    
insert into employees (first_name, last_name, middle_name, address, phone_number, email, `password`, position_id) 
	values("fname", "lname", "mname", "address1", "+3751", "email1", "passEmp1",  1), ("fname", "lname", "mname", "address2", "+3752", "email2", "passEmp2" , 2);    
    
insert into pc (title, total_price, order_id, assembly_type_id, employee_id) 
	values("Игровой компьютер",0, 1, 2, 1), ("Super PC",0, 2, 2, 2);       
    
insert into types_of_accessories (`type`) 
	values("cpu"), ("gpu");       
    
insert into accessories (`name`, properties, price , type_of_accessory_id) 
	values("1660 super", "very good", 20 , 2), ("ryzen 5 5600h", "awesome", 10 , 1);     
    
insert into pc_accessories (pc_id, accessory_id) 
	values(2, 2), (2, 1);        