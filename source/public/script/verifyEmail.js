const btnVerify_regis = document.querySelector('.btn-verify-number__regis');
const verifyInput_regis = document.getElementById('verify-number__regis');
btnVerify_regis.onclick = async (e) => {
    e.preventDefault();
    const { status, token, phoneCustomer } = await verify(verifyInput_regis.value);
    if (status == 'success') {
        window.localStorage.setItem('accessToken', token);
        window.localStorage.setItem('phoneCustomer', phoneCustomer);
        window.location.href = '/';
    }
    else {
        alert('Mã xác nhận không đúng, anh vui lòng thử lại ạ')
    }
}


async function verify(verifyNumber) {
    return (await instance.post('/regis/confirm-verify', {
        data: {
            verifyNumber,
        }
    })).data;
}