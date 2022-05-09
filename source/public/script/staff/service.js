navheader.style.display = 'none'

const btn_addCategory = document.getElementById('adm-add-category');
const input_category = document.getElementById('input-category');
const input_desCategory = document.getElementById('input-des-category');
const div_category = document.querySelectorAll('.adm-form-item .el-form-item');
const err_div = document.querySelectorAll('.adm-form-item__error')
const close_addCategory = document.getElementById('close-add__category');
const categories_jq = $('.category')
const close_add = document.getElementById('close-btn__add')
function errInputCategory(index, text) {
    div_category[index].classList.remove('is-success');
    div_category[index].classList.add('is-error');
    err_div[index].textContent = text;
}

function successInputCategory(index, text) {
    div_category[index].classList.add('is-success');
    div_category[index].classList.remove('is-error');
    err_div[index].textContent = text;
}

btn_addCategory.addEventListener('click', async (e) => {
    e.preventDefault();
    let flag = 0;
    if (input_category.value == '') {
        errInputCategory(0, 'Bạn vui lòng nhập tên danh mục')
    } else {
        successInputCategory(0, '')
        flag = 1;
    }

    if (input_desCategory.value == '') {
        errInputCategory(1, 'Bạn vui lòng nhập mô tả của danh mục này')
    } else {
        successInputCategory(1, '')
        if (flag == 1) {
            flag = 2;
        }
    }

    if (flag == 2) {
        const categories = document.querySelectorAll('.category')
        const { status } = await createCategory(categories.length, input_category.value, input_desCategory.value)
        if (status == 'success') {
            $(`<div class="category">
            <div class="category-name overflow-ellipsis">
                <div style="text-transform: capitalize;">${input_category.value}</div>
                <span class="num-services">0 Dịch Vụ</span>
            </div>
            <div class="adm-actions__drop-down">
                <div class="el-dropdown">
                    <button aria-haspopup="true" aria-expanded="false"
                        data-toggle="dropdown" class="adm-btn" id="dropdownMenuButton">
                        <span class="adm-btn__icon">
                            <i class="fa-solid fa-ellipsis"></i>
                        </span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li class="edit-category dropdown-item el-dropdown-menu">
                            <div class="adm-dropdown-item__wrapper is-with-icon">
                                <div class="adm-dropdown-item__icon">
                                    <i class="fa-solid fa-pencil"></i>
                                </div>
                                <div class="adm-dropdown-item__label">
                                    Chỉnh sửa
                                </div>
                            </div>
                        </li>
                        <li data-type={{this.IDTypeS}}
                            class="delete-category dropdown-item el-dropdown-menu">
                            <div class="adm-dropdown-item__wrapper is-red is-with-icon">
                                <div class="adm-dropdown-item__icon">
                                    <i class="fa-solid fa-trash-can"></i>
                                </div>
                                <div class="adm-dropdown-item__label">
                                    Xóa
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>`).insertAfter(categories_jq[categories.length - 1]);
            $('#add-service_modal').modal('hide');
        }
    }

})

close_addCategory.addEventListener('click', (e) => {
    successInputCategory(0, '')
    successInputCategory(1, '')
})
close_add.addEventListener('click', (e) => {
    successInputCategory(0, '')
    successInputCategory(1, '')
})


const member_thumbs = document.querySelectorAll('.member-thumbs');
window.addEventListener('load', async (e) => {
    const { status, employee_service } = await getEmployee_Service();
    if (status == 'success') {
        member_thumbs.forEach((item, index) => {
            let html = ''
            let count = 0;
            for (var i = 0; i < employee_service.length; i++) {
                if (employee_service[i].IDService == item.getAttribute('data-service')) {
                    if (count < 2) {
                        html += `<div class="adm-avatar size-32 margin-right-0 margin-left--10"
                            style="background-image: url(
                            ${employee_service[i].PathImgStaff});
                            border: 3px solid rgb(255, 255, 255); color:
                            rgb(19, 150, 110); z-index: 5;">
                    </div>`
                    }
                    count++;
                }
            }
            if (count > 2) {
                html += ` <div class="member-thumbs__more-item adm-avatar size-32 margin-right-0 margin-left--10"
                style="background-color: rgb(230, 239, 254);
                border: 3px solid rgb(255, 255, 255);
                color: rgb(0, 90, 238);">+${count - 2}
            </div>`
            }

            item.innerHTML = html;
        })
    }
})


const delete_dropdown = document.querySelectorAll('.delete-category');
const edit_dropdown = document.querySelectorAll('.edit-category');
const input_editCategory = document.querySelector('#input-category__edit');
const inputDes_editCategory = document.querySelector('#input-des-category__edit');
const nameServices = document.querySelectorAll('.name-type-service');
const btnEditCategory = document.getElementById('adm-edit-category');
const close_edit = document.getElementById('close-btn__edit');
const edit_closeIcon = document.getElementById('close-edit__category');

delete_dropdown.forEach((item, index) => {
    item.onclick = async () => {
        const { status } = await deleteCategory(item.getAttribute('data-type'));
        if (status == 'success') {
            categories_jq[index + 1].remove();
        }
    }
})

let idType = '';
let indexType = -1;

edit_dropdown.forEach((item, index) => {
    item.onclick = () => {
        input_editCategory.value = nameServices[index].textContent.trim();
        inputDes_editCategory.value = 'Mô tả';
        idType = item.getAttribute('data-type');
        indexType = index;
    }
})

edit_closeIcon.addEventListener('click', (e) => {
    successInputCategory(2, '')
    successInputCategory(3, '')
})

close_edit.addEventListener('click', (e) => {
    successInputCategory(2, '')
    successInputCategory(3, '')
})

btnEditCategory.addEventListener('click', async (e) => {
    e.preventDefault();
    let flag = 0;
    if (input_editCategory.value == '') {
        errInputCategory(2, 'Bạn vui lòng nhập tên danh mục')
    } else {
        successInputCategory(2, '')
        flag = 1;
    }

    if (inputDes_editCategory.value == '') {
        errInputCategory(3, 'Bạn vui lòng nhập mô tả của danh mục này')
    } else {
        successInputCategory(3, '')
        if (flag == 1) {
            flag = 2;
        }
    }

    if (flag == 2) {
        const { status } = await editCategory(idType, input_editCategory.value.trim(), inputDes_editCategory.value.trim());
        if (status == 'success') {
            nameServices[indexType].textContent = input_editCategory.value.trim();
            $('#edit-service_modal').modal('hide');
        }
    }
})

const categories = document.querySelectorAll('.category')

categories.forEach((item, index) => {
    item.onclick = () => {
        notActiveCategory();
        item.classList.add('active');
        if (index != 0) {
            categories[index - 1].style.borderBottom = 'none';
            renderService_Category(item.getAttribute('data-type'))
        }
        else {
            renderAllService();
        }
    }
})

function notActiveCategory() {
    categories.forEach((item, index) => {
        categories[index].classList.remove('active');
        categories[index].style = '';
    })
}

function renderService_Category(idType) {
    const adm_service = document.querySelectorAll('.adm-service');
    adm_service.forEach((item, index) => {
        if (item.getAttribute('data-type') != idType) {
            item.style.display = 'none';
        }
        else {
            item.style.display = 'flex';
        }
    })
}

function renderAllService() {
    const adm_service = document.querySelectorAll('.adm-service');
    adm_service.forEach((item, index) => {
        item.style.display = 'flex';
    })
}

async function getEmployee_Service() {
    return (await instance.post('service/employee-service', {
    })).data;
}

async function createCategory(id, name, desc) {
    return (await instance.post('service/create-category', {
        id: id,
        name: name,
        desc: desc
    })).data
}

async function deleteCategory(id) {
    return (await instance.post('service/delete-category', {
        id: id
    })).data
}

async function editCategory(id, name, desc) {
    return (await instance.post('service/edit-category', {
        id: id,
        name: name,
        description: desc
    })).data
}


