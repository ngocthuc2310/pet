"use strict";

// ============== phần Animation navbar ================
const sbar = document.getElementById("sidebar"),
  sbTitle = document.getElementById("sidebar-title");

sbTitle.addEventListener("click", () => {
  sbar.classList.toggle("active");
});

// ====== phần khai báo Node, breedArr ==================
const inBre = document.getElementById("input-breed"),
  inType = document.getElementById("input-type"),
  btnSub = document.getElementById("submit-btn"),
  form = document.getElementById("form-them-breed"),
  tBody = document.getElementById("tbody");
let breedArr;

// ====== Phần này không có trong yêu cầu đề bài. ==========
// Nhập: naplai() trong console để nạp nhanh dữ liệu mẫu.
// ( Vì có nó việc lập trình tiện hơn.)--------------------
let dataTest =
  '[{"nameb":"Tabby","type":"Dog"},{"nameb":"Mixed Breed","type":"Dog"},{"nameb":"Domestic Short Hair","type":"Dog"},{"nameb":"Domestic Medium Hair","type":"Dog"},{"nameb":"Terrier","type":"Cat"},{"nameb":"Greyhound","type":"Cat"},{"nameb":"Persian","type":"Cat"},{"nameb":"Rottweiler","type":"Cat"}]';

function naplai() {
  try {
    saveToStorage("breeds", dataTest);
    breedArr = JSON.parse(getFromStorage("breeds", "[]"));
    renderBreedTable();
    console.log("OK, Successs full");
  } catch (error) {
    console.log(`Có lỗi: ${error.message} `);
  }
}

// ===================== phần Show Breed ===================
breedArr = JSON.parse(getFromStorage("breeds", "[]"));

function renderBreedTable() {
  let str = "";
  for (let i = 0; i < breedArr.length; i++) {
    str += `<tr>
      <td>${i + 1}</td>
      <td>${breedArr[i].nameb}</td>
      <td>${breedArr[i].type}</td>
      <td><button type="button" class="btn btn-danger nut-xoabr" data-nameb="${
        breedArr[i].nameb
      }">Delete</button></td>
    </tr>`;
  }
  tBody.innerHTML = str;
  let xoabr = document.querySelectorAll(".nut-xoabr");
  xoabr.forEach((item) => {
    item.addEventListener("click", (e) => {
      deleteBreed(item.dataset.nameb);
      renderBreedTable();
      e.preventDefault();
    });
  });
}
renderBreedTable();

// ========= phần hàm xóa 1 Breed trong mảng =================
function deleteBreed(nameb) {
  let indexBr = breedArr.findIndex((x) => x.nameb == nameb);
  if (
    confirm(
      `bạn muốn xóa giống ${breedArr[indexBr].type} ${breedArr[indexBr].nameb}!..`
    )
  )
    breedArr.splice(indexBr, 1);
  saveToStorage("breeds", JSON.stringify(breedArr));
}

// ========== phần add Breed ================================
function addBreed() {
  let breed = {
    nameb: inBre.value,
    type: inType.value,
  };
  if (validBr(breed)) {
    breedArr.push(breed);
    saveToStorage("breeds", JSON.stringify(breedArr));
    resetFormBreed();
  }
}

// ===phần validation bread. nếu trùng phần tử thì báo lỗi ===
function validBr(breed) {
  if (
    breedArr.includes(
      breedArr[
        breedArr.findIndex(
          (x) => x.nameb == breed.nameb && x.type == breed.type
        )
      ]
    )
  ) {
    alert("Trùng bread");
    return false;
  } else return true;
}

function resetFormBreed() {
  inBre.value = "";
  inType.value = "";
}

// == Sự kiện thêm breed ===================================
form.addEventListener("submit", (e) => {
  addBreed();
  renderBreedTable();
  e.preventDefault();
});
