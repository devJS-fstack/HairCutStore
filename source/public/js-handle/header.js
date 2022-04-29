const btnLogin = document.getElementById("btnLogin");
const formLogin = document.getElementById("formLogin");
const errLogin = document.querySelector('.err-login');
const modalLogin = document.getElementById('modalLogin');
const nameUser = document.querySelector('.name-user');
const dropDownMenu = document.querySelector('.dropdown-menu');


// create instance axios config

const inputAccount = document.querySelector('[name=inputAccount]');
const inputPassword = document.querySelector('[name=inputPassword]');

const instance = axios.create({
    baseURL: '',
    timeOut: 3 * 1000,
    headers: {
        'Content-Type': 'application/json'
    },
    data: {
        account: inputAccount.value,
        password: inputPassword.value,
    }
});

// xu ly data truoc khi xuong server
instance.interceptors.request.use((config) => {
    //console.log('before request');

    return config;
}, err => {
    return Promise.reject(err)
})

// xu ly data khi response tu server
instance.interceptors.response.use((config) => {
    //console.log('before response: ');

    return config;
}, err => {
    return Promise.reject(err)
})

// xu ly login submit

btnLogin.onclick = async (e) => {
    e.preventDefault();
    const { status, elements } = await login();


    if (status == 'fail') {
        errLogin.style.display = 'block';
    }
    else {
        window.localStorage.setItem('accessToken', elements.token);
        window.localStorage.setItem('phoneCustomer', elements.phoneCustomer);
        $('#modalLogin').modal('hide');
        nameUser.innerHTML = elements.nameUser;
        dropDownMenu.innerHTML = `
            <a class="dropdown-item" data-toggle="modal" >Lịch sử tỏa sáng</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item log-out" data-toggle="modal">Đăng xuất</a>
            `
        window.location.href = '/';
        const dropdownItem = document.querySelector('.log-out')
        dropdownItem.onclick = () => {
            window.localStorage.clear();
            nameCustomerElement.innerHTML = 'Khách hàng';
            dropDownMenu.innerHTML = `
                <a class="dropdown-item" data-toggle="modal" data-target="#modalLogin">Đăng
                            nhập</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" data-toggle="modal" data-target="#regisModal">Đăng ký</a>
                `
        }
    }
}

// check Token 
const accessToken = `${window.localStorage.getItem('accessToken')}`;
if (accessToken != `null`) {
    (async () => {
        const { status, nameCustomer, phoneCustomer } = await checkToken();
        const nameCustomerElement = document.querySelector('.name-user');
        nameCustomerElement.innerHTML = nameCustomer;
        dropDownMenu.innerHTML = `
            <a class="dropdown-item" data-toggle="modal" >Lịch sử tỏa sáng</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item log-out" data-toggle="modal">Đăng xuất</a>
            `
        if (status) {
            const btnLogout = document.querySelector('.log-out')
            clickLogout(btnLogout);
        }
    })();

    function clickLogout(dropdownItem) {
        const nameCustomerElement = document.querySelector('.name-user');
        dropdownItem.onclick = () => {
            window.localStorage.clear();
            nameCustomerElement.innerHTML = 'Khách hàng';
            dropDownMenu.innerHTML = `
                <a class="dropdown-item" data-toggle="modal" data-target="#modalLogin">Đăng
                            nhập</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" data-toggle="modal" data-target="#regisModal">Đăng ký</a>
                `
            window.location.href = '/';
        }
    }



    async function checkToken() {
        return (await instance.post('/checkToken', {
            data: {
                accessToken: accessToken,
            }
        })).data;
    }
}

async function login() {
    return (await instance.post('/login', {
        data: {
            account: inputAccount.value,
            password: inputPassword.value,
        }
    })).data;
}