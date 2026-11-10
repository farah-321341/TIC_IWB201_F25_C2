function validateForm(event){
	event.preventDefault();
	let fullName = document.getElementById('fullName').value.trim();
	let arabicPattern = /^[\u0600-\u06FF\s]+$/;
	if (fullName !== "" && !arabicPattern.test(fullName)) {
		alert("!خطأ: الايم الكامل يجب أن يحتوي على أحرف هجائية عربية فقط");
		return false;
	}
let nationalId = document.getElementById('nationalId').value.trim();
let nationalPattern = /^(0[1-9]|1[0-4])[0-9]{9}$/;
if (!nationalPattern.test(nationalId)) {
	alert("(14-01)!خطأ: الرقم الوطني إلزامي, مكون من 11 خانة , ويبدأ بمحافظة صحيحة");
	return false;
}
let date1 = document.getElementById('startDate').value;
let date2 = document.getElementById('endDate').value;
if (!date1 || !date2) {
	alert("!خطأ: يرجى تحديد بداية ونهاية التأجير أولاً");
	return false;
}
let start = new Date(date1.replace(/\//g, "-"));
let end = new Date(date2.replace(/\//g, "-"));
if(isNaN(start.getTime()) || isNaN(end.getTime())){
    alert("خطأ!: صيغة التاريخ غير صحيحة");
    return false;
}

	if(end <= start) {
		alert("!خطأ: تاريخ نهاية التأجير يجب أن يكون لاحقاً (بعد) تاريخ بداية التأجير");
		return false;
	}

let mobile = document.getElementById('mobile').value.trim();
let mobilePattern = /^09(3|4|5|6|8|9)[0-9]{7}$/;
if(mobile !== "" && !mobilePattern.test(mobile)) {
	alert("خطأ: رقم الموبايل غير صحيح! يجب أن يطابق شبكات Syriatel أو MTN (09 : مثالxxxxxxx). ");
	return false;
}
let email =  document.getElementById('email').value.trim();
let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (email !== "" && !emailPattern.test(email)){
	alert("طأ!: البريد الالكتروني غير صحيح")
	return false;
}


let days = Math.round((end-start)/(1000*60*60*24));
let checked = document.querySelectorAll('.car-checkbox:checked');
let message  = "تم التحقق بنجاح";
let total = 0;

for(let i =0; i<checked.length; i++){
	let name= checked[i].value;
	let price= Number(checked[i].dataset.price);
	let carTotal= price * days;
	total= total+carTotal;
	message= message + (i+1) +") " + name + "\n -" + days + "يوم" + carTotal.toLocaleString() +"ل.س" ;
}
let discount =  0;
if (days > 7){
	discount = total * 0.10;
}
let finalTotal = total - discount;
message = message + "\nعدد ايام التأجير :" + days;
message = message +  "\nالمجموع :" + total.toLocaleString() + "ل.س" ;
message = message + "\nلخصم : " +discount.toLocaleString() + "ل.س" ;
message = message + "\nالمبلغ النهائي : " + finalTotal.toLocaleString() + "ل.س" ;

alert(message);
return true;
}