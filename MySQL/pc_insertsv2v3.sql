insert into clients (first_name, last_name, email, phone_number, `password`) 
	values("Максим", "Сащеко", "sascheka@gmail.com", "+375291234567", "pass1"), ("Денис", "Скурат", "skuratden@mail.ru", "375297128432", "pass2");
    
insert into delivery_methods (`delivery_type`)
	values("Доставка"), ("Самовывоз");
    
insert into payment_methods (`payment_type`) 
	values("Картой курьеру"), ("Картой онлайн"), ("Наличными");
    
insert into orders (address, client_id, delivery_method_id, payment_method_id) 
	values("ул. Красноармейская, 13", 1, 2, 1), ("пр. Победителей, 8", 2, 1, 2);
    
 insert into assembly_types (`type`) 
	values("Готовая сборка"), ("Выбор комплектующих");
    
insert into positions (`name`) 
	values("Стажер"), ("Мастер по сборке");
    
insert into employees (first_name, last_name, middle_name, address, phone_number, email, `password`, position_id) 
	values("Роман", "Пичнюк", "Сергеевич", "пр. Независимости, 12", "+375293361232", "pinchuk@ya.ru", "passEmp1",  1),
    ("Никита", "Шуриков", "Андреевич", "ул. Якуба Колоса, 25", "+375297722832", "shurikoov@gmail.com", "passEmp2" , 2);    
    
insert into pc (title, total_price, order_id, assembly_type_id, employee_id) 
	values("Игровой компьютер", 0, 1, 2, 1), ("Super PC", 0, 2, 2, 2);       
    
insert into types_of_accessories (`type`) 
	values("CPU"), ("GPU"), ("RAM");       
    
insert into accessories (`name`, properties, price , type_of_accessory_id) 
	values("1660 super", "very good", 20 , 2), ("ryzen 5 5600h", "awesome", 10 , 1), 
    ("3080", "good", 40 , 2), ("intel 5", "cool", 50 , 1), ("Crucial Ballistix", "DDR4 DIMM", 25, 3);     
    
insert into pc_accessories (pc_id, accessory_id) 
	values(2, 1), (1, 3), (1, 2), (1, 5);        
        