
const categories = document.querySelectorAll('.list-services')

function renderServices(services) {
    var html = ''
    categories.forEach((item, index) => {
        services.forEach((service) => {
            if (service.TypeService == item.getAttribute('data-type')) {
                html += `<div class="list__item">
                <input class="valueService" value="${service.IDService}">
                </input>

                <div class="item__media pointer">
                    <img src="${service.PathImg}" alt="">
                </div>
                <div class="item__title pointer">${service.NameService}</div>
                <div class="item__description pointer">${service.Description}</div>
                <div class="item__price pointer">
                    <div class="meta__price">
                        <div class="meta__newpirce">${service.ListPrice}K</div>
                    </div>
                </div>
                <div class="item__button">
                    <img src="https://30shine.com/static/media/checked.380e2632.svg" alt="">
                    Chọn
                </div>
            </div>`
            }
        })
        item.innerHTML = html;
        html = '';
    })
}

window.addEventListener('load', async () => {
    const { status, services } = await getServices();
    renderServices(services);



    const linkTitle = document.querySelectorAll('.ant-anchor-link-title');
    const chooseBtn = document.querySelectorAll('.item__button');
    const checkImg = document.querySelectorAll('.item__button img')
    const btnCategory1 = document.querySelectorAll('#category1 .item__button');
    const btnCategory2 = document.querySelectorAll('#category2 .item__button');
    const btnCategory3 = document.querySelectorAll('#category3 .item__button');
    const btnCategory4 = document.querySelectorAll('#category4 .item__button');
    const btnNextTitle = document.querySelector('.button-next span');
    const btnNext = document.querySelector('.button-next');
    var count = 0;


    chooseBtn.forEach((item, index) => {
        item.onclick = () => {
            if (!item.classList.contains('checkedService')) {
                item.innerHTML = `<img src="https://30shine.com/static/media/checked.380e2632.svg" alt="">
                Đã chọn
                `;
                item.classList.add('checkedService');
            }
            else {
                item.innerHTML = `<img src="https://30shine.com/static/media/checked.380e2632.svg" alt="">
                Chọn`
                item.classList.remove('checkedService');
            }
            countService();
        }
    })

    function countService() {
        chooseBtn.forEach((item1, index1) => {
            if (item1.classList.contains('checkedService')) {
                count++;
            }
        });
        if (count > 0) {
            btnNext.classList.remove('btn-inactive');
            btnNextTitle.innerHTML = `Chọn ${count} dịch vụ`;
        }
        else {
            btnNext.classList.add('btn-inactive');
            btnNextTitle.innerHTML = 'Chọn dịch vụ';
        }
        count = 0;
    }
    btnCategory1.forEach((item, index) => {
        item.onclick = () => {
            if (!item.classList.contains('checkedService')) {
                btnCategory1.forEach((item, index) => {
                    item.innerHTML = `<img src="https://30shine.com/static/media/checked.380e2632.svg" alt="">
                Chọn`
                    item.classList.remove('checkedService');
                })
                item.innerHTML = `<img src="https://30shine.com/static/media/checked.380e2632.svg" alt="">
                Đã chọn
                `;
                item.classList.add('checkedService');
            }
            else {
                item.innerHTML = `<img src="https://30shine.com/static/media/checked.380e2632.svg" alt="">
                Chọn`
                item.classList.remove('checkedService');
            }
            countService();
        }
    });
    btnCategory2.forEach((item, index) => {
        item.onclick = () => {
            if (!item.classList.contains('checkedService')) {
                btnCategory2.forEach((item, index1) => {
                    if (index < 4) {
                        if (index1 < 4) {
                            item.innerHTML = `<img src="https://30shine.com/static/media/checked.380e2632.svg" alt="">
                Chọn`
                            item.classList.remove('checkedService');
                        }
                    }
                })
                item.innerHTML = `<img src="https://30shine.com/static/media/checked.380e2632.svg" alt="">
                Đã chọn`
                item.classList.add('checkedService');
            } else {
                item.innerHTML = `<img src="https://30shine.com/static/media/checked.380e2632.svg" alt="">
                Chọn`
                item.classList.remove('checkedService');
            }
            countService();
        }
    });
    btnCategory3.forEach((item, index) => {
        item.onclick = () => {
            if (!item.classList.contains('checkedService')) {
                btnCategory3.forEach((item, index1) => {
                    if (index < 5) {
                        if (index1 < 5) {
                            item.innerHTML = `<img src="https://30shine.com/static/media/checked.380e2632.svg" alt="">
                Chọn`
                            item.classList.remove('checkedService');
                        }
                    }
                })
                item.innerHTML = `<img src="https://30shine.com/static/media/checked.380e2632.svg" alt="">
                Đã chọn`
                item.classList.add('checkedService');
            } else {
                item.innerHTML = `<img src="https://30shine.com/static/media/checked.380e2632.svg" alt="">
                Chọn`
                item.classList.remove('checkedService');
            }
            countService();
        }
    });
    btnCategory4.forEach((item, index) => {
        item.onclick = () => {
            if (!item.classList.contains('checkedService')) {
                btnCategory4.forEach((item, index) => {
                    item.classList.remove('checkedService');
                    item.innerHTML = `<img src="https://30shine.com/static/media/checked.380e2632.svg" alt="">
                Chọn`
                })
                item.innerHTML = `<img src="https://30shine.com/static/media/checked.380e2632.svg" alt="">
                Đã chọn`
                item.classList.add('checkedService');
            }
            else {
                item.innerHTML = `<img src="https://30shine.com/static/media/checked.380e2632.svg" alt="">
                Chọn`
                item.classList.remove('checkedService');
            }
            countService();
        }
    });


    // Request arr id service

    const form = document.getElementById('formSubmitService');
    const urlBook = window.location.href;
    const arrUrl = urlBook.split("&");
    btnNext.onclick = () => {
        if (btnNextTitle.innerHTML == 'Chọn dịch vụ') {
            alert('Anh vui lòng chọn dịch vụ');
        }
        else {
            pushIdService();
            form.action = `${arrUrl[0]}&${arrUrl[1]}&step=0`;
            form.submit();
        }
    }
    const listItem = document.querySelectorAll('.list__item');
    const valueService = document.querySelectorAll('.valueService');
    function pushIdService() {
        chooseBtn.forEach((item, index) => {
            if (item.classList.contains('checkedService')) {
                const inputElement = document.createElement('input');
                inputElement.name = 'serviceIds[]';
                inputElement.value = valueService[index].value;
                inputElement.style.display = 'none';
                listItem[index].appendChild(inputElement);
            }
        })
    }

    // handle value service

    const dataService = document.querySelectorAll('.value-service');
    if (dataService.length > 0) {
        valueService.forEach((item, index) => {
            dataService.forEach((data, indexData) => {
                if (data.value == item.value) {
                    chooseBtn[index].classList.add('checkedService');
                    chooseBtn[index].innerHTML = `<img src="https://30shine.com/static/media/checked.380e2632.svg" alt="">
                Đã chọn`
                }
            })
        })
        countService();
    }

})


async function getServices() {
    return (await instance.post('/services', {
    })).data;
} 