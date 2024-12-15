import { initPagination } from "./pagination.js";

const partnearsBlocks = document.querySelectorAll('.ukrpartn');

if (partnearsBlocks) {
  partnearsBlocks.forEach(el => {
    initPagination(el);
  })
}

const donorpartn = document.querySelector('.donorpartn');
if (donorpartn) {
  initPagination(donorpartn);
}
