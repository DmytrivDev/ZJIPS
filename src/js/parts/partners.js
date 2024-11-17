import { initPagination } from "./pagination.js";

const ukrpartn = document.querySelector('.ukrpartn');
if (ukrpartn) {
  initPagination(ukrpartn);
}

const interpart = document.querySelector('.interpart');
if (interpart) {
  initPagination(interpart);
}

const businspartn = document.querySelector('.businspartn');
if (businspartn) {
  initPagination(businspartn);
}

const donorpartn = document.querySelector('.donorpartn');
if (donorpartn) {
  initPagination(donorpartn);
}
