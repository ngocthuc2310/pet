"use strict";

// ============== phần Animation navbar ================
const sbar = document.getElementById("sidebar"),
  sbTitle = document.getElementById("sidebar-title");

sbTitle.addEventListener("click", () => {
  sbar.classList.toggle("active");
});

// ====== phần khai báo Node và biến/hằng toàn cục ======
const id = document.getElementById("input-id"),
  petname = document.getElementById("input-name"),
  age = document.getElementById("input-age"),
  type = document.getElementById("input-type"),
  weight = document.getElementById("input-weight"),
  length = document.getElementById("input-length"),
  color = document.getElementById("input-color-1"),
  breed = document.getElementById("input-breed"),
  vaccin = document.getElementById("input-vaccinated"),
  deworm = document.getElementById("input-dewormed"),
  steri = document.getElementById("input-sterilized"),
  btnSubmit = document.getElementById("btn-submit"),
  btnHealthy = document.getElementById("btn-healthy"),
  tBody = document.getElementById("tbody"),
  form = document.getElementById("form"),
  cal = document.getElementById("btn-BMI");
let xoa = [];
let healthyPetArr = [];
let healthyCheck = false;
let calBMICheck = false;

// ============= thêm pet vào danh sách ==============
const pets = JSON.parse(getFromStorage("pets", "[]"));

const addPet = function () {
  let pet = {
    ID: id.value,
    Name: petname.value,
    Age: age.value,
    Type: type.value,
    Weight: weight.value,
    Height: length.value,
    Color: color.value,
    Breed: breed.value,
    Vaccinated: vaccin.checked,
    Dewormed: deworm.checked,
    Sterilized: steri.checked,
  };
  let d = new Date();
  pet.DateAdd = d;
  pets.push(pet);
  saveToStorage("pets", JSON.stringify(pets));
};

const deletePet = function (_id) {
  let index = pets.findIndex((x) => x.ID == _id);
  if (confirm(`Bạn có muốn xóa ${pets[index].Type} ${pets[index].Name} ?`)) {
    pets.splice(index, 1);
    saveToStorage("pets", JSON.stringify(pets));
  }
};

// ============ phần hiển thị danh sách pets ================
const showPets = function (petArr) {
  if (petArr) {
    let str = "";
    for (const item of petArr) {
      str += `<tr>
    <th scope="row">${item.ID}</th>
    <td>${item.Name}</td>
    <td>${item.Age}</td>
    <td>${item.Type}</td>
    <td>${item.Weight} kg</td>
    <td>${item.Height} cm</td>
    <td>${item.Breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${item.Color}"></i>
    </td>
    <td><i class="bi ${
      item.Vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      item.Dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      item.Sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>
      ${calBMICheck ? BMI(item.Weight, item.Height, item.Type) : "?"}
    </td>
    <td>
      ${new Date(item.DateAdd).getDate()}/${
        new Date(item.DateAdd).getMonth() + 1
      }/${new Date(item.DateAdd).getFullYear()}
    </td>
    <td>
      <button type="button" class="btn btn-danger nut-xoa">Delete</button>
    </td>
  </tr>`;
    }
    tBody.innerHTML = str;
    xoa = document.querySelectorAll(".nut-xoa");
    if (xoa.length > 0) {
      for (let i = 0; i < xoa.length; i++) {
        xoa[i].addEventListener("click", function (e) {
          deletePet(petArr[i].ID);
          findHealthyPet();
          if (healthyCheck) showPets(healthyPetArr);
          else showPets(pets);
          e.preventDefault();
        });
      }
    }
  }
};
showPets(pets);

const resetForm = function () {
  id.value = "";
  petname.value = "";
  age.value = "";
  type.value = "";
  weight.value = "";
  length.value = "";
  color.value = "#000000";
  breed.value = "";
  vaccin.checked = false;
  deworm.checked = false;
  steri.checked = false;
};

// ....... phần Validation cho pets .....
const valid = function () {
  let str = "";
  if (id.value != "") {
    let tim = pets.findIndex((x) => x.ID == id.value);
    if (tim != -1) str += "- Pet ID must be unique!\n";
  }
  if (age.value < 1 || age.value > 15)
    str += "- Age must be between 1 and 15!\n";
  if (weight.value < 1 || weight.value > 15)
    str += "- Weight must be between 1 and 15!\n";
  if (length.value < 1 || length.value > 100)
    str += "- Length must be between 1 and 100!\n";
  if (str != "") {
    alert(str);
    return false;
  } else {
    return true;
  }
};

// =============== sự kiện submit thêm thú cưng ===============
form.addEventListener("submit", function (e) {
  if (valid()) {
    addPet();
    resetForm();
  }
  showPets(pets);
  e.preventDefault();
});

// ========== phần HealthyPet (pets khỏe mạnh) ================
const findHealthyPet = function () {
  healthyPetArr = pets.filter(
    (x) => x.Vaccinated && x.Dewormed && x.Sterilized
  );
};

btnHealthy.addEventListener("click", function (e) {
  if (!healthyCheck) {
    healthyCheck = true;
    findHealthyPet();
    showPets(healthyPetArr);
    btnHealthy.textContent = "Show All Pet";
  } else {
    healthyCheck = false;
    showPets(pets);
    btnHealthy.textContent = "Show Healthy Pet";
  }
  e.preventDefault();
});

// ================= phần tính BMI =====================
function BMI(_weight, _length, _type) {
  let HangSo;
  if (_type == "Dog") HangSo = 703;
  else if (_type == "Cat") HangSo = 886;
  else HangSo = 0;
  return ((_weight * HangSo) / _length ** 2).toFixed(2);
}

cal.addEventListener("click", function () {
  calBMICheck = true;
  if (healthyCheck) showPets(healthyPetArr);
  else showPets(pets);
});

// ======= phần tạo hiển thị Breed trong index ==========
const breedInput = document.getElementById("input-breed"),
  breedArr = JSON.parse(getFromStorage("breeds", "[]"));

function showBreed(typeb) {
  let breeArrShow = breedArr.filter((x) => x.type == typeb);
  // console.log(breedArr, breeArrShow);
  breedInput.innerHTML =
    "<option value='' disabled selected>Select Breed</option>";
  breeArrShow.forEach((x) => {
    let optionb = document.createElement("option");
    optionb.innerHTML = x.nameb;
    optionb.value = x.nameb;
    breedInput.appendChild(optionb);
  });
}

type.addEventListener("change", () => {
  showBreed(type.value);
});
