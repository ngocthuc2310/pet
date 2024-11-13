"use strict";

// ============== phần Animation navbar ================
const sbar = document.getElementById("sidebar"),
  sbTitle = document.getElementById("sidebar-title");

sbTitle.addEventListener("click", () => {
  sbar.classList.toggle("active");
});

// ============ khai báo các node =======================
const sId = document.getElementById("input-id"),
  sName = document.getElementById("input-name"),
  sType = document.getElementById("input-type"),
  sBreed = document.getElementById("input-breed"),
  sVaccin = document.getElementById("input-vaccinated"),
  sDeworm = document.getElementById("input-dewormed"),
  sSteri = document.getElementById("input-sterilized"),
  sFind = document.getElementById("find-btn"),
  sForm = document.getElementById("form-seach"),
  sTable = document.getElementById("tbody");

// ============= load Breed lên Select ===================
const breedArr = JSON.parse(getFromStorage("breeds", "[]"));

function loadBreed() {
  let str = `<option selected value=''>Select Breed</option>`;
  breedArr.forEach((x) => {
    str += `<option value="${x.nameb}">${x.nameb}</option>`;
  });
  sBreed.innerHTML = str;
}
loadBreed();

//=============== phần tạo mảng Seach ====================
const pets = JSON.parse(getFromStorage("pets", "[]"));
function sSearch() {
  let dieuKien = {
    ID: sId.value,
    Name: sName.value,
    Type: sType.value,
    Breed: sBreed.value,
    Vaccinated: sVaccin.checked,
    Dewormed: sDeworm.checked,
    Sterilized: sSteri.checked,
  };
  let searchPets = pets.filter(
    (x) =>
      (dieuKien.ID != ""
        ? String(x.ID).toLowerCase().includes(dieuKien.ID.toLowerCase())
        : true) &&
      (dieuKien.Name != ""
        ? String(x.Name).toLowerCase().includes(dieuKien.Name.toLowerCase())
        : true) &&
      (dieuKien.Type != "" ? x.Type == dieuKien.Type : true) &&
      (dieuKien.Breed != "" ? x.Breed == dieuKien.Breed : true) &&
      (dieuKien.Vaccinated ? x.Vaccinated == true : true) &&
      (dieuKien.Dewormed ? x.Dewormed == true : true) &&
      (dieuKien.Sterilized ? x.Sterilized == true : true)
  );
  return searchPets;
}

// ================ show danh sách pets ra table =================
function showPetSearch() {
  let tt = sSearch();
  if (tt) {
    let str = "";
    for (const item of tt) {
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
  </tr>`;
    }
    sTable.innerHTML = str;
  }
}

//====== event click for Find button ============================
sFind.addEventListener("click", () => {
  showPetSearch();
});
