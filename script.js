const headerBurger = document.querySelector(".header__burger");
const headerMenu = document.querySelector(".header__menu");

headerBurger.addEventListener("click", () => {
  headerBurger.classList.toggle("active");
  headerMenu.classList.toggle("active");

  document.querySelector("body").classList.toggle("lock");
});

//
const links = document.querySelectorAll(".catalog__btn");
//const content = document.querySelectorAll(".catalog-content__item");
const content = document.querySelector(".row");

// function changeContentClasses(country) {
//   content.forEach((el) => {
//     if (el.dataset.country == country) {
//       el.classList.add("catalog-content__item_active");
//     } else {
//       el.classList.remove("catalog-content__item_active");
//     }
//   });
// }

links.forEach((el) => {
  el.addEventListener("click", (e) => {
    const country = e.currentTarget.dataset.country;

    links.forEach((el) => {
      el.classList.remove("catalog__btn_active");
    });

    e.currentTarget.classList.add("catalog__btn_active");

    // changeContentClasses(country);
    foo(country);
  });
});

async function foo(country) {
  content.innerHTML = "";
  const f = await fetch("db.json");
  const res = await f.json();

  for (let el in res) {
    if(res[el].country == country) {
      content.innerHTML += `
      <div class="catalog-content__card">
        <picture class="catalog-content__img">
                <source
                  srcset="${res[el].cover.mobile}"
                  media="(max-width: 480px)"
                />
                <source
                  srcset="${res[el].cover.mini}"
                  media="(max-width: 700px)"
                />
                <source
                  srcset="${res[el].cover.tablet}"
                  media="(max-width: 768px)"
                />
                <img src="${res[el].cover.desktop}" alt="картина" />
              </picture>
              <p class="catalog-content__author">${res[el].author}</p>
              <h3 class="catalog-content__name">${res[el].title}</h3>
              <p class="catalog-content__props">${res[el].props}</p>
              <p class="catalog-content__price">${res[el].price.toLocaleString('ru-RU')} руб</p>
              <button class="btn catalog-content__btn">В корзину</button>
          </div>
        `;
    }
  }
}

foo("France");




