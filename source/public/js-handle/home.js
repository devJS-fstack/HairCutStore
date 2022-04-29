const btnBook = document.querySelector('.btn-booking');
const formBook = document.getElementById('form-booking');
const inputPhone = document.getElementById('input-phone');

var phoneCus = `${window.localStorage.getItem('phoneCustomer')}`;
if (phoneCus != 'null') {
    inputPhone.value = phoneCus;
}
btnBook.addEventListener('click', () => {
    formBook.action = `/booking/?phone=${inputPhone.value}&storeId=0&step=0`;
})