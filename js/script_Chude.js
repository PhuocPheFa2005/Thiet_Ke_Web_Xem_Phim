document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  menuToggle.addEventListener("click", function () {
    menu.classList.toggle("show");
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const moviesPerPage = 12; // Số lượng phim mỗi trang
  let currentPage = 1;
  const movies = document.querySelectorAll(".movie-item");
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  function showPage(page) {
    movies.forEach((movie, index) => {
      if (index >= (page - 1) * moviesPerPage && index < page * moviesPerPage) {
        movie.style.display = "block";
      } else {
        movie.style.display = "none";
      }
    });
    document.getElementById("pageNumber").textContent = page;
  }

  document.getElementById("prevPage").addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });

  document.getElementById("nextPage").addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  });

  showPage(currentPage);
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.addEventListener("DOMContentLoaded", function () {
  const filterModal = document.getElementById("filterModal");
  const openFilterBtn = document.getElementById("openFilter");
  const closeFilterBtn = document.querySelector(".close");
  const applyFilterBtn = document.getElementById("applyFilter");
  const yearFilter = document.getElementById("yearFilter");
  const movieItems = document.querySelectorAll(".movie-item");

  // Hiển thị cửa sổ bộ lọc
  openFilterBtn.addEventListener("click", function () {
    filterModal.classList.add("show");
  });

  // Ẩn cửa sổ bộ lọc
  closeFilterBtn.addEventListener("click", function () {
    filterModal.classList.remove("show");
  });

  // Đóng bộ lọc khi click bên ngoài
  window.addEventListener("click", function (e) {
    if (e.target === filterModal) {
      filterModal.classList.remove("show");
    }
  });

  // Lọc phim theo năm
  applyFilterBtn.addEventListener("click", function () {
    const selectedYear = yearFilter.value;

    movieItems.forEach((item) => {
      const movieYear = item.getAttribute("data-year");

      if (!selectedYear || movieYear === selectedYear) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    filterModal.classList.remove("show");
  });
});
document.getElementById("applyFilter").addEventListener("click", function () {
  const year = document.getElementById("yearFilter").value;
  const country = document.getElementById("countryFilter").value;
  const type = document.getElementById("typeFilter").value;
  const rating = document.getElementById("ratingFilter").value;
  const genre = document.getElementById("genreFilter").value;
  const version = document.getElementById("versionFilter").value;
  const productionYear = document.getElementById("productionYearFilter").value;
  const sort = document.getElementById("sortFilter").value;

  const filters = {
    year,
    country,
    type,
    rating,
    genre,
    version,
    productionYear,
    sort,
  };

  console.log("Bộ lọc đã áp dụng:", filters);
  applyFilters(filters);
});

// Hàm áp dụng bộ lọc (giả lập)
function applyFilters(filters) {
  let movies = document.querySelectorAll(".movie-item");

  movies.forEach((movie) => {
    let show = true;

    if (filters.year && movie.dataset.year !== filters.year) show = false;
    if (filters.country && movie.dataset.country !== filters.country)
      show = false;
    if (filters.type && movie.dataset.type !== filters.type) show = false;
    if (filters.rating && movie.dataset.rating !== filters.rating) show = false;
    if (filters.genre && movie.dataset.genre !== filters.genre) show = false;
    if (filters.version && movie.dataset.version !== filters.version)
      show = false;
    if (
      filters.productionYear &&
      movie.dataset.productionYear !== filters.productionYear
    )
      show = false;

    movie.style.display = show ? "block" : "none";
  });

  // Sắp xếp phim theo bộ lọc
  sortMovies(filters.sort);
}

// Hàm sắp xếp phim
function sortMovies(sortBy) {
  let movieContainer = document.querySelector(".movie-grid");
  let movies = Array.from(movieContainer.children);

  movies.sort((a, b) => {
    if (sortBy === "latest") return b.dataset.year - a.dataset.year;
    if (sortBy === "oldest") return a.dataset.year - b.dataset.year;
    if (sortBy === "topRated") return b.dataset.rating - a.dataset.rating;
  });

  movieContainer.innerHTML = "";
  movies.forEach((movie) => movieContainer.appendChild(movie));
}
document.addEventListener("DOMContentLoaded", function () {
  const tooltip = document.getElementById("movieTooltip");
  const tooltipImage = document.getElementById("tooltipImage");
  const tooltipTitle = document.getElementById("tooltipTitle");
  const tooltipYear = document.getElementById("tooltipYear");
  const tooltipDesc = document.getElementById("tooltipDesc");
  const tooltipIMDb = document.querySelector(".imdb-rating strong");
  const tooltipAge = document.querySelector(".age-rating");
  const tooltipDuration = document.querySelector(".duration");
  const tooltipGenres = document.querySelector(".movie-genres");
  const watchNowBtn = document.querySelector(".watch-now");

  document.querySelectorAll(".movie-item").forEach((item, index) => {
    item.addEventListener("mouseenter", function () {
      // Lấy dữ liệu từ `data-*`
      const img = this.dataset.image;
      const title = this.dataset.title;
      const year = this.dataset.year;
      const desc = this.dataset.desc;
      const imdb = this.dataset.imdb;
      const age = this.dataset.age;
      const duration = this.dataset.duration;
      const genres = this.dataset.genres;

      // Cập nhật tooltip
      tooltipImage.src = img;
      tooltipTitle.innerText = title;
      tooltipYear.innerText = `Năm: ${year}`;
      tooltipDesc.innerText = desc;
      tooltipIMDb.innerText = imdb;
      tooltipAge.innerText = age;
      tooltipDuration.innerText = duration;
      tooltipGenres.innerHTML = genres
        .split(", ")
        .map((genre) => `<span>${genre}</span>`)
        .join(" • ");

      // Cập nhật sự kiện nút "Xem ngay"
      if (watchNowBtn) {
        watchNowBtn.onclick = () => {
          // Chuyển tới trang chieuphimleX.html, nơi X là chỉ số phim
          const movieIndex = index + 1; // Thêm 1 để bắt đầu từ 1 thay vì 0
          window.location.href = `chieuphimboS${movieIndex}.html`;
        };
      }

      // Lấy vị trí của bộ phim
      const rect = this.getBoundingClientRect();
      const tooltipWidth = 400; // Chiều rộng tooltip
      const spacing = 1; // Khoảng cách giữa tooltip và bộ phim

      // Kiểm tra có đủ không gian bên phải không
      let leftPosition = rect.right + spacing;

      // Nếu không đủ chỗ bên phải, chuyển tooltip sang bên trái
      if (leftPosition + tooltipWidth > window.innerWidth) {
        leftPosition = rect.left - tooltipWidth - spacing;

        // Nếu bị tràn qua mép trái màn hình, điều chỉnh lại cho hợp lý
        if (leftPosition < spacing) {
          leftPosition = spacing; // Giữ tooltip không bị đẩy quá xa
        }
      }

      // Cập nhật vị trí tooltip
      tooltip.style.left = `${leftPosition}px`;
      tooltip.style.top = `${rect.top + window.scrollY}px`; // Điều chỉnh theo cuộn trang
      tooltip.style.display = "block";

      // Đảm bảo tooltip không bị ẩn ngay lập tức nếu đã được hiển thị
      clearTimeout(tooltipTimeout);
      isTooltipVisible = true;
    });

    // Giữ tooltip khi rê chuột vào tooltip
    tooltip.addEventListener("mouseenter", function () {
      // Hủy bỏ timeout nếu chuột vào tooltip
      clearTimeout(tooltipTimeout);
      tooltip.style.display = "block"; // Giữ tooltip hiển thị
      isTooltipVisible = true; // Đảm bảo tooltip được giữ khi di chuột vào
    });

    // Khi chuột rời khỏi bộ phim, sẽ giữ tooltip trong 3 giây
    item.addEventListener("mouseleave", function () {
      if (isTooltipVisible) {
        tooltipTimeout = setTimeout(function () {
          tooltip.style.display = "none";
          isTooltipVisible = false; 
        }, 5000); 
      }
    });
  });

  // Ẩn tooltip khi di chuột ra ngoài cả phim và tooltip
  document.addEventListener("mousemove", function (event) {
    if (
      !tooltip.contains(event.target) &&
      !event.target.closest(".movie-item")
    ) {
      if (isTooltipVisible) {
        tooltipTimeout = setTimeout(function () {
          tooltip.style.display = "none";
          isTooltipVisible = false;
        }, 5000); 
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các mục quốc gia trong dropdown
  document
    .querySelectorAll(".country-dropdown .dropdown-item")
    .forEach((item) => {
      item.addEventListener("click", function (event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định

        const country = this.getAttribute("href").split("=")[1]; // Lấy tên quốc gia từ URL
        if (country) {
          window.location.href = `quoc-gia.html?country=${country}`;
        }
      });
    });
});
document.addEventListener("DOMContentLoaded", function () {
  const countryBtn = document.getElementById("countryButton"); // Nút "Quốc gia"
  const countryDropdown = document.getElementById("countryDropdown"); // Danh sách quốc gia

  countryBtn.addEventListener("click", function () {
    countryDropdown.classList.toggle("show"); // Hiển thị hoặc ẩn danh sách
  });

  // Ẩn dropdown nếu click ra ngoài
  document.addEventListener("click", function (event) {
    if (
      !countryBtn.contains(event.target) &&
      !countryDropdown.contains(event.target)
    ) {
      countryDropdown.classList.remove("show");
    }
  });
});

//ĐỔI QUỐC GIA SANG PHIM TƯƠNG ỨNG
document.addEventListener("DOMContentLoaded", function () {
  console.log("Script chọn quốc gia đã tải!");

  // Xử lý sự kiện chuyển trang khi chọn quốc gia
  const countryItems = document.querySelectorAll(".dropdown-item");

  countryItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault(); // Ngăn chặn hành vi mặc định

      const link = this.getAttribute("href"); // Lấy link trang
      console.log("Chuyển hướng đến:", link); // Kiểm tra trong Console

      if (link) {
        window.location.href = link; // Chuyển hướng
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const likeBtn = document.querySelector(".like-btn");
  const detailsBtn = document.querySelector(".details-btn");

  likeBtn.addEventListener("click", function () {
    const icon = this.querySelector("i");
    icon.classList.toggle("fa-regular");
    icon.classList.toggle("fa-solid");
    icon.style.color = icon.classList.contains("fa-solid") ? "red" : "gray"; // Đổi màu khi trái tim đầy
  });

  detailsBtn.addEventListener("click", function () {
    this.classList.toggle("active"); // Toggle class để đổi màu icon "i"
  });
});
