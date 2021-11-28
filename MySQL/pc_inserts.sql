insert into clients (first_name, last_name, email, phone_number) 
	values("qwe", "rty", "iuo", "123"), ("q2", "vrgrgr", "bgt", "123456");
    
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
    
insert into employees (first_name, last_name, middle_name, address, phone_number, email, position_id) 
	values("fname", "lname", "mname", "address1", "+3751", "email1", 1), ("fname", "lname", "mname", "address2", "+3752", "email2", 2);    
    
insert into pc (order_id, assembly_type_id, employee_id) 
	values(1, 2, 1), (2, 2, 2);       
    
insert into types_of_accessories (`type`) 
	values("cpu"), ("gpu");       
    
insert into accessories (`name`, properties, type_of_accessory_id) 
	values("1660 super", "very good", 2), ("ryzen 5 5600h", "awesome", 1);     
    
insert into pc_accessories (pc_id, accessory_id) 
	values(1, 2), (2, 1);        