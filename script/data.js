"use strict";
// ============== phần Animation navbar ================
const sbar = document.getElementById("sidebar"),
  sbTitle = document.getElementById("sidebar-title");

sbTitle.addEventListener("click", () => {
  sbar.classList.toggle("active");
});

//============== khai báo các node =========================
const nInputFile = document.getElementById("input-file"),
  nBtnImport = document.getElementById("import-btn"),
  nBtnExport = document.getElementById("export-btn");

//============ phần Export from pets To Json File ===========
function saveDataToJsonFile(tenFile, noidung) {
  let blob = new Blob([noidung], { type: "application/json" });
  saveAs(blob, `${tenFile}.json`);
}

nBtnExport.addEventListener("click", () => {
  let strData = getFromStorage("pets", "[]");
  saveDataToJsonFile("petsdata", strData);
});

//======== phần Import from Json file to pets Array ===========
const PP = document.getElementById("pp");
let file;
nInputFile.addEventListener("change", (e) => {
  file = e.target.files[0];
  e.stopPropagation();
  e.preventDefault();
});

nBtnImport.addEventListener("click", (e) => {
  let strPetsOld = getFromStorage("pets", "[]"),
    petsOldArr = JSON.parse(strPetsOld);
  if (file) {
    let strPetsImport,
      fr = new FileReader();
    fr.addEventListener("load", (e) => {
      strPetsImport = fr.result;
    });
    fr.addEventListener("loadend", (e) => {
      if (fr.readyState == 0) alert("⁉ No file is loaded!");
      if (fr.readyState == 2) {
        let petsImportArr = JSON.parse(strPetsImport);
        InsertPets(petsOldArr, petsImportArr);
        let strPetsNew = JSON.stringify(petsOldArr);
        saveToStorage("pets", strPetsNew);
        alert("❤ Import successfuly!");
      }
    });
    fr.addEventListener("error", (e) => {
      alert(`📛 có lỗi upload file: ${fr.error}`);
    });
    fr.readAsText(file, "application/json");
  } else {
    alert("⛔ Impor failed, please select file");
  }
});

function InsertPets(petsOld, pestInsert) {
  pestInsert.forEach((x) => {
    let l = petsOld.findIndex((y) => y.ID == x.ID);
    if (l == -1) {
      petsOld.push(x);
    } else {
      petsOld[l] = x;
    }
  });
}

// ======== hàm này không nằm trong yêu cầu đề bài==============
//xóa Data pets thì gọi resetpets() trên console trang Data
function resetPets() {
  try {
    saveToStorage("pets", "[]");
    return "clearn pets successfuly";
  } catch (error) {
    return `có lỗi: ${error.message}!!`;
  }
}
