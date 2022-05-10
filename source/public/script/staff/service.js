navheader.style.display = 'none'

const btn_addCategory = document.getElementById('adm-add-category');
const input_category = document.getElementById('input-category');
const input_desCategory = document.getElementById('input-des-category');
const div_category = document.querySelectorAll('.adm-form-item .el-form-item');
const err_div = document.querySelectorAll('.adm-form-item__error')
const close_addCategory = document.getElementById('close-add__category');
const categories_jq = $('.category')
const close_add = document.getElementById('close-btn__add')
const adm_addCategory = document.querySelector('.adm-button-category');
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

adm_addCategory.addEventListener('click', (e) => {
    input_category.value = '';
    input_desCategory.value = '';
})

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
            var categories_After = $('.category')
            $(`<div data-type="${categories.length}" class="category">
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
                        <li data-type="${categories.length}"
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
        </div>`).insertAfter(categories_After[categories.length - 1]);
            $('#add-category_modal').modal('hide');
            const delete_dropdown = document.querySelectorAll('.delete-category');
            const categories_jq = $('.category')
            clickDeleteCategory(delete_dropdown, categories_jq)
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
            const delete_dropdown = document.querySelectorAll('.delete-category');
            const categories_jq = $('.category')
            clickDeleteCategory(delete_dropdown, categories_jq);
        })
    }
})



const edit_dropdown = document.querySelectorAll('.edit-category');
const input_editCategory = document.querySelector('#input-category__edit');
const inputDes_editCategory = document.querySelector('#input-des-category__edit');
const nameServices = document.querySelectorAll('.name-type-service');
const btnEditCategory = document.getElementById('adm-edit-category');
const close_edit = document.getElementById('close-btn__edit');
const edit_closeIcon = document.getElementById('close-edit__category');

function clickDeleteCategory(deletes, categoryjq) {
    deletes.forEach((item, index) => {
        item.onclick = async () => {
            const { status } = await deleteCategory(item.getAttribute('data-type'));
            if (status == 'success') {
                categoryjq[index + 1].remove();
            }
        }
    })
}


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
            $('#edit-category_modal').modal('hide');
        }
    }
})

const categories = document.querySelectorAll('.category')

categories.forEach((item, index) => {
    item.onclick = (e) => {
        if (!e.target.closest('.adm-actions__drop-down')) {
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


// handle add service

const upload_element = document.querySelector('.el-form-item__uploader');
const upload_input = document.querySelector('.el-upload__input');
const upload_dragger = document.querySelector('.el-upload-dragger');
const input_categoryService = document.querySelector('#input-category-service__add');
const input_employeeService = document.querySelector('#input-employee-service');
const dropDown_categoryService = document.querySelector('#dropdown-category__service');
const dropDown_employeeService = document.querySelector('#dropdown-employee__service');
const arrows_down = document.querySelectorAll('.el-select__caret');
const listDropdown_category = document.querySelectorAll('.list-category__dropdown');
const spans_categorydd = document.querySelectorAll('.list-category__dropdown span');

upload_element.addEventListener('click', (e) => {
    var upload_img = "";
    upload_input.click();
    upload_input.onchange = () => {
        const file = upload_input.files[0];
        upload_img = URL.createObjectURL(file)
        upload_dragger.innerHTML = `
        <div class="uploaded-photo-preview">
            <img src="${upload_img}" alt="">
        </div>
        `
    }
})

input_categoryService.onclick = (e) => {
    if (dropDown_categoryService.getAttribute('style') == 'min-width: 492.575px; transform-origin: center top; z-index: 2026; display: none;') {
        arrows_down[0].style.transform = 'rotate(0deg)';
        dropDown_categoryService.style = `min-width: 492.575px; transform-origin: center top; z-index: 2030; position: fixed; top: 375px; left: 618px;display:block;`
    }
    else {
        arrows_down[0].style.transform = 'rotate(180deg)';
        dropDown_categoryService.style = `min-width: 492.575px; transform-origin: center top; z-index: 2026; display: none`
    }
}

input_categoryService.onfocusout = () => {
    arrows_down[0].style.transform = 'rotate(180deg)';
    dropDown_categoryService.style = `min-width: 492.575px; transform-origin: center top; z-index: 2026; display: none`
}

const modalAddService = document.querySelector('#add-service_modal')
modalAddService.onscroll = function () {
    //console.log(scroll);
    var scrollTop = modalAddService.scrollTop;
    var scrollY = 375 - scrollTop;
    var scrollY_employee = 552 - scrollTop;
    if (dropDown_categoryService.style.display == 'block') {
        dropDown_categoryService.style = `min-width: 492.575px; transform-origin: center top; z-index: 2030; position: fixed; top: ${scrollY}px; left: 618px;display:block;`
    }
    if (dropDown_employeeService.style.display == 'block') {
        dropDown_employeeService.style = `min-width: 320px; position: fixed; top: ${scrollY_employee}px; left: 798px; transform-origin: center bottom; z-index: 2003;display:block`
    }
}
var indexPredd = -1;

listDropdown_category.forEach((item, index) => {
    item.onclick = function () {
        if (indexPredd != -1) {
            listDropdown_category[indexPredd].classList.remove('selected');
        }
        input_categoryService.value = spans_categorydd[index].textContent.trim();
        arrows_down[0].style.transform = 'rotate(180deg)';
        dropDown_categoryService.style = `min-width: 492.575px; transform-origin: center top; z-index: 2026; display: none`
        item.classList.add('selected');
        indexPredd = index;
    }
})

// handle employee dropdown 
input_employeeService.onclick = (e) => {
    if (dropDown_employeeService.getAttribute('style') == 'min-width: 320px; transform-origin: center bottom; z-index: 2003; display: none;') {
        console.log('cc')
        arrows_down[1].style.transform = 'rotate(0deg)';
        dropDown_employeeService.style = `min-width: 320px; position: fixed; top: 552px; left: 798px; transform-origin: center bottom; z-index: 2003; display:block;`
    }
    else {
        console.log('cl')
        arrows_down[1].style.transform = 'rotate(180deg)';
        dropDown_employeeService.style = 'min-width: 320px; transform-origin: center bottom; z-index:2003; display: none;'
    }
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


