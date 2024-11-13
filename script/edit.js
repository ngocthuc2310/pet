"use strict";
// ============== phần Animation navbar ================
const sbar = document.getElementById("sidebar"),
  sbTitle = document.getElementById("sidebar-title");

sbTitle.addEventListener("click", () => {
  sbar.classList.toggle("active");
});

// ========= Khai báo node ===============================
const idt = document.getElementById("input-id"),
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
  tBody = document.getElementById("tbody"),
  form = document.getElementById("form");

// ========= Hiển thị table danh sách pets ==============
const pets = JSON.parse(getFromStorage("pets", "[]"));

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
      ${new Date(item.DateAdd).getDate()}/${
        new Date(item.DateAdd).getMonth() + 1
      }/${new Date(item.DateAdd).getFullYear()}
    </td>
    <td>
      <button type="button" class="btn btn-warning nut-edit" data-id="${
        item.ID
      }" >Edit</button>
    </td>
  </tr>`;
    }
    tBody.innerHTML = str;
    let nutEdit = document.querySelectorAll(".nut-edit");
    nutEdit.forEach((x) => {
      x.addEventListener("click", (e) => {
        startEditPet(x.dataset.id);
        e.preventDefault();
      });
    });
  }
};
showPets(pets);

// ========= phần Load breed lên select =================
const breedArr = JSON.parse(getFromStorage("breeds", "[]"));

function loadBreed(typeb) {
  let br = breedArr.filter((x) => x.type == typeb);
  let str = "<option selected value='' disabled>Select Breed</option>";
  br.forEach((x) => {
    str += `<option value="${x.nameb}">${x.nameb}</option>`;
  });
  breed.innerHTML = str;
}

// ======= tạo form bet edit ==========================
const eForm = document.getElementById("container-form"),
  dateadd = document.getElementById("date-add");

function startEditPet(id) {
  eForm.classList.remove("hide");
  let editPet = pets[pets.findIndex((x) => x.ID == id)];
  loadBreed(editPet.Type);
  idt.value = editPet.ID;
  petname.value = editPet.Name;
  age.value = editPet.Age;
  type.value = editPet.Type;
  weight.value = editPet.Weight;
  length.value = editPet.Height;
  color.value = editPet.Color;
  breed.value = editPet.Breed;
  vaccin.checked = editPet.Vaccinated;
  deworm.checked = editPet.Dewormed;
  steri.checked = editPet.Sterilized;
  dateadd.value = editPet.DateAdd;
}

// ============== event Submit form edit pet ==============
const submitForm = document.getElementById("edit-pet-form");
submitForm.addEventListener("submit", (e) => {
  if (validEdirForm()) {
    let petForm = {
      ID: idt.value,
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
      DateAdd: dateadd.value,
    };
    UpdatePet(petForm);
    let newpets = JSON.parse(getFromStorage("pets", "[]"));
    showPets(newpets);
  }
  e.preventDefault();
});

// ....... validation .................
function validEdirForm() {
  let str = "";
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
}

// ........ hàm so sánh pet .............
function soSanh(pet1, pet2) {
  let p1 = Object.keys(pet1),
    p2 = Object.keys(pet2),
    kq = true;
  if (p1.length != p2.length) kq = false;
  else
    p1.forEach((k1) => {
      if (!pet2[k1] === undefined) kq = false;
      else if (pet1[k1] != pet2[k1]) kq = false;
    });
  return kq;
}

//.......... hàm update pet ...........
function UpdatePet(petb) {
  let t = pets[pets.findIndex((x) => x.ID == petb.ID)];
  console.log(soSanh(t, petb), t, petb);
  if (!soSanh(t, petb)) {
    t.Name = petb.Name;
    t.Age = petb.Age;
    t.Type = petb.Type;
    t.Weight = petb.Weight;
    t.Height = petb.Height;
    t.Color = petb.Color;
    t.Breed = petb.Breed;
    t.Vaccinated = petb.Vaccinated;
    t.Dewormed = petb.Dewormed;
    t.Sterilized = petb.Sterilized;
    t.DateAdd = petb.DateAdd;
    saveToStorage("pets", JSON.stringify(pets));
    alert("edit thành công");
    eForm.classList.add("hide");
  } else alert("bạn không có sự thay đổi nào để update!");
}

//========== event change for pets type ====================
type.addEventListener("change", () => {
  loadBreed(type.value);
});
