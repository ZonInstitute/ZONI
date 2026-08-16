document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ACTIVE NAVIGATION
  ========================= */

  const currentPage = document.body.dataset.page;

  const navLinks = document.querySelectorAll(
    ".navlinks a"
  );

  navLinks.forEach(link => {

    const linkPage = link.dataset.page;

    if (linkPage === currentPage) {
      link.classList.add("active");
    }

  });


  /* =========================
     MOBILE NAVIGATION
  ========================= */

  const menu = document.querySelector(".menu");
  const nav = document.querySelector(".navlinks");

  if (menu && nav) {

    menu.addEventListener("click", () => {

      const isOpen =
        nav.classList.toggle("open");

      menu.setAttribute(
        "aria-expanded",
        isOpen
      );

    });


    /* Close menu after selecting a page */

    navLinks.forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menu.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", event => {

      if (
        !nav.contains(event.target) &&
        !menu.contains(event.target)
      ) {

        nav.classList.remove("open");

        menu.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    });

  }


  /* =========================
     SCROLL REVEAL
  ========================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -30px 0px"
        }
      );


    revealElements.forEach(element => {

      revealObserver.observe(element);

    });

  } else {

    /* Fallback for older browsers */

    revealElements.forEach(element => {

      element.classList.add("visible");

    });

  }


  /* =========================
     SMOOTH INTERNAL LINKS
  ========================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const targetId =
          link.getAttribute("href");

        const target =
          document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });


  /* =========================
     PAGE LOAD
  ========================= */

  document.body.classList.add(
    "page-loaded"
  );

});
